import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import ActivityPreviewComponent from '../ActivityPreviewComponent/ActivityPreviewComponent';
import getLocale from '../../../modules/get-locale';

class ActivitiesGrid extends React.Component {
    constructor(props){
      super(props);
      
    }

    renderActivities = (activities, language) => activities.map(activity => (
        <Col xs={12} sm={6} md={4}
            key={activity._id}
            className="p-0">
            <ActivityPreviewComponent activity={activity} />
        </Col>

    ))

    render() {
        const language = getLocale();
        return (
            <div className="ActivitiesGrid">
                <Row>
                    {this.renderActivities(this.props.activities, language)}
                </Row>
            </div>
        )
    }
}

ActivitiesGrid.defaultProps = {
    
};
  
ActivitiesGrid.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default ActivitiesGrid;
