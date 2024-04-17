// src/client/chat.tsx
import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import WebSocket from 'websocket'
import { connect } from 'react-redux';

import { addConversation, fetchConversation } from 'src/utils/redux/';

const WebSocketClient = WebSocket.w3cwebsocket
const ChatView = (props) => {
  const [input, setInput] = useState('')
  const [responses, setResponses] = useState([])
  const [inputDisabled, setInputDisabled] = useState(false)
  const focusTargetRef = useRef(null)
  const [loadingFile, setLoadingFile] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [currentMessage, setCurrentMessage] = useState('')
  const [persona, setPersona] = useState("")
  const [client, setClient] = useState(null)
  const [WSID, setWSID] = useState('')
  const [context, setContext] = useState([])
  const [loaded, setLoaded] = useState(false)
  const fileInputRef = useRef(null)
  const { botId } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id')
  let config = false
  

  useEffect(() => {
    if (id && !props.conversation && !props.loading) {
      setInputDisabled(true)
      setLoadingFile(true)
      props.fetchConversation(id)
    } else if (props.conversation && !loaded && WSID) {
      setResponses(props.conversation.messages)
      setLoaded(true)
      if (id) {
        axios.post(`http://localhost:4040/config`, {
          wsid: WSID,
          conv_wsid : props.conversation.wsid
        }).then(() => {
          console.log("Configuration Loaded")
          setInputDisabled(false)
          setLoadingFile(false)
        })
      } else {
        setInputDisabled(false)
        setLoadingFile(false)
      }
    }
  })

  

  useEffect(() => {
    scrollToBottom()
  }, [responses])

  useEffect(() => {
    if (!client) {
      const newClient = new WebSocketClient(`ws://localhost:8080`)

      newClient.onopen = () => {
        console.log('Connected to WebSocket server')
      }
      setClient(newClient)
    }
  }, [])
  if (client) {
    client.onmessage = async (event) => {
      let message = event.data
      if(message.indexOf('WS-ID-') !== -1){
        let id = message.split('WS-ID-')[1]
        setWSID(id)
        const reponse = await axios.post(`http://localhost:4000/s/api/bot/load/${id}/${botId}`)
        const persona =  await axios.get(`http://localhost:4000/s/api/bot/${botId}`).then(resp => {
          console.log("DATA",resp.data)
          return resp.data.bot.personality
        })
        console.log("PER",persona)
        setPersona(persona)
        console.log(reponse)
      } else if (message !== '##DONE##') {
        console.log('Received message:', message)
        let newMessage = currentMessage
        newMessage += message
        setCurrentMessage(newMessage)
        let newResponses = responses
        newResponses.pop()
        newResponses.push(newMessage)
        setResponses(newResponses)
      } else {
        console.log('Full Received message:', currentMessage)
        props.addConversation({
          message: input,
          response: currentMessage,
          botId: botId,
          id: props.conversation ? props.conversation._id : null,
          wsid: WSID
        })
        setInputDisabled(false)
        setInput('')
        setCurrentMessage('')
      }
    }
  }
  const handleSendMessage = async () => {
    try {
      setInputDisabled(true)

      setResponses([...responses, input, ''])

      let response = await axios.post(`http://localhost:4040/ollama`, {
        message: input,
        wsid : WSID,
        persona: persona,
        context: context
      })
      console.log("CTX", response.data.context)
      setContext(response.data.context)
      setInput('')
      setCurrentMessage('')
    } catch (error) {
      console.error('Error sending message to Ollama:', error)
    } finally {
      setInputDisabled(false)
      setTimeout(() => {
        if (focusTargetRef.current) {
          focusTargetRef.current.focus()
        }
      }, 1000)
    }
  }

  const handleFileChange = async event => {
    const file = event.target.files?.[0] || null

    setSelectedFile(file)

    if (file) {
      const formData = new FormData()
      formData.append('pdf_file', file)
      formData.append('wsid', WSID )

      try {
        // Send the file to the backend
        console.log('Sending file to backend...')
        setLoadingFile(true)
        setInputDisabled(true)
        setResponses([...responses, file.name])

        const response = await axios.post(
          `http://localhost:4040/context`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        setResponses([...responses, file.name, response.data.message])
        // Handle the response as needed
        console.log('Backend Response:', response.data)
      } catch (error) {
        console.error('Error sending file to backend:', error)
      } finally {
        setLoadingFile(false)
        setInputDisabled(false)
      }
    }
  }

  const handleFileButtonClick = () => {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleKeyPress = (event) => {
    // Submit on Enter key press
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent new line in textarea
      handleSendMessage()
    }
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth' // You can use 'auto' for an instant scroll
    })
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-700 flex justify-center p-4">
        <h1 className="text-white text-lg font-semibold">
          Chat with AI
        </h1>
      </div>

      <div
        className="w-full max-w-screen-lg flex-1 m-auto p-8 my-4 pb-20"
        id="chat-messages"
      >
        <div className="flex flex-col">
          {responses.map((response, index) => (
            <div className="mb-4" key={index}>
              <div className="flex items-start">
                <div className="ml-3 mb-3">
                  <div
                    className="bg-gray-700 text-white rounded-lg p-2 break-words"
                    style={{ backgroundColor: index % 2 === 0 ? 'black' : '' }}
                  >
                    <span className="leading-5">
                      <ReactMarkdown>{response}</ReactMarkdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-gray-700">
        <div className="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center">
          <button id="file-open" onClick={handleFileButtonClick}>
            <div id="file-open-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 2 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="folder-shape"
                  fill="#C8C8C8"
                  d="M2 6c0-1.1.9-2 2-2h6l2 2h8c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6z"
                />
                <path
                  className="plus-sign"
                  d="M12 11V17"
                  stroke="#202020"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="plus-sign"
                  d="M9.5 14H14.5"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span id="file-button-text " className="text-white">
              {selectedFile ? (
                selectedFile.name
              ) : (
                <span className="text-gray-400">Choose a file</span>
              )}
            </span>
            <div id="file-spinner">
              {' '}
              {loadingFile && (
                <span style={{ color: 'lightgrey' }}>Loading File..</span>
              )}
            </div>
          </button>
          <input
            type="file"
            id="file-input"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <textarea
            ref={focusTargetRef}
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 py-2 px-3 rounded-lg border-none focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white resize-none"
            disabled={inputDisabled}
            style={{
              opacity: inputDisabled ? 0.5 : 1,
              cursor: inputDisabled ? 'not-allowed' : 'auto'
            }}
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-full"
            disabled={inputDisabled}
            style={{
              opacity: inputDisabled ? 0.5 : 1,
              cursor: inputDisabled ? 'not-allowed' : 'auto'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
        loading: state.conversation.loading,
        conversation: state.conversation.current,
        error: state.conversation.error
    })

const mapDispatchToProps = (dispatch) => ({
        fetchConversation: (id) => dispatch(fetchConversation(id)),
        addConversation: (data) => dispatch(addConversation(data))
    })
export default connect(mapStateToProps, mapDispatchToProps)(ChatView);