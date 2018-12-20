import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import './ImageUploader.scss';
import { checkFileDimensions, renameFile, uploadStoryImageToAmazon } from '../../../modules/file-upload-operations';
import { Resizer } from 'meteor/thinksoftware:image-resize-client';


class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {placeholderText: ''}
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadFiles(event) {
    event.preventDefault();
    const files = event.target.files;
    const maxDesktopWidth = 1920;
    const maxDesktopHeight = 1080;
    const maxMobileWidth = 750;
    const maxMobileHeight = 440;

    // Take all images...
    Array.from(files).forEach(file => {
      let metacontext = renameFile(file);
      metacontext.mobile = false;
      metacontext.desktop = false;

      // Upload and save original size
      uploadStoryImageToAmazon(file, metacontext, () => {
        // Get mobile sizes
        checkFileDimensions(file, maxMobileWidth, maxMobileHeight, 
          (w, h) => {
            // Resize for mobile - Upload and save mobile size in the callback
            Resizer.resize(file, {width: w, height: h, cropSquare: false}, (err, smallFile) => {
              if(err) { 
                Bert.alert(error.reason, 'danger');
                console.error(err); 
              }
              // change metacontext passed to upload function to set mobile or desktop 
              metacontext.desktop = false;
              metacontext.mobile = true;
              uploadStoryImageToAmazon(smallFile, metacontext, () => {
                
                // Resize for desktop - Upload and save desktop size if the original was larger than 1920*1080
                if (maxDesktopWidth > 1920 || maxDesktopHeight > 1080) {
                  checkFileDimensions(file, maxDesktopWidth, maxDesktopHeight,
                    (w, h) => {
                    
                      Resizer.resize(file, {width: w, height: h, cropSquare: false}, (err, desktopFile) => {
                        if(err) { 
                          Bert.alert(error.reason, 'danger');
                          console.error(err);}
                        metacontext.mobile = false;
                        metacontext.desktop = true;
                        uploadStoryImageToAmazon(desktopFile, metacontext, () => {
                          Bert.alert('All images uploaded', 'success');
                        });
                      });
                    });
                
                    // If original is smaller than 1920*1080 don't resize, upload desktop size
                  } else {
                    metacontext.mobile = false;
                    metacontext.desktop = true;
                    uploadStoryImageToAmazon(file, metacontext, () => {
                      Bert.alert('All images uploaded', 'success');
                    });
                  }
                });
            });
          }
        );
      }); 
    });
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
