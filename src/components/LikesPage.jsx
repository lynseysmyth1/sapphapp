import React, { useState, useRef, useEffect } from 'react';
import './LikesPage.css';
import { likedProfiles } from '../data/profiles';
import { BackArrowIcon, HeartIcon, WavingHandIcon } from './shared/Icons';
import { useVerticalSwipe, useHorizontalSwipe } from '../utils/useSwipeHandlers';

// Filter out Sam, Riley, and Blake from likes and move them to friends
const friendsToMove = ['Sam', 'Riley', 'Blake'];
const filteredLikedProfiles = likedProfiles.filter(profile => !friendsToMove.includes(profile.name));
const movedFriends = likedProfiles.filter(profile => friendsToMove.includes(profile.name));

// Create friends data with only Sam, Riley, and Blake
const friendsProfiles = movedFriends.map((profile, index) => ({
  ...profile,
  id: `friend-${index + 1}`,
  friendDate: ['2 weeks ago', '1 week ago', '3 days ago'][index] || 'Recently'
}));

export default function LikesPage() {
  const [activeTab, setActiveTab] = useState('likes');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setCurrentImageIndex(0);
    setCurrentDetailIndex(0);
  };

  const handleBack = () => {
    setSelectedProfile(null);
    setCurrentImageIndex(0);
    setCurrentDetailIndex(0);
  };

  // Carousel swipe handlers
  const carouselSwipe = useVerticalSwipe((newIndex) => {
    if (selectedProfile) {
      setCurrentImageIndex(Math.max(0, Math.min(newIndex, selectedProfile.images.length - 1)));
    }
  });

  // Details swipe handlers
  const detailSwipe = useHorizontalSwipe((newIndex) => {
    if (selectedProfile) {
      setCurrentDetailIndex(Math.max(0, Math.min(newIndex, selectedProfile.details.length - 1)));
    }
  });

  // Update carousel position when index changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselSwipe.containerRef.current && selectedProfile) {
        const carousel = carouselSwipe.containerRef.current;
        const imageHeight = carousel.offsetHeight;
        if (imageHeight > 0) {
          carousel.scrollTo({
            top: currentImageIndex * imageHeight,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentImageIndex, selectedProfile, carouselSwipe.containerRef]);

  // Track carousel scroll to update indicators
  useEffect(() => {
    const carousel = carouselSwipe.containerRef.current;
    if (!carousel || !selectedProfile) return;

    const handleScroll = () => {
      const scrollTop = carousel.scrollTop;
      const imageHeight = carousel.offsetHeight;
      const newIndex = Math.round(scrollTop / imageHeight);
      const clampedIndex = Math.max(0, Math.min(newIndex, selectedProfile.images.length - 1));
      if (clampedIndex !== currentImageIndex) {
        setCurrentImageIndex(clampedIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [currentImageIndex, selectedProfile, carouselSwipe.containerRef]);

  // Update details position when index changes
  useEffect(() => {
    if (detailSwipe.containerRef.current && selectedProfile) {
      const itemWidth = detailSwipe.containerRef.current.scrollWidth / selectedProfile.details.length;
      detailSwipe.containerRef.current.scrollTo({
        left: currentDetailIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [currentDetailIndex, selectedProfile, detailSwipe.containerRef]);

  // Reset scroll position when profile changes
  useEffect(() => {
    if (selectedProfile) {
      const mainContent = document.querySelector('.main-content-transition');
      if (mainContent) {
        mainContent.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }, [selectedProfile]);

  // Show profile detail view
  if (selectedProfile) {
    return (
      <div className="likes-page">
        <div className="profile-detail-header">
          <button 
            className="back-button" 
            onClick={handleBack}
            aria-label="Back to likes"
          >
            <BackArrowIcon />
          </button>
          <h1 className="profile-detail-title">Back</h1>
        </div>

        <div className="profile-detail-content">
          {/* Image Carousel */}
          <div className="carousel-wrapper">
            <div 
              className="image-carousel"
              ref={carouselSwipe.containerRef}
              {...carouselSwipe.handlers}
            >
              {selectedProfile.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProfile.name} ${index + 1}`}
                  className="carousel-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {selectedProfile.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Like/Dislike Buttons */}
            <div className="action-buttons">
              <button 
                className="action-button dislike-button" 
                onClick={() => console.log(`Profile ${selectedProfile.name} disliked`)}
                aria-label={`Dislike ${selectedProfile.name}`}
              >
                <span className="button-icon" aria-hidden="true">×</span>
              </button>
              <button 
                className="action-button like-button" 
                onClick={() => console.log(`Profile ${selectedProfile.name} liked`)}
                aria-label={`Like ${selectedProfile.name}`}
              >
                <HeartIcon className="button-icon heart-icon" />
              </button>
            </div>
          </div>

          <div className="profile-content">
            {/* Name */}
            <h1 className="profile-name">{selectedProfile.name}</h1>

            {/* Swipeable Details Row */}
            <div 
              className="details-row"
              ref={detailSwipe.containerRef}
              {...detailSwipe.handlers}
            >
              {selectedProfile.details.map((detail, index) => (
                <div key={index} className="detail-item">
                  {detail}
                </div>
              ))}
            </div>

            {/* Looking For Section */}
            <div className="profile-section">
              <h2 className="section-label">Looking for:</h2>
              <p className="section-body looking-for-body">{selectedProfile.lookingFor}</p>
            </div>

            {/* Bio Section */}
            <div className="profile-section">
              <h2 className="section-label">Bio</h2>
              <p className="section-body">{selectedProfile.bio}</p>
            </div>

            {/* Conversation Starter Section */}
            <div className="profile-section conversation-starter-section">
              <h2 className="section-label">Conversation Starter</h2>
              <p className="section-body">{selectedProfile.conversationStarter}</p>
            </div>

            {/* Interests Section */}
            <div className="profile-section">
              <h2 className="section-label">Interests</h2>
              <p className="section-body">{selectedProfile.interests}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get current profiles based on active tab
  const currentProfiles = activeTab === 'likes' ? filteredLikedProfiles : friendsProfiles;
  const dateLabel = activeTab === 'likes' ? 'Matched' : 'Friends since';

  // Show likes/friends list view
  return (
    <div className="likes-page">
      <div className="likes-header-container">
        <div className="likes-header">
          <h1 className="likes-title">{activeTab === 'likes' ? 'Likes' : 'Friends'}</h1>
          <p className="likes-subtitle">
            {activeTab === 'likes' ? 'People who liked you' : 'Your friends'}
          </p>
        </div>

        {/* Tabs */}
        <div className="likes-tabs">
        <button
          className={`likes-tab ${activeTab === 'likes' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('likes');
            setSelectedProfile(null);
          }}
          aria-label="Likes tab"
          aria-pressed={activeTab === 'likes'}
        >
          <HeartIcon 
            className="tab-icon" 
            fillColor={activeTab === 'likes' ? '#F06B4A' : '#999'}
          />
          <span className="tab-label">Likes</span>
        </button>
        <button
          className={`likes-tab ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('friends');
            setSelectedProfile(null);
          }}
          aria-label="Friends tab"
          aria-pressed={activeTab === 'friends'}
        >
          <div className="tab-icon-wrapper">
            <WavingHandIcon className="tab-icon" fillColor="#F06B4A" strokeColor="#F06B4A" strokeWidth={3} />
          </div>
          <span className="tab-label">Friends</span>
        </button>
        </div>
      </div>
      
      <div className="likes-grid">
        {currentProfiles.map((profile) => (
          <div 
            key={profile.id} 
            className="like-card"
            onClick={() => handleProfileClick(profile)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProfileClick(profile);
              }
            }}
            aria-label={`View ${profile.name}'s profile`}
          >
            <div className="like-card-image-wrapper">
              <img 
                src={profile.image} 
                alt={profile.name} 
                className="like-card-image" 
              />
              <div className="like-card-overlay">
                <div className="like-card-info">
                  <h2 className="like-card-name">
                    {profile.name}, {profile.details[0].split('|')[0].trim()}
                  </h2>
                  <p className="like-card-details">
                    {dateLabel} {activeTab === 'likes' ? profile.matchedDate : profile.friendDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
