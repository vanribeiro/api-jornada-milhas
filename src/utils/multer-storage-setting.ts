import { randomBytes } from 'crypto';

const storageSettingsUsersAvatar = {
    destination: function (_req: any, _file: any, callback: (arg0: null, arg1: string) => void) {
        const PATH = 'uploads/users/avatars/';
        callback(null, `${PATH}`);
    },
    filename: function (_req: any, file: any, callback: (arg0: null, arg1: string) => void) {

        const extesionFile = file.originalname.split('.')[1];
        const newFilename = randomBytes(32).toString('base64');
        const fullFilename = `${newFilename}.${extesionFile}`;

        callback(null, fullFilename);
    }
}

const storageSettingsDestination = {
    destination: function (_req: any, _file: any, callback: (arg0: null, arg1: string) => void) {
        const PATH = 'uploads/destinations';
        callback(null, `${PATH}`);
    },
    filename: function (req: any, file: any, callback: (arg0: null, arg1: string) => void) {
        const { name } = req.body;
        const splitName: string[] = name.toLowerCase().split(/\s/i);
        const imageName: string = splitName.join('-');
        
        const extesionFile = file.originalname.split('.')[1];
        const randomValues = randomBytes(4).toString('base64');
        const fullFilename = `${imageName}-${randomValues}.${extesionFile}`;
        console.log(fullFilename);

        callback(null, fullFilename);
    }
}

export {
    storageSettingsUsersAvatar,
    storageSettingsDestination
};