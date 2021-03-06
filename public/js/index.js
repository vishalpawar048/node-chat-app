 var socket = io();

    socket.on('connect', function()  {
      console.log('Connected to server');
    });

    socket.on('disconnect',function ()  {
      console.log('Disconnected from server');
    });


    socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();

        var messageTextBox=jQuery('[name=message]');
        
        socket.emit('createMessage',{
            from:'user',
            text:messageTextBox.val()

        },function(){
            messageTextBox.val('')

        })
    })

   
    var locationButton=jQuery('#send-location');
    locationButton.on('click',function(){

        if(!navigator.geolocation){
            return alert("Your brouser does not support geolocation");
        }
        locationButton.attr('disabled','disabled').text('Sending Location..');
        navigator.geolocation.getCurrentPosition(function(position){

         locationButton.removeAttr('disabled').text('Send Location');
           socket.emit('createLocation',{
               longitude: position.coords.longitude,
               latitude: position.coords.latitude
           
            },function(){
                locationButton.attr('disabled','disabled');
            alert("Unable to fetch the location");
        })
        
        })
    })