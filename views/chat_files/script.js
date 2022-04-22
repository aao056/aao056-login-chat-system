const socket = io('http://localhost:8080')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

addMessage('You joined the chat')

socket.emit('user-connected',name)

socket.on('new-user',name => {
    addMessage(`${name} has entered the chat`)
})
socket.on('chat-message', response  => {
    addMessage(`${response.name}: ${response.message}`)
  })

socket.on('disconnected-user',name =>{
    addMessage(`${name} has disconnected from the chat`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    if(message!=' ') {
        addMessage(`${name}: ${message}`)
        socket.emit('send-chat-message', message)
        messageInput.value = ''
    }
})

function addMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}
