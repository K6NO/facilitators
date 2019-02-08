import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Activities from '../../../api/Activities/Activities';

class EditorSingleActivityWrapper extends React.Component{
  constructor(props){
    super(props);
  }
 
  render (){
    const {activity, language, loading} = this.props;
    return (! loading ? (
      <div className="EditorSingleActivityWrapper">
        <EditorSingleActivityComponent
            activity={activity}
            language={language}
        />
      </div>
    ) : '');
  }
}

EditorSingleActivityWrapper.defaultProps = {
};

EditorSingleActivityWrapper.propTypes = {
  activity: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
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