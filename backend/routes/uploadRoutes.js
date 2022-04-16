import path from "path";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    switch (req.route.path) {
      case "/userInfo": {
        if (!fs.existsSync(`uploads/users/${req.user.id}`)) {
          fs.mkdirSync(`./uploads/users/${req.user.id}`);
        }
        cb(null, `uploads/users/${req.user.id}/`);
        break;
      }
      default:
        cb(null, "uploads/");
    }
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("You can upload only images"));
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;
