import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';


import Loading from '../Loading/Loading';
import Images from '../../../api/Files/Images';
import Tags from './Tags';

import './ImageGrid.scss';

class ImageGrid extends React.Component {
  constructor(props){
    super(props);
  }

  deleteImage(image){
    const urlOriginalSize = image.url;
    const urlMobileSize = image.urlMobile;
    const urlDesktopSize = image.urlDesktop;

    //remove all versions
    Meteor.call('images.removeAdmin', image, (error, result) => {
      if(error){
        Bert.alert(error.reason, 'danger');
      } else {
        if (image.url.indexOf('amazonaws')) { 
          image.url && Meteor.call('aws.deleteFileFromAmazon', urlOriginalSize, (err) => {
            if(err) {
              Bert.alert(err.reason, 'danger');  
            } else {
              Bert.alert('Original size removed', 'success');
            }
          });
          image.urlMobile && Meteor.call('aws.deleteFileFromAmazon', urlMobileSize, (err) => {
            if(err) {
              Bert.alert(err.reason, 'danger');  
            } else {
              Bert.alert('Mobile size removed', 'success');
            }
          });
          image.urlDesktop && Meteor.call('aws.deleteFileFromAmazon', urlDesktopSize, (err) => {
            if(err) {
              Bert.alert(err.reason, 'danger');  
            } else {
              Bert.alert('Desktop size removed', 'success');
            }
          });
        }    
      }
    });
    
  }

  switchPublic(image) {
    Meteor.call('images.switchPublic', image, (error, imageId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Public state changed', 'success');
      }
    })
  }

  render(){
    const { selectImage, loading, images } = this.props;
    return ( !loading ? (
      <div className="ImageGrid">
        {images.map((image, index) => (
          index % 6 === 0 ? (
            <Row key={index}>
              {images.slice(index, index+6).map((image) => (
                <Col xs={2} key={image._id}>
                  <div className="imageContainer">
                    <img src={image.urlMobile} onClick={() => selectImage(image.urlMobile)} />
                    <Button
                      color="danger"
                      size="small"
                      className="deleteButton"
                      onClick={(e)=> this.deleteImage(image)}
                      > X </Button>
                      <Button
                      color={image.public ? "primary" : "secondary"}
                      size="small"
                      className="switchButton"
                      onClick={(e)=> this.switchPublic(image)}
                      > P </Button>
                  </div>
                  <Tags image={image} />
                </Col>
              ))}
            </Row>
          ) : ''
        ))}
      </div>
      ) : <Loading />
    );
  }
};

ImageGrid.propTypes = {
  loading: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectImage: PropTypes.func,
};

ImageGrid.defaultProps = {
  images: [],
};

export default withTracker(({selectImage, nameFlag, imageFilter}) => {
  let imgSub;
  let images;
  if (imageFilter) {
    imgSub = Meteor.subscribe('images.filterByTag', imageFilter);
    images = Images.find({tags: {$regex : imageFilter}}).fetch();
  } else {
    imgSub = Meteor.subscribe('images.allMobile');
    images = Images.find().fetch();
  }

    return {
        loading: !imgSub.ready(),
        images,
        selectImage,
    }
})(ImageGrid);
