unction getVenuesNearby(place) {
    $.ajax({ 
            type: "GET",
            data: place,
            url: "http://www.tatertots.herokuapp.com/"+place,
            contentType: "application/json; charset=utf-8",
            success: function(data){        
            alert(data);
            },
            error: function(xhr, textStatus, errorThrown){
            alert('request failed');
            }
    });
}