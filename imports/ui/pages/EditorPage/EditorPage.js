import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Activities from '../../../api/Activities/Activities';
import './EditorPage.scss';

class EditorPage extends React.Component{
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
      <div className="EditorPage">
        Editor
          : ''}
      </div>
    ) : '');
  }
}

EditorPage.defaultProps = {
    activities : [],
};

EditorPage.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
};


export default withTracker(() => {
  const activitiesSub = Meteor.subscribe('activities.all');
  const activities = activitiesSub.ready() ? Activities.find().fetch() : [];

  return {
    loading: ! activitiesSub.ready(),
    activities
  };
})(EditorPage);
