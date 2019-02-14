import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { getColorByCategory } from '../../../modules/get-colors';
import Icon from '../Icon/Icon';
import { Row, Col } from 'reactstrap';
import EditorAgeComponent from '../EditorAgeComponent/EditorAgeComponent';
import EditorTimeComponent from '../EditorTimeComponent/EditorTimeComponent';
import EditorGroupComponent from '../EditorGroupComponent/EditorGroupComponent';
import renderActivityBodyField from './renderActivityBodyField';
import './EditorActivityBody.scss';


class EditorActivityBody extends React.Component {
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
        const { activity, language } = this.props;
        const category = activity.category;
        const color = getColorByCategory(category);
        return (
            <div className="EditorActivityBody">
                <Row>
                    <Col sm="6" style={this.setBackground(color)}>
                        <EditorAgeComponent activity={activity} />
                        <EditorTimeComponent activity={activity} />
                        <EditorGroupComponent activity={activity} />
                        <Row>
                            <Col>
                                {renderActivityBodyField('pause-circle', 'activity.preparations')}
                                <p>
                                    {activity.preparations[`preparations.${language}`]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" style={this.setBackground(color)}>
                        <Row>
                            <Col>
                                {renderActivityBodyField('bullseye', 'activity.objectives')}
                                <p>
                                    {activity.objectives[`objectives.${language}`]}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {renderActivityBodyField('wrench', 'activity.tools')}
                                <p>
                                    {activity.tools[`tools.${language}`]}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                    {renderActivityBodyField('align-left', 'activity.description')}
                        <p>
                            {activity.description[`description.${language}`]}
                        </p>
                    </Col>
                    <Col sm="6">
                        <Row>
                            <Col>
                            {renderActivityBodyField('comments', 'activity.comments')}
                                Here comes the comments box
                            {renderActivityBodyField('comment-dots', 'activity.writecomment')}                                
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
                    {renderActivityBodyField('book-open', 'activity.resources')}
                        <p>
                            {activity.resources[`resources.${language}`]}
                        </p>
                    </Col>
                </Row>
            </div>
        )
    }
}

EditorActivityBody.defaultProps = {
    
  };
  
  EditorActivityBody.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};


export default EditorActivityBody;