
import './App.css';
import logo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import chatgptLogo from './assets/chatgptLogo.svg'
import { sendMsgOpenAI} from './Openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null)
  const [input ,setInput] = useState('')
  const [messages ,setMessages] = useState([{
    text: 'Hi, i am ChatGPT',
    isBot: true,
  }])

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])

  const handleSend = async()=>{
    const text = input;
    setInput('');
    setMessages(prevMessages => [
      ...prevMessages,
      {text, isBot: false}
    ]);
    
    const res = await sendMsgOpenAI(text)
    setMessages(prevMessages => [
      ...prevMessages,
      {text, isBot: false},
      {text: res, isBot: true}
    ])
  }

  const handleEnter = async(e)=>{
    if (e.key === 'Enter') {
      await handleSend();
    }
  }

  const handleQuery = async(e)=>{
    const text = e.target.value;
    setInput('');
    setMessages(prevMessages => [
      ...prevMessages,
      {text, isBot: false}
    ]);
    
    const res = await sendMsgOpenAI(text)
    setMessages(prevMessages => [
      ...prevMessages,
      {text, isBot: false},
      {text: res,isBot: true}
    ])
  }
  return (
    <div className='App'>
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={logo} alt="logo" className="logo" /><span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn" onClick={()=> window.location.reload()}><img src={addBtn} alt="" className="addBtn"/>New Chat</button>
          <div className="upperSideBottom">
              <button className="query" onClick={handleQuery} value={'What is Programming?'}><img src={msgIcon} alt="" />What is Programming?</button>
              <button className="query" onClick={handleQuery} value={'How to use an API'}><img src={msgIcon} alt="" />How to use an API</button>
            </div>
        </div>
        <div className='lowerSide'>
          <div className='listItems'><img src={home} alt="" className="listItemsImg" />Home</div>
          <div className='listItems'><img src={saved} alt="" className="listItemsImg" />Saved</div>
          <div className='listItems'><img src={rocket} alt="" className="listItemsImg" />Ungrad to pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {
            messages.map((message,i) =>(
              <div className={message.isBot?"chat bot":"chat"} key={i}>
                  <img src={message.isBot?chatgptLogo:userIcon} alt="" className='chatImg'/> <p className="txt">{message.text}</p>
              </div>
            ))
          }
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp"> 
            <input type="text" name='' id='' placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=> setInput(e.target.value)}/>
            <button className="send"><img src={sendBtn} alt="send" onClick={handleSend}/></button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 version</p>
        </div>
      </div>
    </div>
  );
}

export default App;
