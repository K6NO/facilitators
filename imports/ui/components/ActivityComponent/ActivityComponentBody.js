import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import getLocale from '../../../modules/get-locale';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';

import './ActivityComponentBody.scss';

const T = i18n.createComponent();

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
        const { activity, locale } = this.props;
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
                                <p>
                                    {activity.preparations[`preparations.${locale}`]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" style={this.setBackground(color)}>
                        <Row>
                            <Col>
                                {this.renderActivityField('bullseye', 'activity.objectives')}
                                <p>
                                    {activity.objectives[`objectives.${locale}`]}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {this.renderActivityField('wrench', 'activity.tools')}
                                <p>
                                    {activity.tools[`tools.${locale}`]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                    {this.renderActivityField('align-left', 'activity.description')}
                        <p>
                            {activity.description[`description.${locale}`]}
                        </p>
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
                            <Col>
                                <Icon icon={'images'} size={'lg'} />
                                Here comes the images box
                            </Col>
                        </Row>    
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.renderActivityField('book-open', 'activity.resources')}
                        <p>
                            {activity.resources[`resources.${locale}`]}
                        </p>
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
};


export default ActivityComponentBody;