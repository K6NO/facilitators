import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Select from 'react-select';
import Icon from '../Icon/Icon';
import { getCategoryName, getCategoryArray } from '../../../modules/get-category-name';

class EditorCategoriesComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          category : getCategoryName(this.props.activity.category),
      }
    }

    saveCategory = (selection) => {
        this.setState({category: selection.label})
        const activityId = this.props.activity._id;
        console.log(selection);
        Meteor.call('activities.updateAttributes', 
        activityId, 'category', selection.value,
        (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else { 
                Bert.alert('Saved changes', 'success');
            }
        });
    }

    render() {
        const categoryArray = getCategoryArray();
        return (
            <div className="EditorCategoriesComponent">
                 <Select 
                    className="basic-single CategorySelector"
                    classNamePrefix="category-edit"
                    isSearchable={false}
                    isClearable={false}
                    options={categoryArray}
                    name="categoryEditSelect"
                    value={this.state.category}
                    onChange={(selection) => this.saveCategory(selection)}
                    aria-label="Edit Category"
                />
            </div>
        )
    }
}

EditorCategoriesComponent.defaultProps = {
};
  
EditorCategoriesComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default EditorCategoriesComponent;

