import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import { AWS } from 'meteor/peerlibrary:aws-sdk';
import { check } from 'meteor/check';
const amazonS3Bucket = "ng-images"; // ng-images for prod, ng-images-dev for dev

Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.AWS.AccessKeyId,
  AWSSecretAccessKey: Meteor.settings.private.AWS.SecretAccessKey,
  bucket: amazonS3Bucket,
  acl: "public-read",
  region: "eu-west-1",
  authorize: function () {
    return this.userId ? true : false;
  },
  key: function ( file ) {
    const user = Meteor.users.findOne( this.userId );
    return user.emails[0].address + "/" + file.name;
  },
});

Slingshot.fileRestrictions( "uploadStoryImage", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 10 * 1024 * 1024
});

Slingshot.createDirective( "uploadStoryImage", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.AWS.AccessKeyId,
  AWSSecretAccessKey: Meteor.settings.private.AWS.SecretAccessKey,
  bucket: amazonS3Bucket,
  acl: "public-read",
  region: "eu-west-1",
  authorize: function () {
    const user = Meteor.users.findOne(this.userId);
    return user.roles.includes('editor') || user.roles.includes('admin');
  },
  key: function ( file, metacontext ) {
    const isMobile = metacontext.mobile ? '/mobile' : false;
    const isDesktop = metacontext.desktop ? '/desktop' : false;
    const isOriginal = (!isMobile && !isDesktop) ? '/original' : false;
    return `storyImages${isOriginal ? isOriginal : ''}${isMobile ? isMobile : ''}${isDesktop ? isDesktop : ''}/${metacontext.name}.${metacontext.type}`;
  },
});

Slingshot.fileRestrictions( "uploadProfileImage", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 5 * 1024 * 1024
});

Slingshot.createDirective( "uploadProfileImage", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.AWS.AccessKeyId,
  AWSSecretAccessKey: Meteor.settings.private.AWS.SecretAccessKey,
  bucket: amazonS3Bucket,
  acl: "public-read",
  region: "eu-west-1",
  authorize: function () {
    return this.userId ? true : false;
  },
  key: function ( file, metacontext ) {
    const type = file.type.replace('image/', '');
    //clean extension from name, including jpeg/jpg
    let newName = file.name.replace('.jpg', '');
    newName = newName.replace(`.${type}`, '');

    // return different URIs for image sizes for MongoDB storage
    const isMobile = metacontext.mobile ? 'mobile/' : 'original/';
    return `profileImages/${this.userId}/${isMobile}${newName}.${type}`;
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
    : (Bert.alert( "No AWS on Meteor.settings, could not delete file.", "danger" ));
    const s3 = new AWS.S3();
    var params = {
      Bucket: amazonS3Bucket,
      Key: `${url.split(".com/")[1]}`,
    };
    s3.deleteObject(params, function(err, data) {
      if (err) {
        console.error('DeleteObject Error ', err); // an error occurred
        throw new Meteor.Error('aws.deleteFileFromAmazon', err.reason);
      } else {
        console.log('Object deleted from AWS S3', data);
        return;
      }
    });
}});
