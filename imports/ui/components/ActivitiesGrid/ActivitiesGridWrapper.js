import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Activities from '../../../api/Activities/Activities';
import ActivitiesGrid from './ActivitiesGrid';
import Loading from '../Loading/Loading';
import _ from 'lodash';


class ActivitiesGridWrapper extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        const { activities, loading } = this.props;
        console.log('wrapper', {activities})
        return (!loading ? 
            <ActivitiesGrid
                activities={activities} />
            : <Loading/>
        )
    }
}

ActivitiesGridWrapper.defaultProps = {
  };
  
ActivitiesGridWrapper.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    filterObject: PropTypes.object.isRequired,
    pageSize : PropTypes.number.isRequired,
    pageNum : PropTypes.number.isRequired,
    pageNumberCallback: PropTypes.func.isRequired
};


export default withTracker(({filterObject, pageSize, pageNum}) => {
    let activitySub;
    let activities = [];
    // remove the keys with empty values --> []
    Object.keys(filterObject).map(key => filterObject[key].length < 1 && delete filterObject[key]);
        
    if(!_.isEmpty(filterObject)) {
        // if there are filter values qquery with those, use pagination
        activitySub = Meteor.subscribe('activities.allFilter', filterObject, pageNum, pageSize);
        activities = Activities.find().fetch();
    } else {
        // filter is empty, use pagination
        activitySub = Meteor.subscribe('activities.all', pageNum, pageSize);
        activities = Activities.find().fetch();
    }
    return {
        loading: !activitySub.ready(),
        activities
    };
})(ActivitiesGridWrapper);
