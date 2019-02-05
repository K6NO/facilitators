import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import getLocale from '../../../modules/get-locale';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col, Table, FormGroup } from 'reactstrap';

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
    render() {
        const { activity } = this.props;
        console.log('body', {activity})
        const category = activity.category;
        const color = getColorByCategory(category);
        const locale = getLocale();
        return (
            <div className="ActivityComponentBody">
                <Row
                    style={this.setBackground(color)}>
                    <Col sm="6">
                        <Row>
                            <Col xs="6">
                                <h5>
                                    <Icon icon={'user-circle'} size={'lg'} />
                                    <T _locale={locale}>activity.age</T>
                                </h5>
                            </Col>
                            <Col xs="6">
                                {activity.age} <T _locale={locale}>activity.years</T>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <h5>
                                    <Icon icon={'time'} size={'lg'} />
                                    <T _locale={locale}>activity.time</T>
                                </h5>
                            </Col>
                            <Col xs="6">
                                {activity.time} <T _locale={locale}>activity.minutes</T>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <h5>
                                    <Icon icon={'child'} size={'lg'} />
                                    <Icon icon={'child'} size={'lg'} />
                                    <T _locale={locale}>activity.group</T>
                                </h5>
                            </Col>
                            <Col xs="6">
                                <T _locale={locale}>{activity.group}</T>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5>
                                    <Icon icon={'pause'} size={'lg'} />
                                    <T _locale={locale}>activity.preparations</T>
                                </h5>
                                <p>
                                    {activity.preparations[locale]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col>
                                <h5>
                                    <Icon icon={'target'} size={'lg'} />
                                    <T _locale={locale}>activity.objectives</T>
                                </h5>
                                <p>
                                    {activity.objectives[locale]}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5>
                                    <Icon icon={'wrench'} size={'lg'} />
                                    <T _locale={locale}>activity.tools</T>
                                </h5>
                                <p>
                                    {activity.tools[locale]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <h5>
                            <Icon icon={'play'} size={'lg'} />
                            <T _locale={locale}>activity.description</T>
                        </h5>
                        <p>
                            {activity.description[locale]}
                        </p>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col>
                                <h5>
                                    <Icon icon={'comments'} size={'lg'} />
                                    <T _locale={locale}>activity.comments</T>
                                </h5>
                                Here comes the comments box
                                <h5>
                                    <Icon icon={'commenting'} size={'lg'} />
                                    <T _locale={locale}>activity.writecomment</T>
                                </h5>
                                
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
                        <h5>
                            <Icon icon={'images'} size={'lg'} />
                            <T _locale={locale}>activity.resources</T>
                        </h5>
                        <p>
                            {activity.resources[locale]}
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
};


export default ActivityComponentBody;