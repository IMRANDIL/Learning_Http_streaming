const path = require("path");
const fs = require("fs");

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
    // Get the video blob from the request
    const videoBlob = req.file.buffer;

    // Generate a unique filename (you might want to use a more robust method)
    const filename = `video_${Date.now()}.webm`;

    // Specify the path where you want to store the video
    const filePath = path.join(uploadsDirectory, filename);

    // Write the video blob to the file system
    fs.writeFileSync(filePath, videoBlob);
    // Respond with a success message
    res
      .status(200)
      .json({ message: "Video successfully stored on the server." });
  } catch (error) {
    console.error("Error storing video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
