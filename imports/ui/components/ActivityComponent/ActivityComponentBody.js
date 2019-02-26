import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import ActivityImagesComponent from './ActivityImagesComponent';
import CommentsComponent from '../CommentsComponent/CommentsComponent';

const StyledRow = styled(Row)`
    box-shadow: 0 3px 1px -2px #ddd;
`;
class ActivityComponentBody extends React.Component {
    constructor(props){
      super(props);
    }

    setBackground = (color) => {
        const opaqueColor = `${color}22`
        return {
            background : opaqueColor
        }
    }

    renderActivityField = (icon, activityField) => {
        return (
            <h5>
                <Icon 
                    icon={icon} 
                    size={'lg'} />
                <span className="ml-3">{i18n.__(activityField)}</span>
            </h5>
        )
    }
    render() {
        const { activity, locale, isMobile, userId } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <div className="ActivityComponentBody">
                <StyledRow>
                    <Col sm="6" style={this.setBackground(color)}>
                        <Row>
                            <Col xs="6" lg="5">
                                {this.renderActivityField('address-card', 'activity.age')}
                            </Col>
                            <Col xs="6" lg="7" className="pt-2">
                                <p>{i18n.__(`activity.${activity.age}`)}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                {this.renderActivityField('clock', 'activity.time')}
                            </Col>
                            <Col xs="6" className="pt-2">
                                <p>{i18n.__(`activity.${activity.time}`)}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                {this.renderActivityField('users', 'activity.group')}
                            </Col>
                            <Col xs="6" className="pt-2">
                                <p>{i18n.__(`activity.${activity.group}`)}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.renderActivityField('pause-circle', 'activity.preparations')}
                                <p>
                                    {activity.preparations[locale]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" style={this.setBackground(color)}>
                        <Row>
                            <Col>
                                {this.renderActivityField('bullseye', 'activity.objectives')}
                                <p>
                                    {activity.objectives[locale]}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {this.renderActivityField('wrench', 'activity.tools')}
                                <p>
                                    {activity.tools[locale]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col sm="6" className="pt-3">
                    {this.renderActivityField('align-left', 'activity.description')}
                        <p>
                            {activity.description[locale]}
                        </p>
                    </Col>
                    <Col sm="6" className="pt-3">
                        <CommentsComponent 
                            activity={activity} 
                            isMobile={isMobile}
                            userId={userId}/>
                        <Row>
                            <Col sm={12} className="pt-3">
                                {this.renderActivityField('images', 'activity.images')}
            
                            </Col>
                            {activity.images.map(image => 
                                <ActivityImagesComponent 
                                key={image}    
                                url={image} 
                                isMobile={isMobile}/>
                            )}
                        </Row>    
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col className="pt-3">
                    {this.renderActivityField('book-open', 'activity.resources')}
                        <p>
                            {activity.resources[locale]}
                        </p>
                    </Col>
                </StyledRow>
            </div>
        )
    }
}

ActivityComponentBody.defaultProps = {
    
  };
  
  ActivityComponentBody.propTypes = {
    activity: PropTypes.object.isRequired,
    userId: PropTypes.string,
    locale: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
};


export default ActivityComponentBody;