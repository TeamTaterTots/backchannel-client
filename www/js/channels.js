function getChannels() {
    var place_id = window.localStorage['place_id'];
    var url = "http://tatertots.herokuapp.com/places/"+place_id+"/channels";
    $.get(
            url: url,
            success: function(data){        
                displayChannels(data);
            },
            error: function(xhr, textStatus, errorThrown){
                displayError(error);
            }
    });
}

function displayChannels(data){
    if(data!=null){
        data = { channels: data };
		
		Handlebars.registerHelper('thumbnail', function(icon) {
			return icon.prefix + '64' + icon.name;
		});

        var source = $("#places-template").html(); 
        var template = Handlebars.compile(source);

        $('body').append(template(data));
        $(chan_num).click(function() {
                window.localStorage.setItem('chan_num', $(chan_num).children('div.id').text(), false);
            });
    }
    else{
        alert('data null')
    }


}
