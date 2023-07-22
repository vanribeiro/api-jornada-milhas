const whiteList = [
    'http://localhost:3000/',
    'http://localhost:8080/'
];
const corOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Não permitido pelo CORS'));
        }
    }
};
export { corOptions };
