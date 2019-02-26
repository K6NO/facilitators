import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import Icon from '../Icon/Icon';
import styled from 'styled-components';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';

const StyledButton = styled(BasicStyledButton)`
    font-size: 1.6rem;
`

class SearchButton extends React.Component{
    constructor(props){
      super(props);
    }


    render () {
        const { searchCallback } = this.props;
    
        return (
            <StyledButton 
                color={'#ffffff'}
                backcolor={'#0e8ed5'}
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