const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


exports.uploadImages = async (req, res) => {
    try {
      const { path } = req.body;
      let images = [];
      const url = await uploadToCloudinary(req.files.file, path);
      images.push(url);
      removeTmp(req.files.file);
      res.json(images);
    } catch (error) {
      // console.log(error)
      return res.status(500).json({ message: error.message });
    }
  };



const uploadToCloudinary = async (file, path) => {
    return new Promise((resolve) => {
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: path,
        },
        (err, res) => {
          if (err) {
            removeTmp(file);
            return res.status(400).json({ message: "Upload image failed." });
          }
          resolve({
            url: res.secure_url,
          });
        }
      );
    });
  };
  
  const removeTmp = (file) => {
    fs.unlink(file.tempFilePath, (err) => {
      if (err) throw err;
    });
  };
  