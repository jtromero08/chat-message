const socket = io('http://localhost:3000')
var chatbox = document.getElementById("chat-box");
var btn = document.getElementById("btn");
var inputBar = document.getElementById("input");

const nameU = prompt('Enter your name.')
const imageName = prompt('Image number: 3 or 8');
function appendUser(username) {
    var div = document.createElement('div');
    div.innerHTML = `${username} joined`;
    chatbox.append(div);
}
appendUser('You');
socket.emit('new user', nameU);

socket.on('user connected', name => {
    appendUser(name);
})

socket.on('chat room', data => {
    createMsg(data.message, 'receiver', data.imagename, data.username)
})

function appendMultipleChild(parent, childrens) {
    childrens.forEach(child => {
        parent.appendChild(child);
    })
}

function createMsg(text, senderOrReceiver, imagename, username) {
    var timeSend = new Date().toLocaleTimeString();
    var icon = document.createElement("i")
    var image = document.createElement("div");
    var textbox = document.createElement("div");
    var h3 = document.createElement("h3");
    var msg = document.createElement("p");
    var time = document.createElement("p");

    icon.setAttribute("class", "far fa-clock");
    image.setAttribute("class", "image");
    textbox.setAttribute("class", `textbox-msg-${senderOrReceiver}`);
    h3.setAttribute("class", `${senderOrReceiver}-name`);
    msg.setAttribute("class", `msg msg-${senderOrReceiver}`);
    time.setAttribute("class", `time time-${senderOrReceiver}`);
    time.appendChild(icon);
    time.append(timeSend);
    msg.innerHTML = text;
    image.setAttribute("style", `background-image: url('./../images/100k-ai-faces-${imagename}.jpg');`);


    appendMultipleChild(textbox, [h3, msg, time]);

    if(senderOrReceiver === "sender") {
        var containerUserPrintedSender = document.createElement("div");
        containerUserPrintedSender.setAttribute("class", "container-user-printed-sender");
        h3.innerHTML = "You";
        appendMultipleChild(containerUserPrintedSender, [image, textbox]);
        chatbox.appendChild(containerUserPrintedSender);
    }
    
    if(senderOrReceiver === "receiver") {
        var containerUserPrintedReceiver = document.createElement("div");
        containerUserPrintedReceiver.setAttribute("class", "container-user-printed-receiver");
        h3.innerHTML = username;
        appendMultipleChild(containerUserPrintedReceiver, [image, textbox]);
        chatbox.appendChild(containerUserPrintedReceiver);
    }

};

btn.addEventListener("click", function(e) {
    e.preventDefault();
    createMsg(inputBar.value, "sender", imageName)
    socket.emit('send chat message', {username: nameU, message: inputBar.value, imagename: imageName})
    inputBar.value = "";
})