import { unlink } from "node:fs/promises";
async function deleteImageFile(filenamePath) {
    try {
        const result = await unlink(filenamePath);
        console.log(`imagem foi deletada!`);
        return result;
    }
    catch (error) {
        throw error;
    }
}
export default deleteImageFile;
