import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //view engine -> pug로 설정
app.set("views", process.cwd() + "/src/views"); //렌더링 파일 위치를 변경
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
