import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:8000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const chatEndRef = useRef(null);
  const typingTimeout = useRef(null);

  /* ---------------- SOCKET LISTENERS ---------------- */
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user-joined", (name) => {
      setMessages((prev) => [
        ...prev,
        { system: true, text: `${name} joined the room` },
      ]);
    });

    socket.on("left", (name) => {
      setMessages((prev) => [
        ...prev,
        { system: true, text: `${name} left the room` },
      ]);
    });

    socket.on("room-users", (list) => {
      setUsers(list);
    });

    socket.on("user-typing", (name) => {
      setTypingUser(name);

      clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        setTypingUser("");
      }, 1000);
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-joined");
      socket.off("left");
      socket.off("room-users");
      socket.off("user-typing");
    };
  }, []);

  /* ---------------- AUTOSCROLL ---------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- JOIN ROOM ---------------- */
  const joinChat = () => {
    if (!username.trim() || !room.trim()) return;

    setMessages([]);
    socket.emit("join-room", { username, room });
    setJoined(true);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      id: Date.now(),
      name: username,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, msgData]);
    socket.emit("send-message", { room, message });

    setMessage("");
  };

  /* ---------------- TYPING ---------------- */
  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (typingTimeout.current) return;

    socket.emit("typing", { room, username });
    typingTimeout.current = setTimeout(() => {
      typingTimeout.current = null;
    }, 800);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="app-container">
      <div className="card">
        {!joined ? (
          <>
            <h2>Join Chat</h2>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinChat}>Join</button>
          </>
        ) : (
          <>
            <h3>Room: {room}</h3>

            <div className="layout">
              <div className="users">
                <h4>Online</h4>
                {users.map((u) => (
                  <div key={u} className="user">
                    {u}
                  </div>
                ))}
              </div>

              <div className="chat-section">
                <div className="chat-box">
                  {messages.map((msg) =>
                    msg.system ? (
                      <div key={msg.text} className="system">
                        {msg.text}
                      </div>
                    ) : (
                      <div
                        key={msg.id}
                        className={`msg ${
                          msg.name === username ? "right" : "left"
                        }`}
                      >
                        <b>{msg.name}</b>
                        <span className="time">{msg.time}</span>
                        <br />
                        {msg.message}
                      </div>
                    )
                  )}

                  {typingUser && (
                    <div className="typing">
                      {typingUser} is typing...
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                <div className="input-area">
                  <input
                    placeholder="Type a message..."
                    value={message}
                    onChange={handleTyping}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
