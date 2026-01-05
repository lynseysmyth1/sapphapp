import person1 from '../../uploaded_images/person1.jpg';
import person2 from '../../uploaded_images/Person2.png';
import person3 from '../../uploaded_images/Person3.png';
import person4 from '../../uploaded_images/Person4.png';
import person5 from '../../uploaded_images/Person5.png';
import person6 from '../../uploaded_images/Person6.png';
import person7 from '../../uploaded_images/Person7.png';
import person8 from '../../uploaded_images/person8.png';
import person9 from '../../uploaded_images/person9.png';
import person10 from '../../uploaded_images/person10.png';
import person11 from '../../uploaded_images/person11.png';
import person12 from '../../uploaded_images/person12.png';
import person13 from '../../uploaded_images/person13.png';
import person14 from '../../uploaded_images/person14.png';
import person15 from '../../uploaded_images/person15.png';
import person16 from '../../uploaded_images/person16.png';
import person17 from '../../uploaded_images/person17.png';
import person18 from '../../uploaded_images/person18.png';
import person19 from '../../uploaded_images/person19.png';
import image1 from '../../uploaded_images/image1.jpg';
import nature1 from '../../uploaded_images/nature1.png';
import nature2 from '../../uploaded_images/nature2.png';
import nature3 from '../../uploaded_images/nature3.png';
import nature4 from '../../uploaded_images/nature4.png';

