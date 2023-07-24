import { unlink } from "node:fs/promises";
import fs from 'fs-extra';

async function deleteFile(filenamePath: string) {
	try {
        await unlink(filenamePath);
        console.log(`imagem foi deletada!`);
        return isThisFileInTheFolder(filenamePath);
    } catch (error) {
        throw error;
    }
}

async function isThisFileInTheFolder(filenamePath: string){
    const result: boolean = await fs.pathExists(filenamePath);
    return !result;
}

export default deleteFile;
