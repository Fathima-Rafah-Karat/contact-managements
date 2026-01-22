import multer from "multer";
import path from "path";

// storage config
const storage = multer.diskStorage({
    // multer.diskStorage -Creates a custom storage engine that saves uploaded files to disk.diskstorage have two function:destination and filename
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // where files are saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

// (optional) filter only images
const fileFilter = (req, file, cb) => {
    // .startwith("image/")  -ensures only image files are accepted
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// const upload = multer({ storage, fileFilter });
// if need limits like filesize. add limits
const upload = multer({
  storage,
  fileFilter,
//    for eg :1mb   limits:{filesize:1024}
//   5mb
  limits: { fileSize: 5 *1024 * 1024 }
});


export default upload;
