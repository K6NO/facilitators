import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Activities from '../../../api/Activities';
import getLocale from '../../../modules/get-locale';
import ActivityComponent from './ActivityComponent';
import Loading from '../Loading/Loading';


class ActivityComponentContainer extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { activity, loading } = this.props;
        return (loading ? 
            <ActivityComponent
                activity={activity} />
            : <Loading/>
        )
    }
}

ActivityComponentContainer.defaultProps = {
  };
  
ActivityComponentContainer.propTypes = {
    activityId: PropTypes.string.isRequired,
    activity: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};


export default withTracker((activityId) => {
    const locale = getLocale();
    const activitySub = Meteor.subscribe('activities.viewByLang', activityId, locale);
    return {
        loading: !activitySub.ready(),
        activity: Activities.findOne(activityId),
    };
})(ActivityComponentContainer);
