import express from "express";
import multer from "multer";

const app = express();
// const upload=multer({dest:"uploads/"})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/profile", upload.single("dp"), (req, res) => {
  res.send("file uploaded");
});

app.listen(3000, () => {
  console.log("server is running");
});
