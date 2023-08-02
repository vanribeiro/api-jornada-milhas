import { randomBytes } from 'crypto';
import { destinationRepository } from '../repositories/destination';
import Destination from '../models/Destination';

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
        const PATH = 'uploads/destinos/';
        callback(null, `${PATH}`);
    },
    filename: async function (req: any, file: any, callback: (arg0: null, arg1: string) => void) {
        const { id }: any = req.params;
        const { name }: any = req.body;

        const imageName = await renameFile(name, id)
        
        const extesionFile = file.originalname.split('.')[1];
        const randomValues = randomBytes(4).toString('base64');
        const fullFilename = `${imageName}-${randomValues}.${extesionFile}`;

        callback(null, fullFilename);
    }
}

const renameFile = async (name: string | any, id: number | any): Promise<string> => {
    
    try {
        let splitName: string[];
        let imageName: string;

        if(name) {
            splitName = name.toLowerCase().split(/\s/i);
            imageName = splitName.join('-');
        } else {
            const destination: Destination = await destinationRepository.findOneBy({ id });
            splitName = destination.name.toLowerCase().split(/\s/i);
            imageName = splitName.join('-');
        }
        return imageName;

    } catch (error) {
        throw error;
    }
}

export {
    storageSettingsUsersAvatar,
    storageSettingsDestination
};