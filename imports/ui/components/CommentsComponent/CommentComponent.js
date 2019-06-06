import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';

const TopFlexContainer = styled.div`
    background : ${props => !props.authorized 
        ? '#dc3545'
        : props.backcolor 
            ? `${props.backcolor}11` 
            : "#777"};
    box-shadow: 0 3px 1px -2px #ddd;
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding: .5rem 1rem;
    width : 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: .5rem;
`;
const StyledFlexContainer = styled.div`
    flex: 0 0 100%;
    max-width: 100%;
    display: flex;
`;

const HalfFlexContainer = styled.div`
    flex: 0 0 50%;
    max-width: 50%;
    text-align: right;
    font-style: italic;
`;
const StyledDate = styled.span`
    color: #777;
    text-decoration: underline;
`;

const getDateTime = (dateTime) => {
    return [
        `${dateTime.split('T')[0]}`,
        `${dateTime.split('T')[1].substring(0,5)}`
    ]
}

const CommentComponent = (props) => (
    <div >
        <TopFlexContainer 
            authorized={props.comment.authorized}
            backcolor={props.color}>
            <StyledFlexContainer>
                <p>{props.isEditor 
                    ? props.comment.message
                    : props.comment.authorized 
                        ? props.comment.message
                        : 'This message has not been authorized to display. Please contect an admin.'}</p>
            </StyledFlexContainer>
            <StyledFlexContainer>
                <HalfFlexContainer>
                    <span>{props.comment.username}</span>
                </HalfFlexContainer>
                <HalfFlexContainer>
                    <StyledDate>{`${getDateTime(props.comment.updatedAt)[0]} `}{getDateTime(props.comment.updatedAt)[1]}</StyledDate>
                </HalfFlexContainer>
            </StyledFlexContainer>
            {props.isEditor ? 
            <StyledFlexContainer>
                <BasicStyledButton
                    backcolor={props.color}
                    color={'#ffffff'}
                    onClick={() => props.removeComment(props.comment)}>
                        {props.comment.authorized 
                    ? 'Remove comment' 
                    : 'Re-publish comment'}
                </BasicStyledButton>
                </StyledFlexContainer> : ''}
        </TopFlexContainer>
    </div>
)

CommentComponent.defaultProps = {
    isEditor: false,
}

CommentComponent.propTypes = {
    comment: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    isEditor: PropTypes.bool,
    removeComment: PropTypes.func
  };
export default CommentComponent;