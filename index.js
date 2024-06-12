const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
require('dotenv').config(); // Load dotenv


// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const port = process.env.PORT || 3000;



app.set('trust proxy', true); // Trust the first proxy
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// View engine setup (using EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);


// MongoDB connection URI
const mongoURI =  process.env.dbURI ;

// Connect to MongoDB
mongoose.connect(mongoURI, {

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Example route to compress the video
app.get("/compress-video", (req, res) => {
  const inputPath = path.join(__dirname, "public", "images", "vecteezy_dark-storm-clouds-and-lightning-bolts_1625793.mp4");
  const outputPath = path.join(__dirname, "public", "images", "CompressedBackground.mp4");

  ffmpeg(inputPath)
    .videoCodec("libx264") // Video codec
    .audioCodec("aac") // Audio codec
    .outputOptions([
      "-vf scale=-2:720", // Scale to a height of 720 pixels (maintains aspect ratio)
      "-preset veryfast", // Very fast preset for better speed
      "-crf 23", // Constant Rate Factor (0-51, 0 is lossless, 51 is worst quality)
      "-b:v 750k", // Video bitrate (750 kbps)
      "-maxrate 1M", // Maximum video bitrate (1 Mbps)
      "-bufsize 2M", // Video buffer size (2 Mbps)
      "-b:a 128k", // Audio bitrate (128 kbps)
      "-movflags +faststart", // Fast start for streaming
      "-pix_fmt yuv420p", // Pixel format
      "-profile:v main", // H.264 profile (main is widely compatible)
      "-level 4.0", // H.264 level (4.0 is good for HD)
    ])
    .output(outputPath)
    .on("end", () => {
      console.log("Compression finished");
      res.send("Compression finished");
    })
    .on("error", (err) => {
      console.error("Error:", err);
      res.status(500).send("Error compressing video");
    })
    .run();
});


// Server startup message if everything is fine
const server = app.listen(port, () => 
  {
      console.log('Happy coding, engineer!');
      console.log(`Server is running at http://localhost:${port}`);
  });

  // Handling errors during server startup
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

module.exports = app;
