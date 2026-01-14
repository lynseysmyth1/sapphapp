import React, { useState, useRef } from 'react';
import './ProfilePage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { profiles } from '../data/profiles';
import { HeartIcon } from './shared/Icons';
import { useHorizontalSwipe } from '../utils/useSwipeHandlers';

export default function ProfilePage() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profileImageIndices, setProfileImageIndices] = useState({});
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
  const profilesSwiperRef = useRef(null);

  const currentProfile = profiles[currentProfileIndex];
  const details = currentProfile.details;

  // Details swipe handlers
  const detailSwipe = useHorizontalSwipe((newIndex) => {
    setCurrentDetailIndex(Math.max(0, Math.min(newIndex, details.length - 1)));
  });

  // Like/Dislike handlers
  const handleLike = () => {
    console.log(`Profile ${currentProfile.name} liked`);
    if (profilesSwiperRef.current && currentProfileIndex < profiles.length - 1) {
      profilesSwiperRef.current.slideNext();
    }
  };

  const handleDislike = () => {
    console.log(`Profile ${currentProfile.name} disliked`);
    if (profilesSwiperRef.current && currentProfileIndex < profiles.length - 1) {
      profilesSwiperRef.current.slideNext();
    }
  };

  return (
    <Swiper
      direction="horizontal"
      className="profiles-swiper"
      slidesPerView={1}
      spaceBetween={0}
      allowTouchMove={true}
      preventClicks={true}
      preventClicksPropagation={true}
      touchStartPreventDefault={true}
      touchMoveStopPropagation={false}
      resistance={true}
      resistanceRatio={0.85}
      onSwiper={(swiper) => {
        profilesSwiperRef.current = swiper;
      }}
      onSlideChange={(swiper) => {
        setCurrentProfileIndex(swiper.activeIndex);
      }}
      initialSlide={currentProfileIndex}
    >
      {profiles.map((profile, profileIndex) => {
        const isCurrentProfile = profileIndex === currentProfileIndex;
        const profileImageIndex = profileImageIndices[profileIndex] || 0;
        
        return (
          <SwiperSlide key={profileIndex} className="profile-slide">
            <div className="profile-page">
            {/* Image Carousel */}
            <div className="carousel-wrapper">
              <Swiper
                direction="vertical"
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="image-swiper"
                allowTouchMove={true}
                preventClicks={true}
                preventClicksPropagation={true}
                touchStartPreventDefault={true}
                touchMoveStopPropagation={false}
                resistance={true}
                resistanceRatio={0.85}
                initialSlide={profileImageIndex}
                onSlideChange={(swiper) => {
                  const nextIndex = swiper.activeIndex;
                  setProfileImageIndices(prev => ({
                    ...prev,
                    [profileIndex]: nextIndex
                  }));
                }}
              >
                {profile.images.map((image, index) => (
                  <SwiperSlide key={index} className="image-slide">
                    <img
                      src={image}
                      alt={`${profile.name} ${index + 1}`}
                      className="carousel-image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

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
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
