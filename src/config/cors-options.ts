import { CorsOptions } from "cors";

const whiteList = [
    'http://localhost:3000/',
    'http://localhost:8080/'
];

const corOptions : CorsOptions =  {
    origin: (origin: string, callback: Function) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('Não permitido pelo CORS'));
        }
    }
}

export {
    corOptions
}