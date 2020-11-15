const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");
const { networkInterfaces } = require("os");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.get("/api/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/db.json"));
  res.json(data);
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.get("/notes", (req, res) => {
  res.sendFile("notes.html", { root: path.join(__dirname, "public") });
});

app.post("/api/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNote = req.body;
  newNote.id = Date.now();
  data.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  res.sendStatus(200);
});

app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`server is running on http:// local host: ${PORT}`);
});
