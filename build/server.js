import app from "./app.js";
const port = 3000 | Number(process.env.PORT);
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
export { port };
