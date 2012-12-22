// localhost:3000 Id
var clientId = '696625463505-9famicpkg8psvphlhdg7159cbre0ra3t.apps.googleusercontent.com';
// heroku Id
// var clientId = '696625463505.apps.googleusercontent.com';
var apiKey = 'AIzaSyCzYW7xXOgWTl2OZ_hYrox5jg0kYeggY9E';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    authorizeButton.style.visibility = 'hidden';
    //magic happens here
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

// the magic
function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.calendarList.list(
    );
          
    request.execute(function(resp) {
      for (var i = 0; i < resp.items.length; i++) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(resp.items[i].summary));
        document.getElementById('calendars').appendChild(li);
      }
    });
  });
}
