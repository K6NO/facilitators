import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import NewOrganisationEditorComponent from './NewOrganisationEditorComponent';

test('NewOrganisationEditorComponent renders with callback function', () => {
    const mockFunction = jest.fn();
    const component = renderer.create(
        <NewOrganisationEditorComponent 
            closeCallback={mockFunction} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});