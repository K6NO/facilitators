import React from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { BasicStyledLink } from '../MainStyledComponents/MainStyledComponents';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';

const StyledLink = styled(BasicStyledLink)`
    padding: .5rem 1rem;
    border-radius: .25rem;
`;
export default RenderEmailLink = ({activity}) => {
    const user = Meteor.user();
    const emailBody = `Dear Administrators, %0D%0A
    I completed the drafting of the following activity. Please review and proceed with activation. %0D%0A%0D%0A
    Title of the activity: ${activity.title['en-US']}. %0D%0A
    Activity ID: ${activity._id}. %0D%0A
    ---     Enter additional message here   ---. %0D%0A
    `;
    const subject = `${user.profile.username} has completed the draft of a new activity`;
    return (
        <StyledLink
            color={getColorByCategory(activity.category)}
            backcolor={'#ffffff'}
            href={`mailto:PROVIDEEMAIL@NOSERVER.COM?subject=${subject}&body=${emailBody}"`}>Ask to activate</StyledLink>
    )
}