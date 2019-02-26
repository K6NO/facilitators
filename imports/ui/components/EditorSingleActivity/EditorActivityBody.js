import React from 'react';
import PropTypes from 'prop-types';
import { getColorByCategory } from '../../../modules/get-colors';
import { Row, Col } from 'reactstrap';
import EditorAgeComponent from '../EditorAgeComponent/EditorAgeComponent';
import EditorTimeComponent from '../EditorTimeComponent/EditorTimeComponent';
import EditorGroupComponent from '../EditorGroupComponent/EditorGroupComponent';
import EditorPreparationsComponent from '../EditorPreparationsComponent/EditorPreparationsComponent';
import EditorObjectivesComponent from '../EditorObjectivesComponent/EditorObjectivesComponent';
import EditorToolsComponent from '../EditorToolsComponent/EditorToolsComponent';
import EditorDescriptionComponent from '../EditorDescriptionComponent/EditorDescriptionComponent';
import EditorResourcesComponent from '../EditorResourcesComponent/EditorResourcesComponent';
import EditorImagesComponent from '../EditorImagesComponent/EditorImagesComponent';
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
                        <EditorAgeComponent activity={activity} language={language} />
                        <EditorTimeComponent activity={activity} language={language} />
                        <EditorGroupComponent activity={activity} language={language} />
                        <EditorPreparationsComponent activity={activity} language={language} />
                    </Col>
                    <Col sm="6" style={this.setBackground(color)}>
                        <EditorObjectivesComponent activity={activity} language={language} />
                        <EditorToolsComponent activity={activity} language={language} />
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <EditorDescriptionComponent activity={activity} language={language} />
                    </Col>
                    <Col sm="6">
                        <EditorImagesComponent activity={activity} language={language} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EditorResourcesComponent activity={activity} language={language} />
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