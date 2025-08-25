import express from "express";
import {
  login,
  getAllBlogs,
  getBlogById,
  signup,
  profile,
  logout,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/signup", signup);
blogRouter.post("/login", login);
blogRouter.get("/profile", profile);
blogRouter.post("/logout", logout);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
export default blogRouter;
