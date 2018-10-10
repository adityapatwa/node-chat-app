let socket = io();
socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm: A');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        from : message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    //
    // let li = jQuery('<li></li>');
    // li.text(`[${formattedTime}] ${message.from}: ${message.text}`);
    // jQuery("#messages").append(li);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm: A');

    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from : message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My Current Location</a>');
    //
    // li.text(`[${formattedTime}] ${message.from}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery("#messages").append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');
    if(messageTextBox.val().length > 0 ) {
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function () {
            messageTextBox.val('');
        });
    }
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    if (!("geolocation" in navigator)) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});