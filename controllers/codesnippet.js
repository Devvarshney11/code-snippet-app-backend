// const db = require("../config/db");
// const { QueryTypes } = require("sequelize");
// const getCode = async (req, res) => {
//   console.log("Inside getCode function");
//   try {
//     const values = await db.query("SELECT * FROM codesnippets");
//     res.json({ values: values[0] });
//   } catch (error) {
//     console.error("Error in getCode function:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// const postCode = async (req, res) => {
//   try {
//     const { username, code_language, stdin, source_code, stdout } = req.body;
//     if (!username || !code_language || !source_code) {
//       res.status(400).json({ message: "All fields are required" });
//       return;
//     }

//     const user = await db.query(
//       "INSERT INTO codesnippets (username, code_language, stdin, source_code,stdout) VALUES (?,?,?,?,?)",
//       [username, code_language, stdin, source_code, stdout]
//     );
//     res.json({ user: user[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//     return;
//   }
// };
// module.exports = {
//   postCode,
//   getCode,
// };

const db = require("../config/db");
const { QueryTypes } = require("sequelize");
const redis = require("redis");
let redisClient;

(async () => {
  redisClient = redis.createClient({ host: "losthost", port: 6379 });

  redisClient.on("error", (e) => {
    console.error("Redis connection error:" + e);
  });

  await redisClient.connect();
})();

const getCode = async (req, res) => {
  try {
    const cachedData = await redisClient.get("codesnippets");
    if (cachedData) {
      res.json({ values: JSON.parse(cachedData) });
      return;
    }
    const values = await db.query("SELECT * FROM codesnippets");
    await redisClient.set(
      "codesnippets",
      JSON.stringify(values[0]),
      "EX",
      3600
    );
    res.json({ values: values[0] });
  } catch (error) {
    console.error("Error in getCode function:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postCode = async (req, res) => {
  try {
    const { username, code_language, stdin, source_code, stdout } = req.body;
    if (!username || !code_language || !source_code) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await db.query(
      "INSERT INTO codesnippets (username, code_language, stdin, source_code,stdout) VALUES (?,?,?,?,?)",
      [username, code_language, stdin, source_code, stdout]
    );
    await redisClient.del("codesnippets");
    res.json({ user: user[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
module.exports = {
  postCode,
  getCode,
};
