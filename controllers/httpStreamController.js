const path = require("path");
const fs = require("fs");
const ffmpeg = require('fluent-ffmpeg');

exports.httpStreamController = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("something went wrong", error);
    res.status(500).send(error);
  }
};

exports.storeBlobController = async (req, res, next) => {
  try {
      // Create 'uploads' directory if it doesn't exist
      const uploadsDirectory = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadsDirectory)) {
        fs.mkdirSync(uploadsDirectory);
      }
      const videoBlob = req.file.buffer;
      const timestamp = Date.now();
  
      // Save the original webm file
      const originalFilePath = path.join(uploadsDirectory, `video_${timestamp}.webm`);
      fs.writeFileSync(originalFilePath, videoBlob);
  
      // Convert to mp4
      const mp4FilePath = path.join(uploadsDirectory, `video_${timestamp}.mp4`);
      await new Promise((resolve, reject) => {
        ffmpeg()
          .input(originalFilePath)
          .output(mp4FilePath)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
// Respond with a success message
res.status(200).json({ message: "Video successfully stored on the server." });  
  } catch (error) {
    console.error("Error storing video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