const baseProfiles = [
  {
    name: 'Katie',
    images: [person1, nature1, nature2, nature3, nature4],
    details: ["29 | Woman | Lesbian | Tomboy | 5'5\" | London"],
    lookingFor: 'Long term relationship | Friends',
    bio: "East London based, looking to make new friends and maybe find my soulmate too. Let's survive winter together x",
    conversationStarter: 'Ask me about mescal cocktails, dystopian tv or David Lynch if you want a good opener!',
    interests: 'Photography, cooking, dancing, F1, Football, Netball, Cocktail making, nature'
  },
  {
    name: 'Sarah',
    images: [person2, nature1, nature2, nature3, nature4],
    details: ["27 | Woman | Bisexual | Femme | 5'7\" | Manchester"],
    lookingFor: 'Short term | Long term relationship',
    bio: "Manchester local, love exploring new places and meeting interesting people. Always up for a good conversation!",
    conversationStarter: 'Tell me about your favorite travel destination or the best book you\'ve read recently!',
    interests: 'Travel, reading, yoga, hiking, coffee, art galleries, live music'
  },
  {
    name: 'Emma',
    images: [person3, nature1, nature2, nature3, nature4],
    details: ["31 | Woman | Lesbian | Androgynous | 5'4\" | Brighton"],
    lookingFor: 'Friends | Long term relationship',
    bio: "Brighton beach lover, passionate about sustainability and making the world a better place. Let's connect!",
    conversationStarter: 'What\'s your favorite way to spend a Sunday morning? I love a good brunch!',
    interests: 'Sustainability, vegan cooking, beach walks, cycling, podcasts, activism'
  },
  {
    name: 'Jess',
    images: [person4, nature1, nature2, nature3, nature4],
    details: ["25 | Woman | Queer | Soft butch | 5'6\" | Edinburgh"],
    lookingFor: 'Long term relationship',
    bio: "Edinburgh based artist and coffee enthusiast. Looking for someone to share adventures and deep conversations with.",
    conversationStarter: 'What\'s the most beautiful thing you\'ve seen this week? I\'d love to hear about it!',
    interests: 'Art, coffee, hiking, indie music, film photography, poetry, vintage shopping'
  },
  {
    name: 'Alex',
    images: [person5, nature1, nature2, nature3, nature4],
    details: ["28 | Woman | Lesbian | Chapstick | 5'8\" | Bristol"],
    lookingFor: 'Friends | Short term | Long term relationship',
    bio: "Bristol local, love good food and great company. Always down for a spontaneous adventure or a cozy night in.",
    conversationStarter: 'What\'s your go-to comfort food? Mine is definitely homemade pasta!',
    interests: 'Cooking, board games, rock climbing, craft beer, stand-up comedy, weekend markets'
  },
  {
    name: 'Maya',
    images: [person6, nature1, nature2, nature3, nature4],
    details: ["26 | Woman | Lesbian | Femme | 5'6\" | London"],
    lookingFor: 'Long term relationship',
    bio: "North London creative, working in fashion and always exploring the city's best spots. Love a good gallery opening or Sunday market stroll.",
    conversationStarter: 'What\'s your favorite London neighborhood? I\'m always discovering new hidden gems!',
    interests: 'Fashion, art galleries, brunch spots, vintage markets, indie cinema, rooftop bars, cycling'
  },
  {
    name: 'Sam',
    images: [person7, nature1, nature2, nature3, nature4],
    details: ["30 | Woman | Queer | Androgynous | 5'7\" | London"],
    lookingFor: 'Friends | Long term relationship',
    bio: "South London based musician and coffee addict. When I'm not in the studio, you'll find me at a gig or trying the latest brunch spot.",
    conversationStarter: 'What\'s the best gig you\'ve been to recently? Always looking for new music recommendations!',
    interests: 'Music, live gigs, coffee, vinyl collecting, brunch, street art, pub quizzes, cycling'
  },
  {
    name: 'Jordan',
    images: [image1, nature1, nature2, nature3, nature4],
    details: ["24 | Woman | Bisexual | Soft butch | 5'5\" | London"],
    lookingFor: 'Short term | Long term relationship',
    bio: "West London local, fitness enthusiast and foodie. Love trying new restaurants and staying active. Always up for a weekend adventure!",
    conversationStarter: 'What\'s your favorite workout or the best meal you\'ve had this week? Let\'s swap recommendations!',
    interests: 'Fitness, gym, running, food, restaurants, hiking, travel, podcasts, cooking'
  },
  {
    name: 'Riley',
    images: [person8, nature1, nature2, nature3, nature4],
    details: ["32 | Woman | Lesbian | Chapstick | 5'9\" | London"],
    lookingFor: 'Long term relationship | Friends',
    bio: "Central London professional by day, bookworm and wine enthusiast by night. Love deep conversations and discovering new bookshops.",
    conversationStarter: 'What\'s the last book that really moved you? I\'m always looking for my next great read!',
    interests: 'Reading, books, wine, bookshops, museums, theatre, dinner parties, philosophy, writing'
  },
  {
    name: 'Taylor',
    images: [person9, nature1, nature2, nature3, nature4],
    details: ["29 | Woman | Queer | Tomboy | 5'4\" | London"],
    lookingFor: 'Friends | Short term | Long term relationship',
    bio: "East London transplant, working in tech and passionate about queer culture. Love a good drag show or exploring the city's nightlife.",
    conversationStarter: 'What\'s your favorite queer space in London? Always looking to discover new spots!',
    interests: 'Tech, drag shows, queer culture, nightlife, coding, board games, comedy shows, street food'
  },
  {
    name: 'Morgan',
    images: [person10, nature1, nature2, nature3, nature4],
    details: ["27 | Woman | Lesbian | Femme | 5'7\" | London"],
    lookingFor: 'Long term relationship',
    bio: "West London based graphic designer, passionate about art and design. Love exploring galleries and finding inspiration in everyday moments.",
    conversationStarter: 'What\'s your favorite piece of art or design you\'ve seen recently? I\'m always looking for new inspiration!',
    interests: 'Graphic design, art, galleries, typography, photography, coffee shops, vintage fashion, cycling'
  },
  {
    name: 'Casey',
    images: [person11, nature1, nature2, nature3, nature4],
    details: ["25 | Woman | Bisexual | Androgynous | 5'6\" | London"],
    lookingFor: 'Short term | Long term relationship',
    bio: "North London local, working in marketing and always on the go. Love trying new restaurants and discovering hidden gems around the city.",
    conversationStarter: 'What\'s the best meal you\'ve had in London recently? Always looking for new restaurant recommendations!',
    interests: 'Marketing, food, restaurants, brunch, travel, podcasts, fitness, social media'
  },
  {
    name: 'Quinn',
    images: [person12, nature1, nature2, nature3, nature4],
    details: ["30 | Woman | Queer | Soft butch | 5'5\" | London"],
    lookingFor: 'Friends | Long term relationship',
    bio: "South London based yoga instructor and wellness enthusiast. Love early morning practices and finding balance in city life.",
    conversationStarter: 'What\'s your favorite way to unwind after a long day? I\'m always looking for new self-care tips!',
    interests: 'Yoga, wellness, meditation, healthy cooking, hiking, reading, tea, mindfulness'
  },
  {
    name: 'Avery',
    images: [person13, nature1, nature2, nature3, nature4],
    details: ["28 | Woman | Lesbian | Chapstick | 5'8\" | London"],
    lookingFor: 'Long term relationship | Friends',
    bio: "Central London professional, working in finance but passionate about music and live events. Love discovering new artists and venues.",
    conversationStarter: 'What\'s the best live show you\'ve been to this year? Always looking for new music recommendations!',
    interests: 'Music, live events, finance, cocktails, rooftop bars, networking, travel, podcasts'
  },
  {
    name: 'Blake',
    images: [person14, nature1, nature2, nature3, nature4],
    details: ["26 | Woman | Bisexual | Tomboy | 5'4\" | London"],
    lookingFor: 'Short term | Long term relationship',
    bio: "East London based photographer, capturing the city's energy and diversity. Love street photography and documenting everyday moments.",
    conversationStarter: 'What\'s the most interesting thing you\'ve photographed recently? I\'m always looking for new subjects!',
    interests: 'Photography, street art, exhibitions, coffee, walking, people watching, film, creativity'
  },
  {
    name: 'Dakota',
    images: [person15, nature1, nature2, nature3, nature4],
    details: ["31 | Woman | Lesbian | Femme | 5'9\" | London"],
    lookingFor: 'Long term relationship',
    bio: "North London based therapist, passionate about mental health and personal growth. Love deep conversations and helping others.",
    conversationStarter: 'What\'s something you\'ve learned about yourself recently? I love meaningful conversations!',
    interests: 'Therapy, mental health, psychology, reading, journaling, meditation, hiking, self-care'
  },
  {
    name: 'Sage',
    images: [person16, nature1, nature2, nature3, nature4],
    details: ["24 | Woman | Queer | Androgynous | 5'6\" | London"],
    lookingFor: 'Friends | Short term | Long term relationship',
    bio: "West London local, working in tech and passionate about sustainability. Love coding, gardening, and making a positive impact.",
    conversationStarter: 'What\'s your favorite sustainable practice? Always looking for new ways to reduce my environmental footprint!',
    interests: 'Tech, coding, sustainability, gardening, cycling, zero waste, climate action, plant-based cooking'
  },
  {
    name: 'River',
    images: [person17, nature1, nature2, nature3, nature4],
    details: ["29 | Woman | Lesbian | Soft butch | 5'7\" | London"],
    lookingFor: 'Long term relationship | Friends',
    bio: "South London based writer and poet, finding beauty in words and everyday moments. Love bookshops and quiet cafes.",
    conversationStarter: 'What\'s the last poem or piece of writing that moved you? I\'m always looking for new literary inspiration!',
    interests: 'Writing, poetry, books, bookshops, cafes, journaling, spoken word, literature'
  },
  {
    name: 'Phoenix',
    images: [person18, nature1, nature2, nature3, nature4],
    details: ["27 | Woman | Bisexual | Femme | 5'5\" | London"],
    lookingFor: 'Short term | Long term relationship',
    bio: "Central London based event planner, creating memorable experiences and bringing people together. Love organizing and making things happen.",
    conversationStarter: 'What\'s the best event or party you\'ve been to recently? Always looking for inspiration for my next project!',
    interests: 'Event planning, organizing, social events, networking, design, creativity, cocktails, celebrations'
  },
  {
    name: 'Skylar',
    images: [person19, nature1, nature2, nature3, nature4],
    details: ["32 | Woman | Queer | Chapstick | 5'8\" | London"],
    lookingFor: 'Long term relationship',
    bio: "East London based architect, designing spaces and thinking about how we live. Love modern design and urban planning.",
    conversationStarter: 'What\'s your favorite building or space in London? I love discussing architecture and design!',
    interests: 'Architecture, design, urban planning, art, exhibitions, coffee, sketching, city walks'
  }
];

export const profiles = baseProfiles;

export const likedProfiles = baseProfiles.map((profile, index) => ({
  id: index + 1,
  ...profile,
  image: profile.images[0],
  matchedDate: ['2 days ago', '5 days ago', '1 week ago', '3 days ago', '4 days ago', '1 day ago', '6 days ago', '3 days ago', '2 weeks ago', '1 week ago', '5 days ago', '4 days ago', '1 week ago', '6 days ago', '2 days ago', '1 week ago', '3 days ago', '5 days ago', '4 days ago', '1 week ago'][index] || 'Recently'
})).reverse();

