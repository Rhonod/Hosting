const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from 'public' directory
app.use(express.static('public'));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Handle file uploads
app.post('/upload', upload.single('bot-file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    res.send(`File uploaded successfully! Path: ${filePath}`);
    
    // Execute the bot script (assuming it’s a Node.js script)
    exec(`node ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error executing bot script: ${err}`);
            return;
        }
        console.log(`Bot script output: ${stdout}`);
        if (stderr) {
            console.error(`Bot script errors: ${stderr}`);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
