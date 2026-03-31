import { useState } from 'react';
import './ChatPanel.css';

function ChatPanel({ selectedAgent, conversation }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <aside className="chat-panel">
      <div className="chat-panel-header">
        {selectedAgent ? (
          <div className="chat-agent-info">
            <span className="chat-agent-icon">{selectedAgent.icon}</span>
            <div className="chat-agent-details">
              <span className="chat-agent-name">{selectedAgent.name} Agent</span>
              <span className="chat-agent-desc">{selectedAgent.description}</span>
            </div>
          </div>
        ) : (
          <div className="chat-no-agent">
            <span className="chat-no-agent-icon">💬</span>
            <span className="chat-no-agent-text">Select an agent to start chatting</span>
          </div>
        )}
      </div>

      <div className="chat-messages">
        {!selectedAgent && (
          <div className="chat-empty-state">
            <div className="chat-empty-icon">🤖</div>
            <p className="chat-empty-title">No agent selected</p>
            <p className="chat-empty-desc">
              Choose an agent from the sidebar to view the conversation and collaborate on changes.
            </p>
          </div>
        )}

        {selectedAgent && conversation.length === 0 && (
          <div className="chat-empty-state">
            <div className="chat-empty-icon">{selectedAgent.icon}</div>
            <p className="chat-empty-title">Start a conversation</p>
            <p className="chat-empty-desc">
              Ask {selectedAgent.name} anything about your project.
            </p>
          </div>
        )}

        {conversation.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.role === 'user' ? 'chat-message-user' : 'chat-message-agent'}`}
          >
            {msg.role === 'agent' && (
              <div className="chat-message-avatar">{selectedAgent?.icon}</div>
            )}
            <div className={`chat-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-agent'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder={selectedAgent ? `Message ${selectedAgent.name}...` : 'Select an agent first...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!selectedAgent}
        />
        <button
          className="chat-send-btn"
          disabled={!selectedAgent || !inputValue.trim()}
        >
          ↑
        </button>
      </div>
    </aside>
  );
}

export default ChatPanel;
