import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import { Button, Badge } from 'reactstrap';
import { getColorByCategory } from '../../../modules/get-colors';


class EditorTagsComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          editing: false
      }
    }

    getTags = () => {
        const { language } = this.props;
        // TODO find out how to retrieve the tags according to language prefs 
        const tagsObject = i18n.__('tags');
        const tagsArray = Object.values(tagsObject);
        return tagsArray;
    }

    addTag = () => {
        // displays a dropdown with tag names
        this.setState({editing: true});
    }
    
    saveTag = (selection) => {
        const { activity } = this.props;
        const oldTags = activity.tags;
        // find the index of the newly selected tag in the list of tags 
        const newTagIndex = getTags().indexOf(selection.value);
        // push the new selection's index in the array of tags
        oldTags.push(newTagIndex);
        // save
        Meteor.call('activities.updateAttributes', activity._id, 'tags', oldTags, 
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else { 
                Bert.alert('Saved changes', 'success');
            }
        });
        this.setState({editing: false});
    }

    renderTags = ({activity, color}) => {
        // TODO need to add a remove button for each badge (X)
        return activity.tags.map((tagIndex) =>   
            <Badge 
                color="light" 
                pill
                key={tagIndex}
                className="tagPills"
                style={{color: color}}
                >
                {i18n.__(`tags.${tagIndex}`)}
            </Badge>
        );
    }

    render() {
        const { activity } = this.props;
        const color = getColorByCategory(activity.category);

        return (
            <div className="EditorTagsComponent">
                {this.renderTags({activity, color})}
                {!this.state.editing 
                ? <Button color="primary">Add Tag</Button>
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

