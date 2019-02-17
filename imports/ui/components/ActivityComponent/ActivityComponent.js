import React from 'react';
import PropTypes from 'prop-types';
import ActivityComponentHeader from './ActivityComponentHeader';
import ActivityComponentBody from './ActivityComponentBody';
import ActivityComponentFooter from './ActivityComponentFooter';
import './ActivityComponent.scss';
import getLocale from '../../../modules/get-locale';


class ActivityComponent extends React.Component {
    constructor(props){
      super(props);
      
    }

    render() {
        // const { activity } = this.props;
        const locale = getLocale();
        return (
            <div className="ActivityComponent">
                <ActivityComponentHeader 
                    activity={activity}
                    locale={locale}
                />
                <ActivityComponentBody 
                    activity={activity}
                    locale={locale}
                />
                <ActivityComponentFooter
                    activity={activity}
                    locale={locale}
                />
            </div>
        )
    }
}

ActivityComponent.defaultProps = {
    
};
  
ActivityComponent.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityComponent;
