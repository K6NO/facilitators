import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
export default function uploadFileLocal (blob, name, path, encoding) {
    check(blob, Match.Any);
    check(name, String)
    check(path, String);
    check(encoding, String);

  //   const newName = cleanName(name || 'file');
    const chroot = Meteor.chroot || 'public';
    const newName = `${Random.id()}.${blob.type}`;
    
    const newPath = process.env.PWD + '/public/img/' + (path ? '/' + cleanPath(path) + '/' : '/');
    // TODO Add file existance checks, etc...
    if (Meteor.isServer) {

      import('fs').then(({default: fs}) => {
        fs.writeFile(newPath + newName, blob, encoding, function(exception) {
          if (exception) {
            handleMethodException(exception);
          } else {
              console.log('The file ' + newName + ' (' + encoding + ') was saved to ' + newPath);
          }
        });
      });
      const image = {
          public: true,
          url: `/img/${path}/${newName}`,
          tags: [],
          accessibleTo: ['admin', 'editor', 'user'],
      }
      try {
          return Images.insert({ owner: this.userId, ...image})
      } catch (exception) {
          handleMethodException(exception);
      }
    }

    // Clean up the path. Remove any initial and final '/' -we prefix them-,
    // any sort of attempt to go to the parent directory '..' and any empty directories in
    // between '/////' - which may happen after removing '..'
    function cleanPath(str) {
      if (str) {
        return str.replace(/\.\./g,'').replace(/\/+/g,'').
          replace(/^\/+/,'').replace(/\/+$/,'');
      }
    }
    function cleanName(str) {
      return str.replace(/\.\./g,'').replace(/\//g,'');
    }
  }