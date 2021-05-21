const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)

const wss = new WebSocket.Server({server: server})


let users = []
let messages = []

function sendMessageOnConnection(params) {
    
}

// const server = new WebSocket.Server({port: 9000})

wss.on('connection', function(ws){
    console.log('Connection established');
    // ws.send('From server: Connected!') 

    ws.on('message', function(data) {
        const payload = JSON.parse(data)
        console.log(payload);
        
        switch (payload.user.type) {
            case 'SET_USER':

                payload.user.ws = ws
                users.push(payload.user)
                ws.send(JSON.stringify({users, messages}))
                break;
                
                case 'SEND_MESSAGE':
                    console.log(payload);
                    messages.push(payload)
                    users.forEach( user => {
                        const message = {
                            user: payload.user.name,
                            message: payload.message
                        }
                        user.ws.send(JSON.stringify({message, messages}))
                    })
                    break;
                    
                    default:
                        break;
                    }
                })
                
                ws.on('close', function(){
                    console.log('client disconnected');
                })
                
                
})
            
server.listen('9000')