function getLocation(successCallback, errorCallback) {
    if ("geolocation" in navigator) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback, {
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
    alert('Error: ' + error);
}

function queryPlaces(data, successCallback) {
    var latitude = data.coords.latitude;
    var longitude = data.coords.longitude;
    var url = "http://tatertots.herokuapp.com/places?latitude="+latitude+"&longitude="+longitude;
    return $.ajax({ 
            url: url,
            success: function(data) {
                successCallback();
            },
            error: function(xhr, textStatus, errorThrown){
                displayError(errorThrown);
            }
    });
}
