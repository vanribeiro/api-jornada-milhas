import { randomBytes } from 'crypto';
import { port } from '../server';

let addedFilename = '';

const storageSettingsUsersAvatar = {
    destination: function (_req: any, _file: any, callback: (arg0: null, arg1: string) => void) {
        const PATH = 'uploads/users/avatars/';
        callback(null, `${PATH}`);
    },
    filename: function (_req: any, file: any, callback: (arg0: null, arg1: string) => void) {

        const extesionFile = file.originalname.split('.')[1];
        const newFilename = randomBytes(32).toString('base64');
        const fullFilename = `${newFilename}.${extesionFile}`;

        addedFilename = `http://localhost:${port}/users/avatars/${fullFilename}`;

        callback(null, fullFilename);
    }
}

export {
    storageSettingsUsersAvatar,
    addedFilename
};