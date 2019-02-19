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
  const pageNum = 0;
  const pageSize = 200;
  const activitiesSub = Meteor.subscribe('activities.all', pageNum, pageSize);
  const activities = activitiesSub.ready() ? Activities.find().fetch() : [];

  return {
    loading: ! activitiesSub.ready(),
    activities
  };
})(EditorListActivitiesWrapper);
