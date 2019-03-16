import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import renderActivityBodyField from '../EditorSingleActivity/renderActivityBodyField';
import ImageUploader from '../ImageUploader/ImageUploader';


class EditorImagesComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        
      }
    }

    render() {
        // limit 
        const { activity } = this.props;
        return (
            <Row className="EditorImagesComponent">
                <Col sm="12">
                    {renderActivityBodyField('images', 'activity.images')}
                </Col>
                <Col sm="12">
                    <Row>
                        {activity.images.length < 5 
                            ? <Col sm="6">
                                <ImageUploader activity={activity} />
                            </Col>
                            : ''}
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
};
export default EditorImagesComponent;

