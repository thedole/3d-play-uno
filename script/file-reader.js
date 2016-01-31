module.exports = (function(){
  return function(file, callback){
    if (file) {
      var r = new FileReader();

      r.addEventListener('load', function(e) {
        var contents = e.target.result.match(/^.*$/gm);
        callback(contents);
      }, false);

      r.readAsText(file);
    } else {
      var error = {message: 'File is missing'};
      if(callback && typeof callback === 'function'){
        callback(null, error);
      }
      else
      {
        throw error;
      }
    }
  }
})();
