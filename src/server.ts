import app from "./app";
import http from "http";

const port: number = 3000 | Number(process.env.PORT);

if(process.env.NODE_ENV !== 'test') {

    http.createServer(app).listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });

}

export {
    port
}