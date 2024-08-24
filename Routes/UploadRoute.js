import express from 'express';
import multer from 'multer';

const Router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + '/public/images/'); // Use '/' to specify the directory path
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name); // Use the original filename of the uploaded file
    }
});

const upload = multer({ storage: storage }).single('file');

Router.post('/img/', async (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, error: err });
        }

        if (!req.file) {
            return res.json({ success: false, error: 'No file uploaded' });
        }

        return res.json({ success: true, message: "File uploaded successfully..."});
        // return res.json({ success: true, image: req.file.path, fileName: req.file.filename });
    });
});

export default Router;
