import express from "express";
import { getEdit, watch, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController";
import { protectorMiddleware, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); //mongodb에서 생성해주는 고유식별번호가 24자리의 16진수 문자열이므로 [0-9a-f]{24}와 같이 정규식 설정
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit); //같은 url을 사용할 경우 이와 같이 한줄로 쓸수있음
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(uploadVideo.single("video"), postUpload);

export default videoRouter;
