const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation

socket.on('newMessage', data => {    
    addMessage(data, false)
})

socket.on('connect', () => {
    sendConnectionUpdate();
});

socket.on('reconnect', () => {
    sendConnectionUpdate();
});

const sendConnectionUpdate = () => {    
    postData("/join", { socketId: socket.id }).then(res => {
        if (res.message === "error") {
            window.location = '/'; //go to login page
        }
        socket.emit('newUser', res.userName, new Date());   
    });
}

const getLocalTime = (time) => {
    d = new Date(time);    
    return d.toLocaleTimeString();
}

// Post message to board
const postMessage = () => {
    let data = {
        sender: user.value,
        time: new Date(),
        message: messageEl.value
    };
    addMessage(data, true);
    socket.emit('message', data);
}

// Add message from any user to chatbox, determine if added
// by current user.
const addMessage = (data = {}, user = false) => {    
    chatBox.innerHTML += `
    <li class="message${user ? ' uMessage' : ''}">
        ${data.sender} @${getLocalTime(data.time)}: ${data.message} 
    </li>`;    
}

