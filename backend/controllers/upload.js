const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const keys = require("../config/keys");
const fileUpload = require("express-fileupload");

cloudinary.config({
    cloud_name: keys.CLOUD_NAME,
    api_key: keys.CLOUD_API_KEY,
    api_secret: keys.CLOUD_API_SECRET,
});

// Middleware to handle file uploads with limits
app.use(fileUpload({ 
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
}));

exports.uploadImages = async (req, res) => {
    try {
        const { path } = req.body;

        // Validate file type
        const file = req.files.file;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ message: "Invalid file type." });
        }

        let images = [];
        const url = await uploadToCloudinary(file, path);
        images.push(url);
        removeTmp(file); // Clean up temp file
        res.json(images);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const uploadToCloudinary = async (file, path) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: path },
            (err, res) => {
                if (err) {
                    removeTmp(file); // Ensure temp file is removed on error
                    return reject(new Error("Upload image failed."));
                }
                resolve({ url: res.secure_url });
            }
        );
    });
};

const removeTmp = (file) => {
    fs.unlink(file.tempFilePath, (err) => {
        if (err) {
            console.error("Error removing temporary file:", err);
        }
    });
};
