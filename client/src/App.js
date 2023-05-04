import aiImage from './img/AI-gpt.png';
import chatgptimg from './img/chatgpt.svg';
import logochat from './img/logochat.png';
import   { useState, useEffect } from 'react';
import './css/App.css';
import './css/normalize.css';


function App() {

  useEffect(()=> {
    getEngines();
  }, [])

  //Add state for input and chat log

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("ada");
  const [temperature, setCurrentTemp] = useState(0);
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "Cómo puedo ayudarte hoy?"
  }])

  //Clear chat
  function clearChat() {
    setChatLog([]);
  }

  function getEngines() {
    fetch("http://localhost:3080/models")
      .then(res => res.json())
      .then(data => { 
        setModels(data.models)});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, {user: "common-user", message: `${input}`}];
    setInput("");
    setChatLog(chatLogNew)

    //Fetch response to the api, combining the chat log array of messages 
    //and sending it as a message to localhost 3000 as a post
    const messages = chatLogNew.map((message) => message.message)
    .join("\n");

    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
        temperature,
      })
    });
    const data = await response.json();
    await setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}])
    console.log(data.message);
  }
  
  //Creates the sideMenu. Also gets the models of IA and displays it in a select
  return (
    <div className="App">
      <aside className="menu">
        <img class="aiLogo" alt="aiLogo" src={aiImage}/>
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          Nuevo Chat
        </div>
        <div className="modelIA">
          Modelo de IA
        </div>
        <div className='models'>
          <select id="type-of-model" onChange={(e) => setCurrentModel(e.target.value)}>
            {models.map((model) => (
              <option key={model.id} value={model.id}>{model.id}</option>
            ))}
          </select>
        </div>
        <div className="modelIA">
          Temperatura
        </div>
        <div className="models project">
          <input type="range" min="0" max="1" step="0.01" id="type-of-model" onChange={(e) => setCurrentTemp(e.target.value)} />
          <div className="bar"></div>
      </div>
      </aside>
      <section className="chatbox">
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="container-footer">
          <div className='aside-continum'></div>
          <div className='chat-input-holder'> 
            <form onSubmit={handleSubmit}>
              <input rows="1" className='chat-input-text-area' value={input} onChange={(e)=> setInput(e.target.value)}/>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

//Gets the input message and sets the logo for each user with the message in screen.
export default App;
const ChatMessage = ({message}) => {
  return (
    <div className='chat-message'>
      <div className='chat-message-center'>
          <div className={`avatar ${message.user == "gpt" && "chatgpt"}`}>{message.user=="common-user" && <img id='comnUser' src={logochat} alt="commnuser" />} {message.user=="gpt" && <img src={chatgptimg} alt="ai" />}</div>
          <div className='message'>{message.message}</div>
      </div>
    </div>   
  );

}