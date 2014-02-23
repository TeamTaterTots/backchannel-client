function getLocation() {
    if ("geolocation" in navigator) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.getCurrentPosition(
            getPlacesNearby,
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

function getPlacesNearby(data) {
    var latitude = data.coords.latitude;
    var longitude = data.coords.longitude;
    var url = "http://tatertots.herokuapp.com/places?latitude="+latitude+"&longitude="+longitude;
    $.ajax({ 
            url: url,
            success: function(data){        
                displayPlaces(data);
            },
            error: function(xhr, textStatus, errorThrown){
                displayError(error);
            }
    });
}

function displayPlaces(data){
    if(data!=null){
        data = { places: data };

        var source = $("#places-template").html(); 
        var template = Handlebars.compile(source);

        $('body').append(template(data));
    }
    else{
        alert('data null')
    }


}
