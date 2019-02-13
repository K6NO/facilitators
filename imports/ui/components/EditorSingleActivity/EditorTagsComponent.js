import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import { Button, Badge } from 'reactstrap';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';


class EditorTagsComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          editing: false
      }
    }

    getTags = () => {
        const { language } = this.props;        
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
        // push the new selection's index (value) in the array of tags
        oldTags.push(selection.value);
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

    deleteTag = () => {
        console.log('delete tag');
        
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
                `{i18n.__(`tags.${tagIndex}`)} `
                <Icon 
                    icon={'delete'}
                    onClick={() => this.deleteTag(tagIndex)} />
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
                ? <Button 
                    color="primary"
                    onClick={this.addTag}>
                    <Icon icon={'plus'} />
                    ` Add Tag`
                </Button>
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

