import React from 'react';
import renderer from 'react-test-renderer';
import AdminSelectOrganisationComponent from './AdminSelectOrganisationComponent';

const user = {
    _id: "UserId1"
};
const organisations = [{
    _id: '123',
    name: 'org1name',
    }, {
        _id: '456',
        name: 'org2name',
    }
];
const organisationId = '123'
const editing = true;

test('AdminSelectOrganisationComponent renders in editing and non-editing states', ()=>{
    const mockFunction = jest.fn();
    const component = renderer.create(
        <AdminSelectOrganisationComponent
            editing={editing}
            organisations={organisations}
            selectOrganisationCallback={mockFunction}
            selectedOrganisation={organisationId}
            organisationId={organisationId}
            user={user}
         />

    );
    const nonEditingComponent = 
    renderer.create(
        <AdminSelectOrganisationComponent
            editing={editing}
            organisations={organisations}
            selectOrganisationCallback={mockFunction}
            selectedOrganisation={organisationId}
            organisationId={organisationId}
            user={user}
         />
    );

    const editingTree = component.toJSON();
    const nonEditingTree = nonEditingComponent.toJSON();
    expect(editingTree).toMatchSnapshot();
    expect(nonEditingTree).toMatchSnapshot();
});