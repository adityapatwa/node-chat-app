const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
    let usersObject;

    beforeEach(() => {
        usersObject = new Users();
        usersObject.users = [
            {
                id: '1',
                name: 'Geralt',
                room: 'The Witcher 3'
            },
            {
                id: '2',
                name: 'Yennefer',
                room: 'The Witcher 3'
            },
            {
                id: '3',
                name: 'Rico',
                room: 'Just Cause 3'
            }]
    });

    it('should add a new user', () => {
        let usersObj = new Users();
        let user = {
            id: '123',
            name: 'Aditya',
            room: 'The Office Fans'
        };

        usersObj.addUser(user.id, user.name, user.room);

        expect(usersObj.users).toEqual([user]);
    });

    it('should return names for The Witcher 3', () => {
        let userList = usersObject.getUserList('The Witcher 3');
        expect(userList).toEqual(['Geralt', 'Yennefer']);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = usersObject.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(usersObject.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let userId = '99';
        let user = usersObject.removeUser(userId);
        expect(user).toBeUndefined();
        expect(usersObject.users.length).toBe(3);
    });

    it('should find a user', () => {
        let user = usersObject.getUser('2');
        expect(user.id).toBe('2');
    });

    it('should not find a user', () => {
        let user = usersObject.getUser('99');
        expect(user).toBeUndefined();
    });

    it('should return true for the same name and room', () => {
        expect(usersObject.isUnique('Siri', 'The Witcher 3')).toBe(true);
    });

    it('should return false for the same name and room', () => {
        expect(usersObject.isUnique('Geralt', 'The Witcher 3')).toBe(false);
    });

    it('should return true for the same name and different room', () => {
        expect(usersObject.isUnique('Geralt', 'Just Cause 3')).toBe(true);
    });
});