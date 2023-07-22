import { unlink } from "node:fs/promises";

async function deleteFile(filenamePath: string) {
	try {
        const result = await unlink(filenamePath);
        console.log(`imagem foi deletada!`);
        return result;
    } catch (error) {
        throw error;
    }
}

export default deleteFile;
