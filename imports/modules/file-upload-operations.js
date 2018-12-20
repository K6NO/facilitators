import { Slingshot } from 'meteor/edgee:slingshot';

export const checkFileDimensions = (file, maxWidth, maxHeight, whenReady) => {
    let img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = function () {
        let newDimensions = [img.naturalWidth, img.naturalHeight];
        if (img.naturalWidth > img.naturalHeight) {
          if (img.naturalWidth > maxWidth) {
            const scale = maxWidth / img.naturalWidth;
            newDimensions = [maxWidth, img.naturalHeight * scale];
          }
          if(whenReady) whenReady(newDimensions[0], newDimensions[1]);
        } else {
          if(img.naturalHeight > maxHeight) {
            const scale = maxHeight / img.naturalHeight;
            newDimensions = [img.naturalWidth * scale, maxHeight];
          }
          if(whenReady) whenReady(newDimensions[0], newDimensions[1]);
        } 
      }
  };

  export const renameFile = (file) => {
    // add '-'
    const date = (new Date()).toISOString().replace(/:/g, '-').replace(/\./g, '-');
    // create random name with date and random id
    const name = `${date}-${Random.id()}`;
    // cut image/ to get .jpeg .jpg .gif, etc.
    const type = file.type.replace('image/', '');
    return {name: name, type: type};
  }

  // receives file and metacontext object with name and type
  export const uploadStoryImageToAmazon = (file, metacontext, callback) => {
    const isMobile = metacontext.mobile;
    const isDesktop = metacontext.desktop;
    const uploader = new Slingshot.Upload( "uploadStoryImage", metacontext );
    uploader.send( file, ( error, url ) => {
      if ( error ) {
        console.error('error', error.message);
        Bert.alert( error.message, "warning" );
      } else {
        Meteor.call( "images.storeUrlInDatabase", url, file.name, isMobile, isDesktop, ( error, imageId ) => {
          if ( error ) {
            Bert.alert( error.reason, "warning" );
            // delete uploaded file if DB insert fails for any reason
            Meteor.call('aws.deleteFileFromAmazon', url, (error) => {
              if (error) {
                console.error('error when Meteor.call ws.deleteFileFromAmazon');
              }
              Bert.alert('File deleted from S3', 'success');
            });
          } else {
            Bert.alert( "File uploaded to Amazon S3!", "success" );
            callback();
          }
        });
      }
    });
  }

  export const uploadProfileImageToAmazon = (file, metacontext, callback) => {
    const uploader = new Slingshot.Upload( "uploadProfileImage", metacontext );
    const isMobile = metacontext.mobile;
    const isDesktop = false;
    uploader.send( file, ( error, url ) => {
      if ( error ) {
        Bert.alert( error.message, "warning" );
      } else {
        Meteor.call( "images.storeUrlInDatabase", url, file.name, isMobile, isDesktop, ( error, imageId ) => {
          if ( error ) {
            Bert.alert( error.reason, "warning" );
            // delete uploaded file if DB insert fails for any reason
            Meteor.call('aws.deleteFileFromAmazon', url, file.name, (error) => {
              if (error) {
                console.error('error when Meteor.call ws.deleteFileFromAmazon');
              }
              Bert.alert('File deleted from S3', 'success');
            });
          } else {
            Bert.alert( "File uploaded to Amazon S3!", "success" );
            // return url to parent form
            callback && callback(url);
          }
        });
      }
    });
  }