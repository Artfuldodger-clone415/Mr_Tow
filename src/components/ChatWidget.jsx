import React, { useState, useRef, useEffect } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi — I\'m Mr. Tow Bot. How can I help? (e.g., towing, roadside, price)' },
  ])
  const [value, setValue] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open])

  function sendMessage(text) {
    if (!text.trim()) return
    const userMsg = { from: 'user', text }
    setMessages((m) => [...m, userMsg])
    setValue('')
    // simple rule-based responses
    setTimeout(() => {
      let reply = 'I\'m not sure — please call us at +1 804-314-0091.'
      const t = text.toLowerCase()
      if (t.includes('tow') || t.includes('towing')) reply = 'We offer flatbed towing 24/7. Where are you located?'
      else if (t.includes('price') || t.includes('cost') || t.includes('how much')) reply = 'Price depends on distance and vehicle — call for a quote: +1 804-314-0091.'
      else if (t.includes('jump') || t.includes('battery')) reply = 'We provide jump starts on-site. ETA usually within 30-45 mins.'
      else if (t.includes('flat') || t.includes('tire')) reply = 'We can change/repair flat tires on the spot; keep your spare ready.'

      setMessages((m) => [...m, { from: 'bot', text: reply }])
    }, 700)
  }

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      <div className="chat-button" onClick={() => setOpen((v) => !v)} aria-hidden>
        <span>💬</span>
      </div>

      <div className="chat-panel" role="dialog" aria-label="Chat with Mr. Tow" hidden={!open}>
        <div className="chat-header">Mr. Tow — Chat</div>
        <div className="chat-list" ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.from}`}>
              {m.text}
            </div>
          ))}
        </div>

        <form
          className="chat-form"
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(value)
          }}
        >
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}
