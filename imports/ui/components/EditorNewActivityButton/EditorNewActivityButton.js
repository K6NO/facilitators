import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import './EditorNewActivityButton.scss';
import newActivity from './mockNewActivity.json';

class EditorNewActivityButton extends React.Component{
  constructor(props){
    super(props);
  }
 
  createActivity = () => {
    const { language, editCallback } = this.props;
    newActivity['languages'] = [language];
    Meteor.call('activities.insert', newActivity, (error, activityId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else { 
        Bert.alert('New activity created', 'success');
        editCallback(activityId);
      }
    });
    //TODO - direct user to single activity editor component with a callback to EditorPage
  }
  render () {
    return ( 
      <div className="EditorPage">
          <Row>
            <Col>
              <button
                onClick={this.createActivity}>Add new activity</button>
            </Col>
          </Row>
      </div>
    );
  }
}

EditorNewActivityButton.propTypes = {
  editCallback: PropTypes.func.isRequired,
};

export default EditorNewActivityButton;