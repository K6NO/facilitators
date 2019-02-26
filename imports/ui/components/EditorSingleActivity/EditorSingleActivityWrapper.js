import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Row, Col } from 'reactstrap';
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
        <Row>
          <Col md={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
            <EditorSingleActivityComponent
                  {...props}
              />
          </Col>
        </Row>
        
      </div>
    ) : <Loading />);
  }
}

EditorSingleActivityWrapper.defaultProps = {
};

EditorSingleActivityWrapper.propTypes = {
  activity: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};


export default withTracker(({activityId}) => {
  // NOTE: Use destructuring, as ...props is passed to this component
  const activitySub = Meteor.subscribe('activities.view', activityId);
  const activity = activitySub.ready() ? Activities.findOne(activityId) : {};

  return {
    loading: !activitySub.ready(),
    activity
  };
})(EditorSingleActivityWrapper);