import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import DeleteOrganisationButton from './DeleteOrganisationButton';
  
const organisationId = '3454365467567fgfdgfdgfd';

test('Admin DeleteOrganisationButton with organisationId', () => {
    const component = renderer.create(
        <DeleteOrganisationButton organisationId={organisationId} />
        );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Admin delete organisation button click calls function', () => {
    const mockFunction = jest.fn();
    const component = shallow(
        <Button color="danger" onClick={mockFunction}>Delete</Button>
    );
    const button = component.find('button');
    button.simulate('click');
    expect(button.length).toBe(1)
    expect(mockFunction.mock.calls.length).toEqual(1);
});