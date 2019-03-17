import React from 'react';
import Icon from '../Icon/Icon';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDeleteButton = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: .5rem .8rem;
    background: #dc3545;
    border: 1px solid transparent;
    color: #ffffff;
    &:hover, &:focus {
        background: #aa1a29;
        outline: none;
        border: 1px solid #aa1a29;
    }
`;

const deleteImage = (activity, index) => {
    const newImages = activity.images;
    const deletedImage = newImages.splice(index, 1)[0];
    activity.images = newImages;
    ['owner', 'createdAt', 'updatedAt'].forEach(e => delete activity[e]);
    
    Meteor.call('aws.deleteFileFromAmazon', deletedImage, (error) => {
        if(error) {
            Bert.alert(error.reason, 'danger');
        } else {
            const mobileUrl = deletedImage.replace('original', 'mobile');
            Meteor.call('aws.deleteFileFromAmazon', mobileUrl, (error) => {
                if(error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Meteor.call('activities.update', activity, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'danger');
                        } else {
                            Bert.alert('Image deleted', 'warning');
                        }
                    });
                }
            });
        }
    });
}
const DeleteImageButton = (props) => (
    <StyledDeleteButton onClick={() => deleteImage(props.activity, props.index)}>
        <Icon icon={'trash'} size={'lg'} />
    </StyledDeleteButton>
);

DeleteImageButton.propTypes = {
    activity: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};
export default DeleteImageButton;