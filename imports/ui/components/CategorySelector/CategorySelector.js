import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import { getCategoryName, getCategoryArray } from '../../../modules/get-select-translations';
import './CategorySelector.scss';

class CategorySelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: ''
      };
    }
    
    changeCategoryPage = (category) => {
        const { history } = this.props;
        history.push('/category/' + category);
    }

    changeCategory = (selection) => {
        const category = selection.value;
        this.setState({
            selected: getCategoryName(category)
        }, () => this.changeCategoryPage(category));
    }

    render () {
        const categoryArray = getCategoryArray();
        return (
            <Select 
                className="basic-single CategorySelector"
                classNamePrefix="select"
                isSearchable={false}
                isClearable={false}
                options={categoryArray}
                name="categorySelect"
                placeholder={i18n.__('menu.categories')}
                value={this.state.selected}
                onChange={(selection) => this.changeCategory(selection)}
                aria-label="Select Category"
                />
        )
    }
}
  

CategorySelector.propTypes = {
    callback: PropTypes.func,
};
  
export default withRouter(CategorySelector);
  