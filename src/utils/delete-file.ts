import { unlink } from "node:fs/promises";
import { fileExists } from "./file-exists";

async function deleteFile(filenamePath: string) {
	try {
        await unlink(filenamePath);
        console.log(`imagem foi deletada!`);
        return fileExists(filenamePath);
    } catch (error) {
        throw error;
    }
}

export default deleteFile;
