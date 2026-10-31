import express from "express";
import { createClient } from "redis";

const app = express();
const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

const users = [
  { id: 1, name: "vikas" },

  { id: 2, name: "vicky" },

  { id: 3, name: "aniket" },

  { id: 4, name: "rohit" },
];
app.get("/users", async (req, res) => {
  await redisClient.set("users", JSON.stringify(users));
  const value = await redisClient.get("users");
  res.send(value);
});
app.get("/set", async (req, res) => {
  await redisClient.set("name", "vikasthakur");
  res.send("ok");
});
app.get("/", async (req, res) => {
  const value = await redisClient.get("name");
  res.send(value);
});
app.listen(3000, () => {
  console.log("server is running");
});
