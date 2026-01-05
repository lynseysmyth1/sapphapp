import React from 'react';
import './BottomNavigation.css';
import { HomeIcon, HeartOutlineIcon, ChatIcon, ProfileIcon } from './shared/Icons';

export default function BottomNavigation({ currentView, onNavigate }) {
  return (
    <nav className="bottom-navigation" aria-label="Main navigation">
      <button 
        className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
        aria-label="Home"
        aria-current={currentView === 'home' ? 'page' : undefined}
      >
        <HomeIcon className="nav-icon" />
        <span className="nav-label">Home</span>
      </button>
      
      <button 
        className={`nav-item ${currentView === 'likes' ? 'active' : ''}`}
        onClick={() => onNavigate('likes')}
        aria-label="Likes"
        aria-current={currentView === 'likes' ? 'page' : undefined}
      >
        <HeartOutlineIcon className="nav-icon heart-icon" />
        <span className="nav-label">Likes</span>
      </button>
      
      <button 
        className={`nav-item ${currentView === 'chat' ? 'active' : ''}`}
        onClick={() => onNavigate('chat')}
        aria-label="Chat"
        aria-current={currentView === 'chat' ? 'page' : undefined}
      >
        <ChatIcon className="nav-icon" />
        <span className="nav-label">Chat</span>
      </button>
      
      <button 
        className="nav-item"
        onClick={() => onNavigate('profile')}
        aria-label="Profile"
        aria-current={currentView === 'profile' ? 'page' : undefined}
      >
        <ProfileIcon className="nav-icon" />
        <span className="nav-label">Profile</span>
      </button>
    </nav>
  );
}
