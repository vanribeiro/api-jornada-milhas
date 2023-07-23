import { randomBytes } from 'crypto';
import { port } from '../server';

let addedFileName = '';

const storageSettingsUsersAvatar = {
    destination: function (_req: any, _file: any, callback: (arg0: null, arg1: string) => void) {
        callback(null, 'uploads/users/avatars/')
    },
    filename: function (_req: any, file: any, callback: (arg0: null, arg1: string) => void) {

        const extesionFile = file.originalname.split('.')[1];
        const newFilename = randomBytes(32).toString('base64');
        const fullFilename = `${newFilename}.${extesionFile}`;

        addedFileName = `http://localhost:${port}/users/avatars/${fullFilename}`;

        callback(null, fullFilename);
    }
}

export {
    storageSettingsUsersAvatar,
    addedFileName
};