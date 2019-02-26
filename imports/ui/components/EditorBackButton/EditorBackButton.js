import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';


const StyledButton = styled.button`
    float: right;
    height: 40px;
    min-width: 110px;
    padding: .8rem 1.5rem;
    background: #0e8ed5;
    color: white;
    text-transform: uppercase;
    font-size: 1.6rem;
    letter-spacing: 1.5px;
    font-weight: 100;
    margin-top: 1rem;
    border: 1px solid #0e8ed5;
    &:hover {
        background: #0e8ed5bb;
    }
    &:focus {
        outline: 1px dotted;
        background: #0e8ed5dd;
    }
`
class EditorBackButton extends React.Component{
  constructor(props){
    super(props);
  }

  render () {
    return ( 
        <StyledButton 
            onClick={this.props.closeCallback}
        >
        <Icon icon={'angle-double-left'} size={'lg'}/>
        {`Finish & Back to list`}
    </StyledButton>
    );
  }
}

EditorBackButton.propTypes = {
  closeCallback: PropTypes.func.isRequired,
};

export default EditorBackButton;