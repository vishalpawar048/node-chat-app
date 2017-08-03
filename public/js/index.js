 var socket = io();

    socket.on('connect', function()  {
      console.log('Connected to server');
    });

    socket.on('disconnect',function ()  {
      console.log('Disconnected from server');
    });


    socket.on('newMessage',function(message){
        console.log('message',message);
        var li=jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        jQuery('#messages').append(li);
    });

     socket.on('newLocationMessage',function(message){
        var li=jQuery('<li></li>');
        var a=jQuery('<a target="_blank">My Location</a>');
        li.text(`${message.from}:`);
        a.attr('href',message.url);
        li.append(a);
        jQuery('#messages').append(li);
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