const { createClient } = require("redis");

const redis = createClient();

redis.connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.log("Redis Connection Error", err));

redis.on("error", (err) => console.log("Redis Client Error", err));


module.exports = redis