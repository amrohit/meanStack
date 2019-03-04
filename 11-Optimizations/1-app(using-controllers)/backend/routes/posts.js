const express = require("express");
//npm install --save multer (for image support node js)
const multer = require("multer");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

//where multer put files when it detects in incoming request.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

//npm install --save body-parser(to parse data from incoming req)
router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  PostController.createPost
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"), //extracting image
  PostController.updatePost
);
router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
