import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import ImageUploader from '../ImageSelector/ImageUploader';


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
                <Col sm="12">
                    {renderActivityBodyField('images', 'activity.images')}
                </Col>
                <Col sm="12">
                    <Row>
                        <Col sm="6">
                            <ImageUploader activity={activity} />
                        </Col>
                        {activity.images.map(image => 
                            <Col 
                                sm="6"
                                key={image}
                                style={{
                                    backgroundImage: `url("${image}")`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    minHeight: '140px'
                                }}
                            >
                            </Col>
                            )}
                    </Row>
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

