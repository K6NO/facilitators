import React from 'react';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const StyledHeader = styled.h5`
    font-weight: bold;
    text-transform: uppercase;
`;
export default renderActivityBodyField = (icon, activityField) => {
    return (
        <StyledHeader className="activityHeader">
            <Icon 
                icon={icon} 
                size={'lg'} />
            <span className="ml-3">{i18n.__(activityField)}</span>
        </StyledHeader>
    )
}