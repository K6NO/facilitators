import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Activities from '../../../api/Activities/Activities';
import EditorListActivitiesComponent from './EditorListActivitiesComponent';

class EditorListActivitiesWrapper extends React.Component{
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
    const { loading, ...props } = this.props;
    return (! loading ? (
      <div className="EditorListActivitiesWrapper">
        <EditorListActivitiesComponent
            {...props}
        />
      </div>
    ) : '');
  }
}

EditorListActivitiesWrapper.defaultProps = {
    activities : [],
};

EditorListActivitiesWrapper.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object),
  language: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  editCallback: PropTypes.func.isRequired
};


export default withTracker(() => {
  const activitiesSub = Meteor.subscribe('activities.all');
  const activities = activitiesSub.ready() ? Activities.find().fetch() : [];

  return {
    loading: ! activitiesSub.ready(),
    activities
  };
})(EditorListActivitiesWrapper);
