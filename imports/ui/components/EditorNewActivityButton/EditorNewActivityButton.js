import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import './EditorNewActivityButton.scss';
import newActivity from './mockNewActivity.json';

class EditorNewActivityButton extends React.Component{
  constructor(props){
    super(props);
  }
 
  createActivity = () => {
    const { language } = this.props;
    newActivity['languages'] = [language];
    console.log(newActivity);
    Meteor.call('activities.insert', newActivity, (error) => {
      if(error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else { 
          Bert.alert('New activity created', 'success');
        }
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

export default EditorNewActivityButton;