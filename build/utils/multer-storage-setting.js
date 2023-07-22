import { randomBytes } from 'crypto';
import { port } from '../server.js';
let addedFileName = '';
const storageSettingsUsersAvatar = {
    destination: function (_req, _file, callback) {
        callback(null, 'uploads/users/avatars/');
    },
    filename: function (_req, file, callback) {
        const extesionFile = file.originalname.split('.')[1];
        const newFilename = randomBytes(32).toString('base64');
        const fullFilename = `${newFilename}.${extesionFile}`;
        addedFileName = `http://localhost:${port}/users/avatars/${fullFilename}`;
        callback(null, fullFilename);
    }
};
export { storageSettingsUsersAvatar, addedFileName };
