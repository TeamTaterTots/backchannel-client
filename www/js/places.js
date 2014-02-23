function getLocation() {
    if ("geolocation" in navigator) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.getCurrentPosition(
            getVenuesNearby,
            displayError, {
                enableHighAccuracy: true,
                timeout: timeoutVal,
                maximumAge: 0
            }
        );
    } else {
        alert("Geolocation is not supported by this browser");
    }
}

function displayError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
}
function getVenuesNearby(latitude, longitude) {
    $.ajax({ 
           type: "GET",
           data: JSON.stringify({ 'latitude': latitude, 'longitude':longitude }),
           url: "http://tatertots.herokuapp.com/places",
           contentType: "application/json; charset=utf-8",
           success: function(data){        
             alert(data);
            }
            });
}
