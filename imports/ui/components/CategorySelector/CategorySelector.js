import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

class CategorySelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: ''
      };
    }
    
    changeCategory = (category) => {
        this.setState({
            selected: category
        });
    }
    render () {
        // get the category names according to the locale
        // locale file categories.deepeco . ecofem, etc.
        const categoryArray = [
            { value: 'footprint', label: 'English'},
                    { value: 'deepeco', label: 'Spanish'},
                    { value: 'ecofem', label: 'Hungarian'},
                    { value: 'landart', label: 'Romanian'},
                    { value: 'food', label: 'Slovakian'},
                    { value: 'community', label: 'Slovakian'},
        ]
        return (
            <ReactSelect 
                className="CategorySelector"
                options={categoryArray}
                value={this.state.selected}
                name="languageSelect"
                onChange={this.updateLocale}/>
        )
    }
}
  
CategorySelector.propTypes = {
    locale: PropTypes.string.isRequired

};
  
export default CategorySelector;
  