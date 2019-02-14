import React from 'react';
import i18n from 'meteor/universe:i18n';
import Icon from '../Icon/Icon';

export default renderActivityBodyField = (icon, activityField) => {
    return (
        <h5 className="activityHeader">
            <Icon 
                icon={icon} 
                size={'lg'} />
            <span className="ml-3">{i18n.__(activityField)}</span>
        </h5>
    )
}