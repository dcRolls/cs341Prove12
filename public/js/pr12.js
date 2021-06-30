const socket = io('/'); // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// Login user to access chat room.
const login = () => {    
    postData("/login", { userName: usernameInput.value })
    .then(response => {        
        if(response.success) {            
            window.location = '/chat'; //go to chat page         
        } else {            
            errorContainer.innerHTML = response.message;
        }    
    });    
}
