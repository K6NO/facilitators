import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import EditorNewActivityButton from '../EditorNewActivityButton/EditorNewActivityButton';
import './EditorListActivitiesComponent.scss';

class EditorListActivitiesComponent extends React.Component{
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
    const {activities} = this.props;
    return (
      <div className="EditorListActivitiesComponent">
      <Row>
          <Col>
            <EditorNewActivityButton />
          </Col>
      </Row>
        {activities.map(activity => 
            <Row>
                <Col sm="6">
                    {activity.title[`title.en-US`]}
                </Col>
                <Col sm="4">
                    {activity.languages.map(language => 
                        <span>{language}</span>
                    )}
                </Col>
                <Col sm="2">
                    <button>Edit</button>
                </Col>
            </Row>)
        }
      </div>
    );
  }
}

EditorListActivitiesComponent.defaultProps = {
};

EditorListActivitiesComponent.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default EditorListActivitiesComponent;
