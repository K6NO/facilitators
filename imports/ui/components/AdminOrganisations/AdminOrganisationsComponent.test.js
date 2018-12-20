import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import AdminOrganisationsComponent from './AdminOrganisationsComponent';
import NewOrganisationButton from './NewOrganisationButton';
import AdminOrganisationComponent from './AdminOrganisationComponent';

const mockOrgs = [
    {_id: '123'},
    {_id: '456'},
    {_id: '789'}
];
test('AdminOrganisationsComponent renders with ', () => {
    const component = renderer.create(
        <AdminOrganisationsComponent 
        organisations={mockOrgs} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('AdminOrganisationsComponent has NewOrganisationButton and AdminOrganisationComponents', () => {
    const shallowComponent = shallow(
        <AdminOrganisationsComponent
            organisations={mockOrgs} 
        />
    );
    expect(shallowComponent.find(NewOrganisationButton).length).toBe(1);
    expect(shallowComponent.find(AdminOrganisationComponent).length).toBe(3);
});
