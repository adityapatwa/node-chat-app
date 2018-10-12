let expect = require('expect');
let {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should allow string with non-space characters', () => {
        expect(isRealString('string')).toBe(true);
    });

    it('should reject string with only spaces', () => {
        expect(isRealString('    ')).toBe(false);
    });

    it('should reject non-string values', () => {
        expect(isRealString(true)).toBe(false);
    });
});