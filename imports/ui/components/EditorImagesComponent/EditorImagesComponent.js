import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';


class EditorImagesComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        
      }
    }


    render() {
        const { activity, language } = this.props;
        return (
            <Row className="EditorImagesComponent">
                <Col
                    onClick={()=> this.setState({editing: true})}>
                    {renderActivityBodyField('images', 'activity.images')}
                    Here comes the images box
                </Col>
            </Row>
        )
    }
}
  
EditorImagesComponent.propTypes = {
    activity: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
export default EditorImagesComponent;

