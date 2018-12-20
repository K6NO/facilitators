import { byRole } from './sortUsers';
const mockByRole = jest.fn(() => 3);

const obj1 = {
    roles: ['role1', 'role2']
}
const obj2 = {
    roles: ['role1']
}

const obj4 = {
    roles: ['role1', 'role2']
}
const obj3 = {
    roles: ['role1']
}

test('sortUsers.js - order by roles - descending', () => {
    // Mock fn tests
    expect(mockByRole(1,2)).toBe(3);
    expect(mockByRole).toBeCalledTimes(1);
    expect(mockByRole).toHaveBeenCalledTimes(1)
    
    // fn test with fake data
    expect(byRole(obj3, obj4)).toBe(1);
    expect(byRole(obj1, obj2)).toBe(-1);
    expect(byRole(obj1, obj4)).toBe(0);
});