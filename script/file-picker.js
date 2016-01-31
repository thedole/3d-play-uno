"use strict";
module.exports = (function(){
  function createFilePickerHandler(elementId, callback, extensions){
    var inputElement = document.getElementById("fileselector");

    inputElement.addEventListener("change", (e) => {
      loadmodel(e, callback)
    }, false);

    function loadmodel(event, callback) {
      var  fileList = event.target.files,
           file,
           extension,
           model,
           reader;

      /* now you can work with the file list */
      if (!fileList || Object.prototype.toString.call(fileList) !== '[object FileList]'){
        return;
      }

      // May need to change this later for loading materials as well?
      if(fileList.length !== 1){
        return;
      }

      file = fileList[0];

      if (extensions) {
        extension = file.name.split('.').pop();
        let pattern = new RegExp(extension);
        if(!extensions.some(RegExp.prototype.test, pattern)){
          throw ('This file has an invalid file extension ".' + extension + '"');
        }
      };

      callback(file);
    }
  }

  return {
    create: createFilePickerHandler
  };
})();