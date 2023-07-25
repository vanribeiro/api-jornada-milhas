import { fileExists } from '../../utils/file-exists';

describe('Check if a file exists or not: fileExists(filenamePath)', () => {

    test('should return true if file exists', async () => {
        const filenamePath = "src/__test__/routes/mocks/avatar.jpg";
        console.log(filenamePath);
        const result: boolean = await fileExists(filenamePath);
        expect(result).toBeTruthy();
    });

    test('should return false if file exists', async () => {
        const filenamePath = "src/__test__/routes/mocks/avatar-not-exists.jpg";
        const result: boolean = await fileExists(filenamePath);
        expect(result).toBeFalsy();
    });

});