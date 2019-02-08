import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Activities from '../../../api/Activities/Activities';
import EditorListActivitiesComponent from './EditorListActivitiesComponent';

class EditorSingleActivityWrapper extends React.Component{
  constructor(props){
    super(props);
  }
 
  /**
   * List activities with title, languages, arranged by category, with Edit buttons
   *    - sub to all activities (admins)
   * Add new activity button
   *    
   * Language selector tabs at top
   * Header below
   * Body below
   */
  render (){
    const {activities, loading} = this.props;
    return (! loading ? (
      <div className="EditorSingleActivityWrapper">
        <EditorSingleActivityComponent
            activities={activities}
        />
      </div>
    ) : '');
  }
}

EditorSingleActivityWrapper.defaultProps = {
};

EditorSingleActivityWrapper.propTypes = {
  activity: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};


export default withTracker((activityId) => {
  const activitySub = Meteor.subscribe('activities.view');
  const activity = activitySub.ready() ? Activities.findOne(activityId) : {};

  return {
    loading: ! activitySub.ready(),
    activity
  };
})(EditorSingleActivityWrapper);
