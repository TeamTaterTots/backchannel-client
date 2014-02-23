function getLocation() {
    if ("geolocation" in navigator) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.getCurrentPosition(
            displayPosition,
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

function displayPosition(position) {
    alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
    getVenuesNearby(position.coords.latitude, position.coords.longitude);
}

function displayError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
}
function getVenuesNearby(latitude, longitude) {
    request = $.ajax({
        url: "tatertots.herokuapp.com/places",
        type: "get",
        data: position
    });

    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // log a message to the console
        console.log("Hooray, it worked!");
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        console.error(
            "The following error occured: "+
            textStatus, errorThrown
        );
    });
}
