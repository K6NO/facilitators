import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import AdminUserComponent from './AdminUserComponent';
import { Button } from 'reactstrap';



const user = {
    _id: "UserId1",
    roles: ['admin', 'editor', 'superadmin']
};
const organisations = [{
    _id: '123',
    name: 'org1name',
    }, {
        _id: '456',
        name: 'org2name',
    }
];
test('AdminUserComponent renders with props', () => {
    const component = renderer.create(
        <AdminUserComponent 
            key={user._id} 
            userListed={user}
            organisations={organisations}
        />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Clicking SwitchPasswordButton opens password editing mode', () => {
    const shallowComp = shallow(
        <AdminUserComponent 
            key={user._id} 
            userListed={user}
            organisations={organisations}
        />);
        shallowComp.setState({editing:true});
        shallowComp.find('.switchPasswordButton').simulate('click');
        // to get refreshed state
        shallowComp.update();
        expect(shallowComp.state().passwordEditing).toBeTruthy();
});

test('Clicking Edit button opens general editing mode', () => {
    const shallowComp = shallow(
        <AdminUserComponent 
            key={user._id} 
            userListed={user}
            organisations={organisations}
        />);
        shallowComp.find('.switchEditModeButton').simulate('click');
        // to get refreshed state
        shallowComp.update();
        expect(shallowComp.state().editing).toBeTruthy();
});