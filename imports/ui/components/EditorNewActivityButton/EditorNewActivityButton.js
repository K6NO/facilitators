import React from 'react';
import { Row, Col } from 'reactstrap';
import './EditorNewActivityButton.scss';
import newActivity from './mockNewActivity.json';

class EditorNewActivityButton extends React.Component{
  constructor(props){
    super(props);
  }
 
  createActivity = () => {
    const { language } = this.props;
    
  }
  render () {
    return ( 
      <div className="EditorPage">
          <Row>
            <Col>
              <button>Add new activity</button>
            </Col>
          </Row>
      </div>
    );
  }
}

export default EditorNewActivityButton;