function postMessage(text) {
	var chan_num = window.localStorage['chan_num'];
    var url = "http://tatertots.herokuapp.com/channels"+chan_num+"messages";
    var now = new Date;
	var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 
						now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), 
						now.getUTCSeconds(), now.getUTCMilliseconds());
    var message = {'nick': window.localStorage['nick'], 'text': text, 'timestamp': utc_timestamp};

    $.ajax({ 
            url: url,
            data: message,
            success: function(data){
            	displayMessage(message = [{"message": message}])
            },
            error: function(xhr, textStatus, errorThrown){
                displayError(error);
            }
        })
}


function displayError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
}
   

function displayMessages(messages){
	if(messages!=null){
		console.log(messages)
			
			Handlebars.registerHelper('thumbnail', function(icon) {
				return icon.prefix + '64' + icon.name;
			});

	        var source = $("#ChatView").html(); 
	        var template = Handlebars.compile(source);

	        $('body').append(template(messages));
	    }
	    else{
	        alert('data null')
	    }
}

function pollMessages(){

	setInterval ( function() {
    	$.ajax({ 
            url: "http://tatertots.herokuapp.com/channels/2/messages?ts=2014-02-20%2015:45:47.283633",
            success: function(data){
            	var data = data;//["messages"];
            	displayMessages(data);
            },
            error: function(xhr, textStatus, errorThrown){
                displayError(error);
            }
        })}, 400 );
	//setTimeout ( function(){}, 300 );

}
