import React from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import './ImageUploader.scss';
import { checkFileDimensions, renameFile, uploadStoryImageToAmazon } from '../../../modules/file-upload-operations';
import { Resizer } from 'meteor/thinksoftware:image-resize-client';


class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {placeholderText: ''}
  }

  /* Upload and save original size, then mobile
  1. modules/file-upload-operations --> rename file (upload date + random nr)
  2. modules/file-upload-operations --> uploadImageToAmazon
  3. aws.js --> uploadToAmazonS3 --> uploader.send
  4. modules/file-upload-operations --> store img url on Activities schema
  */
  uploadFiles = (event) => {
    event.preventDefault();
    const { activity } = this.props;
    const files = event.target.files;
    const maxMobileWidth = 750;
    const maxMobileHeight = 440;

    // Take all images...
    Array.from(files).forEach(file => {
      // SET Metacontext will be: {name: String, type: String, activityId: String }
      let metacontext = renameFile(file);
      metacontext.activityId = activity._id;

      // UPLOAD original / desktop size
      uploadImageToAmazon(file, metacontext, () => {
        // GET mobile SIZE
        checkFileDimensions(file, maxMobileWidth, maxMobileHeight, 
          (w, h) => {
            // RESIZE for mobile - Upload and save mobile size in the callback
            Resizer.resize(file, {width: w, height: h, cropSquare: false}, (err, smallFile) => {
              if(err) { 
                Bert.alert(error.reason, 'danger');
                console.error(err); 
              }
              // SET Metacontext {mobile: Boolean}
              metacontext.mobile = true;
              uploadImageToAmazon(smallFile, metacontext, () => {
                Bert.alert('All images uploaded', 'success');
              }); // end mobile uploadImageToAmazon
            }); // end resize
          }); // end checkFileDimensions
      }); // end uploadImageToAmazon
    }); // end forEach
  }

  render() {
    return (
      <div className="ImageUploader">
        <p className="alert alert-info text-center">
          <span>Click or Drag a File Here to Upload</span>
          <input onChange={this.uploadFiles} type="file" multiple={true} />
        </p>
      </div>
    )
  }
}

export default ImageUploader;

EditorImagesComponent.propTypes = {
  activity: PropTypes.object.isRequired,
};