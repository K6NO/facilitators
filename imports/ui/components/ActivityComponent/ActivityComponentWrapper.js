import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Activities from '../../../api/Activities/Activities';
import ActivityComponent from './ActivityComponent';
import Loading from '../Loading/Loading';


class ActivityComponentWrapper extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { activity, loading, backCallback } = this.props;
        return (!loading ? 
            <ActivityComponent
                activity={activity}
                backCallback={backCallback} />
            : <Loading/>
        )
    }
}

ActivityComponentWrapper.defaultProps = {
  };
  
ActivityComponentWrapper.propTypes = {
    activityId: PropTypes.string.isRequired,
    activity: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    backCallback: PropTypes.func.isRequired
};


export default withTracker((activityId) => {
    const activitySub = Meteor.subscribe('activities.view', activityId.activityId);
    return {
        loading: !activitySub.ready(),
        activity: Activities.findOne(activityId.activityId),
    };
})(ActivityComponentWrapper);
