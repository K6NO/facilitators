import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';

const TopFlexContainer = styled.div`
    box-shadow: 0 3px 1px -2px #ddd;
    margin-bottom: .5rem;
    padding: 0 1rem;
    width : 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: 10px;
`;
const StyledFlexContainer = styled.div`
    flex: 0 0 100%;
    max-width: 100%;
    display: flex;
    margin-bottom: 1rem;
`;
const StyledTextArea = styled.textarea`
    overflow: auto;
    resize: none;
    width: 100%;
    height: 80px;
    font-size: 1.3rem;
    border: ${props => props.color ? `1px solid ${props.color}77` : "1px solid #33333377"};
    border-radius: 10px;
    padding: .3rem 1rem;
    &:focus {
        outline: 0;
        border: ${props => props.color ? `1px solid ${props.color}77` : "1px solid #33333377"};
        background: ${props => props.color ? `${props.color}33` : "#33333333"};
    }
`;
class WriteCommentComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
      }
    }
    updateMessage = (e) => {
        this.setState({
            message: e.target.value
        });
    }

    submitComment = (e) => {
        const { activity } = this.props;
        e.preventDefault();
        if(this.state.message.length > 0){
            // TODO drop an alert here before posting / OK - Cancel
            Meteor.call('activities.addComment', activity._id, this.state.message, (error) => {
                if(error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Bert.alert('Comment posted', 'success');
                    this.setState({
                        message: ''
                    });
                }
            });
        }
    }

    render () {
        return (
            <TopFlexContainer>
                <StyledFlexContainer>    
                    <StyledTextArea 
                        color={this.props.color}
                        cols="30"
                        rows="3"
                        name="message"
                        value={this.state.message}
                        onChange={this.updateMessage} 
                        placeholder="Write a comment, share an experience. Be concise, less than 600 characters." >
                    </StyledTextArea>
                </StyledFlexContainer>
                <StyledFlexContainer>
                    <BasicStyledButton 
                        color={'#ffffff'}
                        backcolor={this.props.color}
                        onClick={this.submitComment}>
                            <Icon icon={'paper-plane'} />
                        {` Send Comment`}
                    </BasicStyledButton>
                </StyledFlexContainer>
            </TopFlexContainer>
        )
    }
}
WriteCommentComponent.propTypes = {
  activity: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};


export default WriteCommentComponent;