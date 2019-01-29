import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

class CategorySelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: null
      };
    }
    
    changeCategory = (selection) => {
        const { selectCategoryCallback } = this.props;
        const category = selection.value;
        this.setState({
            selected: category
        });
        selectCategoryCallback(category);
    }
    render () {
        // get the category names according to the locale
        // locale file categories.deepeco . ecofem, etc.
        const categoryArray = [
            { value: 'footprint', label: i18n.__('categories.footprint')},
            { value: 'deepeco', label: i18n.__('categories.deepeco')},
            { value: 'ecofem', label: i18n.__('categories.ecofem')},
            { value: 'landart', label: i18n.__('categories.landart')},
            { value: 'food', label: i18n.__('categories.food')},
            { value: 'community', label: i18n.__('categories.community')},
        ]
        return (
            <Select 
                className="basic-single CategorySelector"
                classNamePrefix="select"
                options={categoryArray}
                value={this.state.selected}
                name="categorySelect"
                defaultValue="Categories"
                onChange={(selection) => this.changeCategory(selection)}
                aria-label="Select Language"
                />
        )
    }
}
  
CategorySelector.propTypes = {

};
  
export default CategorySelector;
  