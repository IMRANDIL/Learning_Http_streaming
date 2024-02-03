const router = require('express').Router();
const multer = require('multer');
const { storeBlobController } = require('../controllers/httpStreamController');

// Set up storage for multer
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.post('/upload', upload.single('video'), storeBlobController)



module.exports = router;