import express from "express";
import { getEdit, watch, deleteVideo, upload, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit); //같은 url을 사용할 경우 이와 같이 한줄로 쓸수있음
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);

export default videoRouter;
