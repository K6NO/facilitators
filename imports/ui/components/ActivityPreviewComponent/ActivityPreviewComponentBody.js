import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Badge, Button } from 'reactstrap';

class ActivityPreviewComponentBody extends React.Component {
    constructor(props){
      super(props);
    }

    renderActivityField = (icon, activityField) => {
        return (
            <h5 className="activityHeader">
                <Icon 
                    icon={icon} 
                    size={'lg'} />
            </h5>
        )
    }
    renderTags = (activity, color) => {
        return activity.tags.map((tagIndex) =>   
            <Badge 
                pill
                key={tagIndex}
                className="tagPills"
                style={{background: color}}
                >
                {i18n.__(`tags.${tagIndex}`)}
            </Badge>
        );

    }
    render() {
        const { activity, selectActivityCallback } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <div className="ActivityPreviewComponentBody">
                <Row>
                    <Col xs="12">
                        <Row>
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('address-card', 'activity.age')}
                            </Col>
                            <Col xs="10" >
                                <span>{i18n.__(`activity.${activity.age}`)}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('clock', 'activity.time')}
                            </Col>
                            <Col xs="10" >
                                <span>{i18n.__(`activity.${activity.time}`)}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="2" className="pt-2">
                                {this.renderActivityField('users', 'activity.group')}
                            </Col>
                            <Col xs="10" >
                                <span>{i18n.__(`activity.${activity.group}`)}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="11">
                        {this.renderTags(activity, color)}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Button outline color="info"
                            onClick={()=> selectActivityCallback(activity._id)}>Description</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}

ActivityPreviewComponentBody.defaultProps = {
    
  };
  
  ActivityPreviewComponentBody.propTypes = {
    activity: PropTypes.object.isRequired,
};


export default ActivityPreviewComponentBody;