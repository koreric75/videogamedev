import fs from 'fs';
import path from 'path';

describe('position frame files', () => {
    test('frame files exist in assets', () => {
        const base = path.join(__dirname, '..', 'assets', 'sprites');
        expect(fs.existsSync(path.join(base, 'position_0.svg'))).toBe(true);
        expect(fs.existsSync(path.join(base, 'position_1.svg'))).toBe(true);
        expect(fs.existsSync(path.join(base, 'position_2.svg'))).toBe(true);
    });
});