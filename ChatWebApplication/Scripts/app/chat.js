$(function () {

    $('#chatBody').hide();
    $('#join').show();
    
    var chat = $.connection.chatHub;
    
    chat.client.addMessage = function (name, message) {
        $('#chatroom').append('<p><b>' + htmlEncode(name)
            + '</b>: ' + htmlEncode(message) + '</p>');
    };

    chat.client.onConnected = function (id, userName, allUsers) {

        $('#loginBlock').hide();
        $('#chatBody').show();
        $('#Id').val(id);
        $('#Name').val(userName);
        $('#header').html('<h3>Welcome, ' + userName + '</h3>');

        for (i = 0; i < allUsers.length; i++) {

            AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
        }
    };

    chat.client.onNewUserConnected = function (id, name) {

        AddUser(id, name);
    };

    chat.client.onUserDisconnected = function (id, userName) {

        $('#' + id).remove();
    };

    $.connection.hub.start().done(function () {

        $('#sendmessage').click(function () {
            chat.server.send($('#Name').val(), $('#message').val());
            $('#message').val('');
        });
        
        $("#btnJoin").click(function () {
            var name = $("#Name").val();
            if (name.length > 0) {
                chat.server.connect(name);
                $('#join').hide();
            }
        });
    });
});

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}


function AddUser(id, name) {

    var userId = $('#Id').val();

    if (userId !== id) {

        $("#chatusers").append('<p id="' + id + '">' + name + '</p>');
    }
}