const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

//npm install --save body-parser(to parse data from incoming req)
router.post("", checkAuth, extractFile, PostController.createPost);

router.put(
  "/:id",
  checkAuth,
  extractFile, //extracting image
  PostController.updatePost
);
router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
