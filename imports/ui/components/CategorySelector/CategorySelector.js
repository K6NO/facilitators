import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import i18n from 'meteor/universe:i18n';
import { getCategoryName, getCategoryArray } from '../../../modules/get-category-name';
import './CategorySelector.scss';


class CategorySelector extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: ''
      };
    }
    
    changeCategory = (selection) => {
        const { history } = this.props;
        const category = selection.value;
        this.setState({
            selected: getCategoryName(category)
        })
        history.push('/category/' + category);
        
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
};
  
export default withRouter(CategorySelector);
  