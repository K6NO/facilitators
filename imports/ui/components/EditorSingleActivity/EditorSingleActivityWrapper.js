import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';
import Activities from '../../../api/Activities/Activities';
import EditorSingleActivityComponent from './EditorSingleActivityComponent';

class EditorSingleActivityWrapper extends React.Component{
  constructor(props){
    super(props);
  }
 
  render (){
    const { loading, ...props} = this.props;
    return (! loading ? (
      <div className="EditorSingleActivityWrapper">
        <EditorSingleActivityComponent
            {...props}
        />
      </div>
    ) : <Loading />);
  }
}

EditorSingleActivityWrapper.defaultProps = {
};

EditorSingleActivityWrapper.propTypes = {
  activity: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,  
};


export default withTracker(({activityId}) => {
  // NOTE: Use destructuring, as ...props is passed to this component
  const activitySub = Meteor.subscribe('activities.view', activityId);
  const activity = activitySub.ready() ? Activities.findOne(activityId) : {};
  console.log('wtracker', activityId);

  return {
    loading: !activitySub.ready(),
    activity
  };
})(EditorSingleActivityWrapper);