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
};


export default withTracker(({filterObject}) => {
    console.log('is filter object empty? ', _.isEmpty(filterObject), {filterObject});
    let activitySub;
    let activities = [];
    Object.keys(filterObject).map(key => filterObject[key].length < 1 && delete filterObject[key]);
    console.log({filterObject});
    
    if(!_.isEmpty(filterObject)) {
        // const mongoFilterArray = Object.entries(filterObject).map(([key, values]) => (
        //     { [key] : {$in : values} }
        // ));
        activitySub = Meteor.subscribe('activities.allFilter', filterObject);
        activities = Activities.find().fetch();
    } else {
        activitySub = Meteor.subscribe('activities.all');
        activities = Activities.find().fetch();
    }
    console.log('is activity sub ready? ', activitySub.ready(), {activities})
    return {
        loading: !activitySub.ready(),
        activities
    };
})(ActivitiesGridWrapper);
