import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import Icon from '../Icon/Icon';

class SearchButton extends React.Component{
    constructor(props){
      super(props);
    }

    render () {
        const { searchCallback } = this.props;
    
        return (
            <Button 
                color="primary"
                onClick={searchCallback}>
                <Icon icon={'search'} />{i18n.__('searchbox.searchBtn')}
            </Button>
        )
    }
}

SearchButton.propTypes = {
    searchCallback : PropTypes.func.isRequired
};

export default SearchButton;