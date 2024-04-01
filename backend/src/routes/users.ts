import express from "express";
import * as usersController from "../controllers/users.js";
import * as validation from "../middleware/validation.js";

const router = express.Router();

// view username and creds
router.get("/info", usersController.getUserInfo);

// get chat history
router.get("/chat", usersController.getChatHistory);

// get file collections

router.get("/collections", usersController.getFileCollections);

// update user login creds, metas
router.patch("/", validation.updateUser, usersController.updateUser);

// delete account
router.delete("/", usersController.deleteUser);

// create user
router.post("/", validation.createUser, usersController.createUser);

// router.get("/:id/posts", usersController.getUserPosts);
// router.get("/:id/posts-liked", usersController.getUserLikedPosts);
// router.get("/:id/posts-followed", usersController.getUserFollowedPosts);

export default router;
