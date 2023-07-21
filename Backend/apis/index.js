const cors = require("cors");
const user_apis = require("../routes/user");
const event = require("../routes/event");
const cme = require("../routes/cme");
const membership = require("../routes/membership");
const doctor = require("../routes/doctor");
const specialist = require("../routes/specialist");
const stories = require("../routes/stories");
const trending = require("../routes/trending");
const advertisment = require("../routes/advertisment");
const association = require("../routes/association");
const career = require("../routes/career");
const request = require("../routes/request");
const references = require("../routes/references_new");
const video = require("../routes/video");
const gallery = require("../routes/gallery");
const president = require("../routes/president");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");


app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);
app.use(express.static("upload"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use(express.json());
app.use("/api/user", [user_apis]);
app.use("/api/event", [event]);
app.use("/api/cme", [cme]);
app.use("/api/membership", [membership]);
app.use("/api/doctor", [doctor]);
app.use("/api/specialist", [specialist]);
app.use("/api/stories", [stories]);
app.use("/api/trending", [trending]);
app.use("/api/association", [association]);
app.use("/api/advertisment", [advertisment]);
app.use("/api/career", [career]);
app.use("/api/references", [references]);
app.use("/api/request", [request]);
app.use("/api/video", [video]);
app.use("/api/gallery", [gallery]);
app.use("/api/president", [president]);

module.exports = app;
