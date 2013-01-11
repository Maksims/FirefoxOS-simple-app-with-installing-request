$(function() {
  if (navigator.mozApps) {

    appSelf = navigator.mozApps.getSelf()
    appSelf.onsuccess = function() {
      if (!appSelf.result) {
        var install = $('<div id="install">Install</div>');
        var status = $('<div id="status"></div>');
        $('#mozApp').append(install);
        $('#mozApp').append(status);

        $('#install').click(function() {
          var path = document.URL.split( '/' ).slice( 0, -1 ).join( '/' );
          var request = navigator.mozApps.install(path + "/manifest.webapp");
          request.onsuccess = function() {
            $('#status').html('app installed').css('display', 'block');
            location.reload(true);
          }
          request.onerror = function(e) {
            $('#status').html('app install failed: ' + this.error.name).css('display', 'block');
          }
        });
      }
    }
  }

  var requested = false;
  $('#request').click(function() {
    if (!requested) {
      requested = true;
      $.ajax({
        url: "http://moka.co/fos",
        dataType: 'json',
        success: function (data) {
          requested = false;
          $('#request').html('Server response: ' + data.message + ', and it has been clicked ' + data.counter + ' times.');
        }
      });
    }
  });
});