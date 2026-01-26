import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './ProfilePage.css';
import { profiles } from '../data/profiles';
import { HeartIcon, WavingHandIcon } from './shared/Icons';
import { useHorizontalSwipe, useVerticalSwipe } from '../utils/useSwipeHandlers';

export default function ProfilePage() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profileImageIndices, setProfileImageIndices] = useState({});
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
  const profilePageRef = useRef(null);

  // Reset scroll position on mount and when profile changes
  useEffect(() => {
    // Use multiple RAFs to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Reset all profile pages (vertical scroll)
        const profilePages = document.querySelectorAll('.profile-page');
        profilePages.forEach(page => {
          if (page) {
            page.scrollTop = 0;
          }
        });
        
        // Reset window scroll
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      });
    });
  }, [currentProfileIndex]);

  const currentProfile = useMemo(() => profiles[currentProfileIndex], [currentProfileIndex]);
  const images = useMemo(() => currentProfile.images, [currentProfile]);
  const details = useMemo(() => currentProfile.details, [currentProfile]);
  const currentImageIndex = profileImageIndices[currentProfileIndex] || 0;

  // Profile swipe handlers
  const handleProfileSwipe = useCallback((newIndex) => {
    isUserSwipingRef.current = true;
    const clampedIndex = Math.max(0, Math.min(newIndex, profiles.length - 1));
    setCurrentProfileIndex(clampedIndex);
    
    // Reset swipe flag after animation completes
    setTimeout(() => {
      isUserSwipingRef.current = false;
    }, 300);
  }, []);

  const profileSwipe = useHorizontalSwipe(handleProfileSwipe);

  // Carousel swipe handlers
  const handleCarouselSwipe = useCallback((newIndex) => {
    const clampedIndex = Math.max(0, Math.min(newIndex, images.length - 1));
    setProfileImageIndices(prev => ({
      ...prev,
      [currentProfileIndex]: clampedIndex
    }));
  }, [currentProfileIndex, images.length]);

  const carouselSwipe = useVerticalSwipe(handleCarouselSwipe);

  // Details swipe handlers
  const handleDetailSwipe = useCallback((newIndex) => {
    setCurrentDetailIndex(Math.max(0, Math.min(newIndex, details.length - 1)));
  }, [details.length]);

  const detailSwipe = useHorizontalSwipe(handleDetailSwipe);

  // Track if user is actively swiping to prevent interference
  const isUserSwipingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Update profile position when index changes (but not during user swipe)
  useEffect(() => {
    const container = profileSwipe.containerRef.current;
    if (!container || isUserSwipingRef.current) return;

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Small delay to avoid interfering with swipe gestures
    scrollTimeoutRef.current = setTimeout(() => {
      if (!isUserSwipingRef.current && container) {
        const targetScroll = currentProfileIndex * container.offsetWidth;
        // Only scroll if we're not already at the target position
        if (Math.abs(container.scrollLeft - targetScroll) > 10) {
          container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
          });
        }
      }
      
      // Reset vertical scroll position of current profile page
      requestAnimationFrame(() => {
        const profilePages = document.querySelectorAll('.profile-page');
        if (profilePages[currentProfileIndex]) {
          profilePages[currentProfileIndex].scrollTop = 0;
        }
      });
    }, 50);

    // Reset image index for new profile if not already set
    if (!profileImageIndices[currentProfileIndex] && currentProfileIndex !== 0) {
      setProfileImageIndices(prev => ({
        ...prev,
        [currentProfileIndex]: 0
      }));
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentProfileIndex, profileImageIndices, profileSwipe.containerRef]);

  // Update carousel position when profile or image index changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselSwipe.containerRef.current) {
        const imageIndex = profileImageIndices[currentProfileIndex] || 0;
        const carousel = carouselSwipe.containerRef.current;
        const imageHeight = carousel.offsetHeight;
        if (imageHeight > 0) {
          carousel.scrollTo({
            top: imageIndex * imageHeight,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [profileImageIndices, currentProfileIndex, carouselSwipe.containerRef]);

  // Track carousel scroll to update indicators
  useEffect(() => {
    const carousel = carouselSwipe.containerRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollTop = carousel.scrollTop;
      const imageHeight = carousel.offsetHeight;
      if (imageHeight === 0) return; // Prevent division by zero

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

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [profileImageIndices, images.length, currentProfileIndex, carouselSwipe.containerRef]);

  // Update details position when index changes
  useEffect(() => {
    const container = detailSwipe.containerRef.current;
    if (!container || details.length === 0) return;

    const itemWidth = container.scrollWidth / details.length;
    if (itemWidth > 0) {
      container.scrollTo({
        left: currentDetailIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [currentDetailIndex, details.length, detailSwipe.containerRef]);

  // Like/Dislike handlers
  const handleLike = useCallback(() => {
    // TODO: Implement like functionality with backend
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  }, [currentProfileIndex]);

  const handleDislike = useCallback(() => {
    // TODO: Implement dislike functionality with backend
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  }, [currentProfileIndex]);

  const handleWave = useCallback(() => {
    // TODO: Implement wave functionality with backend
    // Wave action - could open chat or send a wave notification
  }, []);


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
          <div 
            key={profileIndex} 
            className="profile-page"
            ref={isCurrentProfile ? profilePageRef : null}
          >
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
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
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

              {/* Like/Dislike/Wave Buttons */}
              <div className="action-buttons">
                <button 
                  className="action-button dislike-button" 
                  onClick={handleDislike}
                  aria-label={`Dislike ${profile.name}`}
                >
                  <span className="button-icon" aria-hidden="true">×</span>
                </button>
                <button 
                  className="action-button wave-button" 
                  onClick={handleWave}
                  aria-label={`Wave at ${profile.name}`}
                >
                  <WavingHandIcon className="button-icon" fillColor="#FFFFFF" strokeColor="#FFFFFF" strokeWidth={2.10} />
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

            {/* Colored Accent Bar with Name and Details */}
            <div className="profile-accent-bar">
              <h1 className="profile-name-accent">{profile.name}</h1>
              <div className="details-accent">
                {profile.details[0]}
              </div>
            </div>

            <div className="profile-content">
              {/* Name - Hidden on mobile, shown on desktop */}
              <h1 className="profile-name profile-name-desktop">{profile.name}</h1>

              {/* Swipeable Details Row - Hidden on mobile, shown on desktop */}
              <div 
                className="details-row details-row-desktop"
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
