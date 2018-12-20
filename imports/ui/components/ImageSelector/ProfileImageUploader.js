import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import { checkFileDimensions, renameFile, uploadProfileImageToAmazon } from '../../../modules/file-upload-operations';



import './ImageUploader.scss';

class ProfileImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadFiles(event) {
    event.preventDefault();
    const files = event.target.files;
    Array.from(files).forEach(file => {
      let metacontext = {};
      metacontext.mobile = false;
      const maxMobileWidth = 300;
      const maxMobileHeight = 300;
      uploadProfileImageToAmazon(file, metacontext);
      checkFileDimensions(file, maxMobileWidth, maxMobileHeight,
        (w, h) => {
          Resizer.resize(file, {width: w, height: h, cropSquare: true}, (err, smallFile) => {
            if(err) console.error(err);
            metacontext.mobile = true;
            uploadProfileImageToAmazon(smallFile, metacontext, this.props.callback);
          });
        });
    });
  }

  render() {
    return (
      <div className="ProfileImageUploader">
        <p className="alert alert-success text-center">
          <span>Click or Drag to Upload Profile Image</span>
          <input onChange={this.uploadFiles} type="file" />
        </p>
      </div>
    )
  }
}

ProfileImageUploader.defaultProps = {
  callback: (error) => {
    if (error) Bert.alert(error.message, 'danger');
  },
};

ProfileImageUploader.propTypes = {
  callback: PropTypes.func,
};

export default ProfileImageUploader;
