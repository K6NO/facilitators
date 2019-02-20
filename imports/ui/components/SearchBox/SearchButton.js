import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import Icon from '../Icon/Icon';
import styled from 'styled-components';

const StyledButton = styled.button`
    height: 40px;
    min-width: 110px;
    padding: .8rem 1.5rem!important;
    background: #0e8ed5!important;
    color: white;
    text-transform: uppercase;
    font-size: 1.6rem!important;
    letter-spacing: 1.5px;
    font-weight: 100!important;
    &:hover {
        background: #0e8ed5bb!important;
    }
    &:focus {
        outline: 1px dotted;
        background: #0e8ed5dd!important;
    }
`

class SearchButton extends React.Component{
    constructor(props){
      super(props);
    }


    render () {
        const { searchCallback } = this.props;
    
        return (
            <StyledButton 
                color="primary"
                onClick={searchCallback}>
                <Icon icon={'search'} />{i18n.__('searchbox.searchBtn')}
            </StyledButton>
        )
    }
}

SearchButton.propTypes = {
    searchCallback : PropTypes.func.isRequired
};

export default SearchButton;