import app from "./app";
import http from "http";

const port: number = Number(process.env.PORT) | 3000;

if(process.env.NODE_ENV !== 'test') {

    http.createServer(app).listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });

}

export {
    port
}