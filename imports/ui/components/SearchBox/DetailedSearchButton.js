import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';

const StyledButton = styled.button`
    height: 40px;
    min-width: 110px;
    padding: .8rem 1.5rem;
    background: white;
    color: #0e8ed5;
    text-transform: uppercase;
    font-size: 1.3rem;
    letter-spacing: 1.5px;
    font-weight: 100;
    border: 1px transparent solid;
    &:hover {
        text-decoration: underline;
        color: #0056b3;
        outline: none;
    }
    &:focus {
        text-decoration: none;
        color: #0056b3dd;
        outline: none;
    }
    &:focus:hover {
        text-decoration: underline;
    }
`

class DetailedSearchButton extends React.Component{
    constructor(props){
      super(props);
    }

    render () {
        const { detailed, callback } = this.props;
    
        return (
            <StyledButton 
                onClick={callback}>
                {!detailed ? i18n.__('searchbox.detailedBtn') : i18n.__('searchbox.simpleBtn')}
            </StyledButton>
        )
    }
}

DetailedSearchButton.propTypes = {
    detailed : PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired
};

export default DetailedSearchButton;