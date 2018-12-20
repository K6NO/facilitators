export const Meteor = {
    call: () => null,
    // ... more stuff you'd like to mock on the Meteor object
    };
    
    // ???????
export const Mongo = {
    Files: jest.fn().mockImplementation(() => ({
    _ensureIndex: (jest.fn()),
    allow: (jest.fn()),
    deny: (jest.fn())
    }))
};
export const Roles = {
    userIsInRole: jest.fn()
}