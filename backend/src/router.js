const express = require("express");

const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: process.env.AVATAR_DIRECTORY });

const { hashPassword, verifyPassword, verifyToken } = require("../auth");

const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const fileControllers = require("./controllers/fileControllers");
const commentsControllers = require("./controllers/commentsControllers");

// Auth
router.post("/api/register", hashPassword, userControllers.add);

router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Gestion des avatars
router.post(
  "/api/avatars",
  verifyToken,
  upload.single("avatar"),
  fileControllers.renameAvatar,
  fileControllers.updateAvatar
);
router.get("/api/avatars/:fileName", fileControllers.sendAvatar);

router.post(
  "/api/image",
  upload.single("img"),
  fileControllers.renameImage,
  fileControllers.uploadImage
);
router.get("/api/image/:fileName", fileControllers.sendImage);
router.get("/api/image", fileControllers.browse);
router.get("/api/image/:id", fileControllers.read);
router.delete("/api/image/:id", fileControllers.destroy);

// Gestion des commentaires
router.put("/api/image/:id/comments/:id", commentsControllers.edit);
router.post("/api/image/:id/comments", verifyToken, commentsControllers.add);
router.delete(
  "/api/image/:id/comments/:id",
  verifyToken,
  commentsControllers.destroy
);

module.exports = router;
