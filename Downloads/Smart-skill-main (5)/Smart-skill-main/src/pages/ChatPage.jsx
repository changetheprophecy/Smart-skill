// ChatPage — messaging interface with sidebar + chat window
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Search, Circle, ArrowLeft } from "lucide-react";
import { matchedUsers, conversations } from "../data/mockData";

export default function ChatPage() {
  const [selectedUserId, setSelectedUserId] = useState(matchedUsers[0].id);
  const [messageInput, setMessageInput] = useState("");
  const [chatData, setChatData] = useState(conversations);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true); // mobile toggle
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUserId, chatData]);

  const selectedUser = matchedUsers.find((u) => u.id === selectedUserId);
  const messages = chatData[selectedUserId] || [];

  // Filter sidebar users by search
  const filteredUsers = matchedUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Send a message
  const handleSend = () => {
    const text = messageInput.trim();
    if (!text) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatData((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMsg],
    }));
    setMessageInput("");
  };

  // Send on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
    setShowSidebar(false); // hide sidebar on mobile after selecting
  };

  return (
    <div className="h-[calc(100vh-65px)] flex bg-base-200/30">

      {/* ── LEFT SIDEBAR ── */}
      <aside
        className={`
          ${showSidebar ? "flex" : "hidden"} lg:flex
          flex-col w-full lg:w-80 xl:w-96
          bg-base-100 border-r border-base-300 shrink-0
        `}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-base-300">
          <h2 className="text-2xl font-display font-bold mb-4">Messages</h2>
          {/* Search input */}
          <label className="input input-bordered rounded-2xl flex items-center gap-2 bg-base-200/60">
            <Search size={16} className="text-base-content/40" />
            <input
              type="text"
              placeholder="Search matches..."
              className="grow text-sm bg-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>

        {/* Match list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-sm text-base-content/40 py-8">No matches found</p>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelectUser(user.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 text-left ${
                  selectedUserId === user.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-base-200"
                }`}
              >
                {/* Avatar with online dot */}
                <div className="relative shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border-2 border-base-200"
                  />
                  {user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100" />
                  )}
                </div>

                {/* Name + last message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">{user.name}</span>
                    <span className="text-[11px] text-base-content/40 shrink-0 ml-1">{user.lastTime}</span>
                  </div>
                  <p className="text-xs text-base-content/50 truncate mt-0.5">{user.lastMessage}</p>
                </div>

                {/* Unread badge */}
                {user.unread > 0 && (
                  <span className="badge badge-primary badge-sm shrink-0">{user.unread}</span>
                )}
              </button>
            ))
          )}
        </div>
      </aside>

      {/* ── CHAT WINDOW ── */}
      <main
        className={`
          ${!showSidebar ? "flex" : "hidden"} lg:flex
          flex-col flex-1 bg-base-100 min-w-0
        `}
      >
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-base-300 bg-base-100/80 backdrop-blur-sm">
              {/* Back button (mobile only) */}
              <button
                className="btn btn-ghost btn-circle btn-sm lg:hidden"
                onClick={() => setShowSidebar(true)}
              >
                <ArrowLeft size={18} />
              </button>

              <div className="relative">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full border-2 border-primary/20"
                />
                {selectedUser.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-base-100" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-sm">{selectedUser.name}</h3>
                <p className="text-xs text-base-content/40 flex items-center gap-1">
                  {selectedUser.online ? (
                    <><Circle size={8} className="fill-success text-success" /> Online</>
                  ) : (
                    "Offline"
                  )}
                </p>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  {/* Avatar for received messages */}
                  {msg.sender !== "me" && (
                    <img
                      src={selectedUser.avatar}
                      alt=""
                      className="w-7 h-7 rounded-full shrink-0 mb-1"
                    />
                  )}

                  <div className={`max-w-[70%] ${msg.sender === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        msg.sender === "me"
                          ? "chat-bubble-sent"
                          : "bg-base-200 text-base-content chat-bubble-received"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-base-content/30 px-1">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-base-300 bg-base-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Message ${selectedUser.name}...`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="input input-bordered flex-1 rounded-2xl bg-base-200/60 focus:bg-base-100 text-sm transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                  className="btn btn-primary btn-circle shadow-lg shadow-primary/20 disabled:opacity-40"
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <p className="text-xs text-base-content/30 text-center mt-2">Press Enter to send</p>
            </div>
          </>
        ) : (
          // No user selected (desktop fallback)
          <div className="flex-1 flex flex-col items-center justify-center text-base-content/30">
            <div className="text-6xl mb-4">💬</div>
            <p className="font-medium">Select a conversation</p>
          </div>
        )}
      </main>
    </div>
  );
}
