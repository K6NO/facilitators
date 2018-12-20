import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import NewOrganisationButton from './NewOrganisationButton';
import NewOrganisationEditorComponent from './NewOrganisationEditorComponent';


test('NewOrganisationButton renders', () => {
    const component = renderer.create(
        <NewOrganisationButton />
    ); 
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('NewOrganisationButton click calls function', () => {
    const mockFunction = jest.fn();
    const component = shallow(
        <Button 
            color="primary"
            onClick={mockFunction}>
            Add Organisation
        </Button>
    );
    const button = component.find('button').simulate('click');
    expect(button.length).toBe(1);
    expect(mockFunction.mock.calls.length).toEqual(1);
});

test('NewOrganisationButton state change displays NewOrganisationEditorComponent', () => {
    const component = shallow(
        <NewOrganisationButton />
    );
    component.setState({isOpen: true});
    expect(component.find(NewOrganisationEditorComponent).length).toBe(1);
});

test('NewOrganisationButton click changes state', () => {
    const component = shallow(
        <NewOrganisationButton />
    );
    component.setState({isOpen:false});
    const button = component.find(Button);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(component.state.isOpen).toBeTruthy;    
    expect(component.find(NewOrganisationEditorComponent).length).toBe(1);
});