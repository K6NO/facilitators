import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import { Button, Badge } from 'reactstrap';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import './EditorTagsComponent.scss';

const StyledButton = styled.button`
    display: inline-block;
    font-weight: 400;
    background-color: ${props => props.color};
    color: white;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid white;
    padding: .375rem .75rem;
    margin: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 15px;
    &:hover {
        background-color: white;
        border: ${props => `1px solid ${props.color}`};
        color: ${props => `${props.color}`};
    }
    &:focus {
        background-color: white;
        border: ${props => `1px solid ${props.color}`};
        color: ${props => `${props.color}`};
    }
    /* transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; */
    `;

const StyledTagBadge = styled(Badge)`
    display: inline-block;
    margin-right: 1rem;
    padding: .25rem 1rem!important;
    border-radius: .25rem;
    border-radius: 10rem;   
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    background-color: ${props => props.backcolor};
    color: ${props => props.textcolor}!important;
`;
class EditorTagsComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          editing: false
      }
    }

    getTags = () => {
        const tagsArray = [];
        for (let i=0; i<20; i++) {
            tagsArray.push({value: i, label: i18n.__(`tags.${i}`)});
        }
        return tagsArray;
    }

    addTag = () => {
        // displays a dropdown with tag names
        this.setState({editing: true});
    }
    
    saveTag = (selection) => {
        const { activity } = this.props;
        const oldTags = activity.tags;
        // if the tag is not added yet (avoid duplicates)
        // notice the `` --> index values need to be pushed and checked as string types
        if(oldTags.indexOf(`${selection.value}`) === -1){
            // push the new selection's index (value) in the array of tags
            oldTags.push(`${selection.value}`);
            // save
            Meteor.call('activities.updateAttributes', activity._id, 'tags', oldTags, 
            (error) => {
                if(error) {
                    Bert.alert(error.reason, 'danger');
                } else { 
                    Bert.alert('Saved changes', 'success');
                }
            });
        }
        
        this.setState({editing: false});
    }

    deleteTag = (tagIndex) => {
        const { activity } = this.props;
        /* find the index of the tag's index number in the activity.tags array
         ( only the index number of an activity is stored, so that its translatons
            can be easily retrieved. )
        */
        const arrayIndex = activity.tags.findIndex(tag => tag === tagIndex);
        // remove the tag's index from the array
        activity.tags.splice(arrayIndex, 1);
        // update the activity with the reduced array
        Meteor.call('activities.updateAttributes', activity._id, 'tags', activity.tags, 
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else { 
                Bert.alert('Saved changes', 'success');
            }
        });
    }

    renderTags = ({activity, color}) => {
        return activity.tags.map((tagIndex) =>   
            <StyledTagBadge 
                color="light" 
                pill
                key={tagIndex}
                className="tagPills"
                backcolor={"white"}
                textcolor={color}
                >
                {`${i18n.__(`tags.${tagIndex}`)} `}
                <Button
                    onClick={() => this.deleteTag(tagIndex)}
                    className="deleteTagButton">
                    <Icon 
                    icon={'trash'}
                     />
                </Button>
            </StyledTagBadge>
        );
    }

    render() {
        const { activity } = this.props;
        const color = getColorByCategory(activity.category);

        return (
            <div className="EditorTagsComponent">
                {this.renderTags({activity, color})}
                {!this.state.editing 
                ? <StyledButton 
                    color={color}
                    onClick={this.addTag}>
                    <Icon icon={'plus'} />
                    {` Add Tag`}
                </StyledButton>
                : <Select 
                    className="basic-single CategorySelector"
                    classNamePrefix="tags-edit"
                    isSearchable={false}
                    isClearable={false}
                    options={this.getTags()}
                    name="categoryEditSelect"
                    onChange={(selection) => this.saveTag(selection)}
                    aria-label="Edit Category"
                />  }
            </div>
        )
    }
}

EditorTagsComponent.defaultProps = {
};
  
EditorTagsComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};


export default EditorTagsComponent;

