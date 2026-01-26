import React, { useState, useCallback } from 'react';
import './ChatPage.css';
import { matches } from '../data/matches';
import { BackArrowIcon, SendIcon, HeartIcon, WavingHandIcon } from './shared/Icons';

export default function ChatPage() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim();
    if (trimmedMessage) {
      // TODO: Implement message sending with backend
      setMessageInput('');
    }
  }, [messageInput]);

  if (selectedMatch) {
    return (
      <div className="chat-page">
        <div className="chat-header">
          <button 
            className="back-button" 
            onClick={() => setSelectedMatch(null)}
            aria-label="Back to messages"
          >
            <BackArrowIcon />
          </button>
          <img 
            src={selectedMatch.image} 
            alt={selectedMatch.name} 
            className="chat-header-avatar" 
          />
          <div className="chat-header-info">
            <h2 className="chat-header-name">{selectedMatch.name}</h2>
            <span className="chat-header-status">
              <span className="online-indicator" aria-hidden="true"></span>
              Online
            </span>
          </div>
        </div>

        <div className="messages-container">
          {selectedMatch.messages.map((message) => (
            <div key={message.id} className={`message message--${message.sender}`}>
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>

        <form className="message-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            aria-label="Message input"
          />
          <button 
            type="submit" 
            className="send-button"
            aria-label="Send message"
            disabled={!messageInput.trim()}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <div className="chat-list-header">
        <h1 className="chat-list-title">Messages</h1>
      </div>
      
      <div className="matches-list">
        {matches.map((match) => (
          <div
            key={match.id}
            className="match-item"
            onClick={() => setSelectedMatch(match)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedMatch(match);
              }
            }}
            aria-label={`Open conversation with ${match.name}`}
          >
            <img 
              src={match.image} 
              alt={match.name} 
              className="match-avatar" 
            />
            <div className="match-info">
              <div className="match-header">
                <div className="match-name-container">
                  <h3 className="match-name">{match.name}</h3>
                  {(match.name === 'Katie' || match.name === 'Sarah' || match.name === 'Emma') && (
                    <HeartIcon 
                      className="match-heart-icon" 
                      fillColor="#F06B4A"
                    />
                  )}
                  {match.name === 'Sam' && (
                    <div className="match-wave-icon-wrapper">
                      <WavingHandIcon className="match-wave-icon" fillColor="#F06B4A" strokeColor="#F06B4A" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className="match-timestamp">{match.timestamp}</span>
              </div>
              <div className="match-footer">
                <p className="match-last-message">{match.lastMessage}</p>
                {match.unread > 0 && (
                  <span className="match-unread-badge" aria-label={`${match.unread} unread messages`}>
                    {match.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

