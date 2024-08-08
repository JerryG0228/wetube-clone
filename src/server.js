import express from "express"; //express 모듈
import morgan from "morgan"; //미들웨어 모듈
import session from "express-session"; //세션 모듈
import MongoStore from "connect-mongo"; //서버가 종료되도 세션을 유지시키기 위해 세션을 db에 저장하기 위한 모듈
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

console.log(process.cwd()); //현재 작업 위치 출력

const app = express(); //Express 애플리케이션 인스턴스를 생성
const logger = morgan("dev"); //개발 모드의 morgan 로거를 설정. morgan("dev")는 간단한 로그 형식을 제공

app.set("view engine", "pug"); //view engine -> pug로 설정
app.set("views", process.cwd() + "/src/views"); //렌더링 파일 위치를 변경
app.use(logger); //모든 요청에 대해 morgan 로거 미들웨어를 사용
//URL-encoded 데이터를 파싱하여 req.body에 추가하는 미들웨어를 사용. extended: true -> qs 라이브러리를 사용하여 쿼리 문자열을 파싱
app.use(express.urlencoded({ extended: true }));

app.use(
  //세션 설정
  session({
    secret: process.env.COOKIE_SECRET, //세션 암호화에 사용되는 비밀 키
    resave: false, //세션이 수정되지 않더라도 세션을 다시 저장할지 여부를 설정
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부를 설정
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }), // 세션 저장 위치를 db로 옮김
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log("[sessions]\n", sessions);
    next();
  });
});

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
