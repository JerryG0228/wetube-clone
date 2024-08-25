import "dotenv/config"; //env 파일을 읽어주는 부분 -> 최대한 최상단에(env파일의 내용이 필요한 곳 이전) 설정해야됨
import "./db"; // DB 연결
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
