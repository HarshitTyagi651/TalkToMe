import React, { useEffect, useState } from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import socketIo from 'socket.io-client';
import { user } from '../Login/login';
import Message from '../Message/message';
import './chat.css';

const ENDPOINT = 'http://localhost:4500/';

let socket;

const Chat = () => {

    const [id, setId] = useState("");
    const [messages, setMessages] = useState([])
    const send = ()=>{
        const message = document.getElementById('input-message').value;
        if(message){
            socket.emit('message',{message,id})
        }
        document.getElementById('input-message').value = ""; 
    }

    useEffect(() =>{
        socket = socketIo(ENDPOINT , {transports: ['websocket']});
        socket.on('connect', ()=>{
            setId(socket.id);
            alert("Connected");
        })
        console.log(socket);
        socket.emit('joined',{ user })

        socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user, data.message);
        })
        socket.on('leave',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user, data.message);
        })

        
        return () =>{
            socket.emit('dissconnect');
            socket.off();  
        }
    },[]);

    useEffect(()=>{

        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user, data.message, data.id);
        })

        return() =>{
            socket.off();
        }
    },[messages]);

    

  return (
    <>
        <div className='chatpage'>
            <div className='chat-container'>
                
                <ReactScrollToBottom className='chat-box'>
                    {messages.map((item,i)=> <Message user={(item.id===id)?'':item.user} message={item.message} classs={(item.id===id)?'right':'left'}/>)}
                </ReactScrollToBottom>
                <div className='input-box'>
                    <input type='text' onKeyPress={(event)=>event.key==="Enter"?send():null} placeholder='Enter message here' id='input-message'/>
                    <button id='btn-send' onClick={send}>SEND</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Chat