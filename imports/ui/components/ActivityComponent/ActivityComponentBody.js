import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import styled from 'styled-components';
import getLocale from '../../../modules/get-locale';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import './ActivityComponentBody.scss';
import ActivityImagesComponent from './ActivityImagesComponent';
const ActivityText = styled.p`
    letter-spacing: .4px;

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
            <h5 className="activityHeader">
                <Icon 
                    icon={icon} 
                    size={'lg'} />
                <span className="ml-3">{i18n.__(activityField)}</span>
            </h5>
        )
    }
    render() {
        const { activity, locale, isMobile } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <div className="ActivityComponentBody">
                <Row>
                    <Col sm="6" style={this.setBackground(color)}>
                        <Row>
                            <Col xs="6">
                                {this.renderActivityField('address-card', 'activity.age')}
                            </Col>
                            <Col xs="6" className="pt-2">
                                <span>{i18n.__(`activity.${activity.age}`)}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                {this.renderActivityField('clock', 'activity.time')}
                            </Col>
                            <Col xs="6" className="pt-2">
                                <span>{i18n.__(`activity.${activity.time}`)}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                {this.renderActivityField('users', 'activity.group')}
                            </Col>
                            <Col xs="6" className="pt-2">
                                <span>{i18n.__(`activity.${activity.group}`)}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.renderActivityField('pause-circle', 'activity.preparations')}
                                <ActivityText>
                                    {activity.preparations[locale]}
                                </ActivityText>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" style={this.setBackground(color)}>
                        <Row>
                            <Col>
                                {this.renderActivityField('bullseye', 'activity.objectives')}
                                <ActivityText>
                                    {activity.objectives[locale]}
                                </ActivityText>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {this.renderActivityField('wrench', 'activity.tools')}
                                <ActivityText>
                                    {activity.tools[locale]}
                                </ActivityText>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                    {this.renderActivityField('align-left', 'activity.description')}
                        <ActivityText>
                            {activity.description[locale]}
                        </ActivityText>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col>
                            {this.renderActivityField('comments', 'activity.comments')}
                                Here comes the comments box
                            {this.renderActivityField('comment-dots', 'activity.writecomment')}                                
                                Here comes the write comment field.
                                With text counter and send button
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Icon icon={'images'} size={'lg'} />
                            </Col>
                            {activity.images.map(image => 
                                <ActivityImagesComponent 
                                key={image}    
                                url={image} 
                                isMobile={isMobile}/>
                            )}
                        </Row>    
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.renderActivityField('book-open', 'activity.resources')}
                        <ActivityText>
                            {activity.resources[locale]}
                        </ActivityText>
                    </Col>
                </Row>
            </div>
        )
    }
}

ActivityComponentBody.defaultProps = {
    
  };
  
  ActivityComponentBody.propTypes = {
    activity: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
};


export default ActivityComponentBody;