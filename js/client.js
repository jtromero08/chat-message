var chatbox = document.getElementById("chat-box");
var btn = document.getElementById("btn");
var inputBar = document.getElementById("input");


function appendMultipleChild(parent, childrens) {
    childrens.forEach(child => {
        parent.appendChild(child);
    })
}

function createMsg(text, senderOrReceiver) {
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

    appendMultipleChild(textbox, [h3, msg, time]);

    if(senderOrReceiver === "sender") {
        var containerUserPrintedSender = document.createElement("div");
        containerUserPrintedSender.setAttribute("class", "container-user-printed-sender");
        h3.innerHTML = "John";
        msg.innerHTML = text;
        appendMultipleChild(containerUserPrintedSender, [image, textbox]);
        chatbox.appendChild(containerUserPrintedSender);
    }
    
    if(senderOrReceiver === "receiver") {
        var containerUserPrintedReceiver = document.createElement("div");
        containerUserPrintedReceiver.setAttribute("class", "container-user-printed-receiver");
        h3.innerHTML = "Lidia";
        msg.innerHTML = "Nice too here that!";
        appendMultipleChild(containerUserPrintedReceiver, [image, textbox]);
        chatbox.appendChild(containerUserPrintedReceiver);
    }

};

btn.addEventListener("click", e => {
    e.preventDefault();
    createMsg(inputBar.value, "sender")
    setTimeout(() => {
        createMsg("", "receiver");
    }, 2000)

    inputBar.value = "";
})