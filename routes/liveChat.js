const express = require('express')
const router = express.Router()

const users = [{name: 'admin', socket: '' }] // Dummy array for users

router.removeUser = (socketId) => {    
    const idx = users.findIndex(x => x.socket === socketId);
    if(idx > -1) {
        let username = users[idx].name;        
        users.splice(idx, 1);
        return username;
    }
    return null;
}

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
    const newUser = req.body.userName;
    const idx = users.findIndex(x => x.name === newUser.toLowerCase());    
    if (idx < 0) {        
        req.session.userName = newUser;
        res.status(200).json({message: "Log-in successful", success: true, userName: newUser });        
    } else {
        res.status(400).json({message: "User-name already exists. Please choose another.", success: false });
    }
})

// Verify login submission to access chat room.
router.post('/join', (req, res, next) => {
    const newUser = req.session.userName;
    if (!newUser) {
        return res.status(400).json({message: "error"});
    }
    const idx = users.findIndex(x => x.name === newUser.toLowerCase());        
    if (idx < 0) {        
        users.push({
            name: newUser.toLowerCase(),
            socket: req.body.socketId
        });   
    } else {
        users[idx].socket = req.body.socketId;
    }
    res.status(200).json({message: "Joined chat.", userName: newUser });    
})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    res.render('pages/pr12-chat', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12',
        user: req.session.userName
    })
})

module.exports = router
