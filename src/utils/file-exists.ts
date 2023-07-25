import fs from 'fs-extra';

async function fileExists(filenamePath: string){
    return await fs.pathExists(filenamePath);
}

export {
    fileExists
}