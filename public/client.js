const socket = io()
let name;
let textaria=document.querySelector('#textarea')
let messageAria = document.querySelector('.message_area')


do {
    name=prompt('please enter your name')
} while (!name)


textaria.addEventListener('keyup', (e) => {
    if (e.key==='Enter') {
        sendMessage(e.target.value)
    }
})



function sendMessage(msgg) {
    let msg = {
        user: name,
        message:msgg.trim()
    }
    //append
    appendMessage(msg, 'outgoing')
    textaria.value=''
    scrollToBotton()
    // send server
    socket.emit('message',msg)
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup = `
     <h4> ${msg.user}</h4>
     <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageAria.appendChild(mainDiv)
}

// receved

socket.on('message', (msg) => {
     console.log(msg);
    appendMessage(msg, 'incoming')
    scrollToBotton()
})

function scrollToBotton() {
    messageAria.scrollTop=messageAria.scrollHeight
}