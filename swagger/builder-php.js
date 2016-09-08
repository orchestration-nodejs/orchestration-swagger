var fs = require('fs');
var fse = require('fs-extra');
var async = require('async');
var copyRecurse = require('orchestration-util-copy').copyRecurse;

function pack(generationPath, targetPath, sdkConfig, callback) {
  var packagePath = sdkConfig.packagePath || "SwaggerClient-php";

  fs.mkdir(targetPath, (err) => {
    if (err) {
      callback(err);
      return;
    }

    copyRecurse(
      generationPath + '/' + packagePath, 
      targetPath,
      (currentDir, targetDir, filename) => {
        if (filename == 'test' ||
            filename == '.travis.yml' ||
            filename == '.swagger-codegen-ignore' ||
            filename == 'git_push.sh') {
          return false;
        } else {
          return true;
        }
      }, callback);
  });
}

module.exports = {
  pack: pack
};