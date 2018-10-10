let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'Aditya';
        let text = 'Testing generateMessage function';
        let message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location message object', () => {
        let from = 'Aditya';
        let url = 'https://www.google.com/maps?q=36,75';
        let message = generateLocationMessage(from, 36,75);

        expect(message).toMatchObject({from, url});
        expect(typeof message.createdAt).toBe('number');
    });
});