import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';


const StyledButton = styled(BasicStyledButton)`
    float: right;
    min-width: 110px;
    text-transform: uppercase;
    margin-top: 1rem;
    &:hover {
        text-decoration: underline;
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
            backcolor={'transparent'}
            color={'#0e8ed5'}
        >
        <Icon icon={'angle-double-left'} size={'lg'}/>
        {`Finish Editing & Back to list`}
    </StyledButton>
    );
  }
}

EditorBackButton.propTypes = {
  closeCallback: PropTypes.func.isRequired,
};

export default EditorBackButton;