import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import { AWS } from 'meteor/peerlibrary:aws-sdk';
import { check } from 'meteor/check';

const amazonS3Bucket = "facilitators-images-dev"; 

Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 10 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.AWS.AccessKeyId,
  AWSSecretAccessKey: Meteor.settings.private.AWS.SecretAccessKey,
  bucket: amazonS3Bucket,
  acl: "public-read",
  region: "eu-west-1",
  authorize: function () {
    return Roles.userIsInRole(this.userId, ['admin', 'editor']) ? true : false;
  },
  key: function ( file, metacontext ) {
    return metacontext.mobile 
      ? `activityImages/mobile/${metacontext.name}/${metacontext.type}`
      : `activityImages/original/${metacontext.name}/${metacontext.type}`;
  },
});

Meteor.methods({
  'aws.deleteFileFromAmazon' : function deleteFileFromAmazon(url) {
    check(url, String);

    Meteor.settings.private.AWS 
    ? (AWS.config.update({
      accessKeyId: Meteor.settings.private.AWS.AccessKeyId,
      secretAccessKey: Meteor.settings.private.AWS.SecretAccessKey,
      region: "eu-west-1",
    })) 
    : Bert.alert("No AWS in Meteor.settings, could not delete file.", "danger" );
    const s3 = new AWS.S3();
    var params = {
      Bucket: amazonS3Bucket,
      Key: `${url.split(".com/")[1]}`,
    };
    s3.deleteObject(params, function(err, data) {
      if (err) {
        console.error('Error when deleting AWS object - aws.js/deleteFileFromAmazon', err); // an error occurred
        throw new Meteor.Error('Error when deleting AWS object - aws.js/deleteFileFromAmazon ', err.reason);
      } else {
        console.log('Object deleted from AWS S3', data);
        return;
      }
    });
}});
