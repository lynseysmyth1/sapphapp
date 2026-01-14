import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { profiles } from '../data/profiles';
import { HeartIcon } from './shared/Icons';
import { useHorizontalSwipe, useVerticalSwipe } from '../utils/useSwipeHandlers';

export default function ProfilePage() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profileImageIndices, setProfileImageIndices] = useState({});
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);

  const currentProfile = profiles[currentProfileIndex];
  const images = currentProfile.images;
  const details = currentProfile.details;
  const currentImageIndex = profileImageIndices[currentProfileIndex] || 0;

  // Profile swipe handlers
  const profileSwipe = useHorizontalSwipe((newIndex) => {
    const clampedIndex = Math.max(0, Math.min(newIndex, profiles.length - 1));
    setCurrentProfileIndex(clampedIndex);
  });

  // Carousel swipe handlers
  const carouselSwipe = useVerticalSwipe((newIndex) => {
    const clampedIndex = Math.max(0, Math.min(newIndex, images.length - 1));
    setProfileImageIndices(prev => ({
      ...prev,
      [currentProfileIndex]: clampedIndex
    }));
  });

  // Details swipe handlers
  const detailSwipe = useHorizontalSwipe((newIndex) => {
    setCurrentDetailIndex(Math.max(0, Math.min(newIndex, details.length - 1)));
  });

  // Update profile position when index changes
  useEffect(() => {
    if (profileSwipe.containerRef.current) {
      profileSwipe.containerRef.current.scrollTo({
        left: currentProfileIndex * profileSwipe.containerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentProfileIndex, profileSwipe.containerRef]);

  // Update carousel position when profile or image index changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselSwipe.containerRef.current) {
        const imageIndex = profileImageIndices[currentProfileIndex] || 0;
        carouselSwipe.containerRef.current.scrollTo({
          top: imageIndex * carouselSwipe.containerRef.current.offsetHeight,
          behavior: 'smooth'
        });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [profileImageIndices, currentProfileIndex, carouselSwipe.containerRef]);

  // Track carousel scroll to update indicators
  useEffect(() => {
    const carousel = carouselSwipe.containerRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollTop = carousel.scrollTop;
      const imageHeight = carousel.offsetHeight;
      const newIndex = Math.round(scrollTop / imageHeight);
      const clampedIndex = Math.max(0, Math.min(newIndex, images.length - 1));
      const currentIndexForProfile = profileImageIndices[currentProfileIndex] || 0;
      if (clampedIndex !== currentIndexForProfile) {
        setProfileImageIndices(prev => ({
          ...prev,
          [currentProfileIndex]: clampedIndex
        }));
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [profileImageIndices, images.length, currentProfileIndex, carouselSwipe.containerRef]);

  // Update details position when index changes
  useEffect(() => {
    if (detailSwipe.containerRef.current) {
      const itemWidth = detailSwipe.containerRef.current.scrollWidth / details.length;
      detailSwipe.containerRef.current.scrollTo({
        left: currentDetailIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [currentDetailIndex, details.length, detailSwipe.containerRef]);

  // Like/Dislike handlers
  const handleLike = () => {
    console.log(`Profile ${currentProfile.name} liked`);
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const handleDislike = () => {
    console.log(`Profile ${currentProfile.name} disliked`);
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  return (
    <div 
      className="profiles-container"
      ref={profileSwipe.containerRef}
      {...profileSwipe.handlers}
    >
      {profiles.map((profile, profileIndex) => {
        const isCurrentProfile = profileIndex === currentProfileIndex;
        const profileImageIndex = profileImageIndices[profileIndex] || 0;
        
        return (
          <div key={profileIndex} className="profile-page">
            {/* Image Carousel */}
            <div className="carousel-wrapper">
              <div 
                className="image-carousel"
                ref={isCurrentProfile ? carouselSwipe.containerRef : null}
                {...(isCurrentProfile ? carouselSwipe.handlers : {})}
              >
                {profile.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${profile.name} ${index + 1}`}
                    className="carousel-image"
                  />
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {profile.images.map((_, index) => {
                  const isActive = index === profileImageIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      className={`indicator ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setProfileImageIndices(prev => ({
                          ...prev,
                          [profileIndex]: index
                        }));
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  );
                })}
              </div>

              {/* Like/Dislike Buttons */}
              <div className="action-buttons">
                <button 
                  className="action-button dislike-button" 
                  onClick={handleDislike}
                  aria-label={`Dislike ${profile.name}`}
                >
                  <span className="button-icon" aria-hidden="true">×</span>
                </button>
                <button 
                  className="action-button like-button" 
                  onClick={handleLike}
                  aria-label={`Like ${profile.name}`}
                >
                  <HeartIcon className="button-icon heart-icon" />
                </button>
              </div>
            </div>

            <div className="profile-content">
              {/* Name */}
              <h1 className="profile-name">{profile.name}</h1>

              {/* Swipeable Details Row */}
              <div 
                className="details-row"
                ref={isCurrentProfile ? detailSwipe.containerRef : null}
                {...(isCurrentProfile ? detailSwipe.handlers : {})}
              >
                {profile.details.map((detail, index) => (
                  <div key={index} className="detail-item">
                    {detail}
                  </div>
                ))}
              </div>

              {/* Looking For Section */}
              <div className="profile-section">
                <h2 className="section-label">LOOKING FOR:</h2>
                <p className="section-body looking-for-body">{profile.lookingFor}</p>
              </div>

              {/* Bio Section */}
              <div className="profile-section">
                <h2 className="section-label">BIO:</h2>
                <p className="section-body">{profile.bio}</p>
              </div>

              {/* Conversation Starter Section */}
              <div className="profile-section conversation-starter-section">
                <h2 className="section-label">CONVERSATION STARTER:</h2>
                <p className="section-body conversation-starter-body">{profile.conversationStarter}</p>
              </div>

              {/* Interests Section */}
              <div className="profile-section">
                <h2 className="section-label">INTERESTS:</h2>
                <div className="interests-tags">
                  {profile.interests.split(', ').map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
