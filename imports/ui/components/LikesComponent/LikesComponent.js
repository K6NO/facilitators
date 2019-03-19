import React from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { BasicStyledButton } from '../MainStyledComponents/MainStyledComponents';

const StyledLikesComponent = styled.div`
    display: inline;
    float: left;
    background: ${props => props.backcolor || '#ffffff'};
    color: ${props => props.color || '#777777'};
    border-radius: 15rem;
    text-align: right;
    white-space: nowrap;
`;
const StyledCounter = styled.span`
    background: ${props  => props.backcolor || '#ffffff'};
    color: ${props  => props.color || '#777777'};
    padding: 1rem;
    border-radius: 15rem;
    font-size: 1.8rem;
`;
const StyledLikeButton = styled(BasicStyledButton)`
    height: 30px;
    padding: .5rem .4rem .1rem;
    line-height: 1;
    vertical-align: baseline;
    &:hover {
      background: ${props => props.color || '#777777'};
      color: ${props => props.backcolor || '#ffffff'};
      border: ${props => `1px solid ${props.color || '#777777'}`};
      box-shadow: none;
    }
    &:focus {
        outline: none;
        background: ${props => props.color || '#777777'};
        color: ${props => props.backcolor || '#ffffff'};
        border: ${props => `1px solid ${props.color || '#777777'}`};
        box-shadow: none;
    }
    &:active {
        outline: none;
        background: ${props => props.color || '#777777'};
        color: ${props => props.backcolor || '#ffffff'};
        border: ${props => `1px solid ${props.color || '#777777'}`};
        box-shadow: none;
    }
    
`;
const userHasLiked = (props) => {
    return props.user.profile.likes 
        ? props.user.profile.likes.indexOf(props.activity._id) > -1
        : false;
}
const userLikeHandle = (props) => {
    if(!userHasLiked(props)) {
        // check if the user already has a likes array, if not create, if yes add activity
        const profile = props.user.profile;
        profile.likes 
        ? profile.likes.push(props.activity._id)
        : profile.likes = [props.activity._id]
        
        Meteor.call('users.editProfile', profile, (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else {
                // register user's Id in the activity likes array
                const newLikes = props.activity.likes;
                newLikes.push(props.user._id);
                Meteor.call('activities.likeUpdate', props.activity._id, newLikes, (error) => {
                    if(error) {
                        Bert.alert(error.reason, 'danger');
                    } else {
                        Bert.alert('Activity added to your favourites.', 'info');
                    }
                })
            }
        });
    }
}

const userDislikeHandle = (props) => {
    if(userHasLiked(props)) {
        const profile = props.user.profile;
        profile.likes.splice(profile.likes.indexOf(props.activity._id), 1);
        // remove activityId from user profile's like array
        Meteor.call('users.editProfile', profile, (error) => {
            if(error) {
                Bert.alert(error.reason, 'danger');
            } else {
                // remove userId from activity's like array
                const newLikes = props.activity.likes;
                newLikes.splice(newLikes.indexOf(props.user._id), 1);
                Meteor.call('activities.likeUpdate', props.activity._id, newLikes, (error) => {
                    if(error) {
                        Bert.alert(error.reason, 'danger');
                    } else {
                        Bert.alert('Activity removed from your favourites.', 'info');
                    }
                })
            }
        });
    }

}
const LikesComponent = (props) => (
    props.user ? 
    <StyledLikesComponent
        color={props.backcolor}
        backcolor={props.color}>
        <StyledCounter
            color={props.backcolor}
            backcolor={props.color}>
            {` ${props.activity.likes.length} `}
            <Icon icon={'heart'} /> {` `}
        </StyledCounter>
        {!userHasLiked(props) ? 
            <StyledLikeButton
                color={props.color}
                backcolor={props.backcolor}
                onClick={() => userLikeHandle(props)}>
                <Icon size={'lg'} icon={'heart'} />
            </StyledLikeButton>
        : <StyledLikeButton
                color={props.backcolor}
                backcolor={props.color}
                onClick={() => userDislikeHandle(props)}>
                <Icon style={'far'} size={'lg'} icon={'heart'} />   
            </StyledLikeButton>}
        
    </StyledLikesComponent>
    : ''
)
LikesComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    user: PropTypes.object,
    emailAddress: PropTypes.string,
    color: PropTypes.string,
    backcolor: PropTypes.string
}
export default LikesComponent;