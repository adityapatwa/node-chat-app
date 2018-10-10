let socket = io();
socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
    console.log('Got a new message:');
    console.log(message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);
});

jQuery('#message-form').on('submit', function(e) {
   e.preventDefault();
    socket.emit('createMessage', {
        from: 'Joey',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});