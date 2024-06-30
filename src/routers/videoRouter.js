import express from "express";
import { getEdit, watch, deleteVideo, upload, postEdit, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); //mongodb에서 생성해주는 고유식별번호가 24자리의 16진수 문자열이므로 [0-9a-f]{24}와 같이 정규식 설정
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); //같은 url을 사용할 경우 이와 같이 한줄로 쓸수있음
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;