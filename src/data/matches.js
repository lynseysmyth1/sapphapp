import person1 from '../../uploaded_images/person1.jpg';
import person2 from '../../uploaded_images/Person2.png';
import person3 from '../../uploaded_images/Person3.png';
import person7 from '../../uploaded_images/Person7.png';

export const matches = [
  {
    id: 1,
    name: 'Katie',
    image: person1,
    lastMessage: "Hey! How's your week going?",
    timestamp: '2h ago',
    unread: 2,
    messages: [
      { 
        id: 1, 
        text: "Hey! I saw we matched - love your profile! Especially the David Lynch reference 😊", 
        sender: 'them', 
        time: 'Mon 10:30 AM' 
      },
      { 
        id: 2, 
        text: "Thank you! I'm a huge fan of his work. Have you seen Twin Peaks?", 
        sender: 'me', 
        time: 'Mon 11:15 AM' 
      },
      { 
        id: 3, 
        text: "Yes! The original series is incredible. What's your favorite episode?", 
        sender: 'them', 
        time: 'Mon 2:45 PM' 
      },
      { 
        id: 4, 
        text: "Definitely the pilot episode - it sets the tone so perfectly. Are you into any other dystopian shows?", 
        sender: 'me', 
        time: 'Mon 3:20 PM' 
      },
      { 
        id: 5, 
        text: "Hey! How's your week going?", 
        sender: 'them', 
        time: '2h ago' 
      }
    ]
  },
  {
    id: 2,
    name: 'Sarah',
    image: person2,
    lastMessage: "That sounds amazing! I'd love to hear more about it",
    timestamp: '1d ago',
    unread: 0,
    messages: [
      { 
        id: 1, 
        text: "Hi Sarah! I noticed you're into travel - where's the most interesting place you've been recently?", 
        sender: 'me', 
        time: 'Sun 2:00 PM' 
      },
      { 
        id: 2, 
        text: "Hey! I just got back from a trip to Portugal - the food scene in Lisbon is incredible!", 
        sender: 'them', 
        time: 'Sun 4:30 PM' 
      },
      { 
        id: 3, 
        text: "Oh wow, that sounds amazing! I've been wanting to visit Portugal. Any must-try restaurants?", 
        sender: 'me', 
        time: 'Sun 5:00 PM' 
      },
      { 
        id: 4, 
        text: "Absolutely! There's this amazing place in Alfama that does the best pastéis de nata. I can send you the details if you'd like?", 
        sender: 'them', 
        time: 'Sun 6:15 PM' 
      },
      { 
        id: 5, 
        text: "That sounds amazing! I'd love to hear more about it", 
        sender: 'me', 
        time: '1d ago' 
      }
    ]
  },
  {
    id: 3,
    name: 'Emma',
    image: person3,
    lastMessage: "I'd love to join you for a beach walk sometime!",
    timestamp: '3d ago',
    unread: 1,
    messages: [
      { 
        id: 1, 
        text: "Hi Emma! Your bio about sustainability really resonates with me. What got you into it?", 
        sender: 'me', 
        time: 'Fri 9:00 AM' 
      },
      { 
        id: 2, 
        text: "Hey! Thanks for reaching out. I've always been passionate about the environment, but living by the beach really made me see the impact of pollution firsthand.", 
        sender: 'them', 
        time: 'Fri 11:30 AM' 
      },
      { 
        id: 3, 
        text: "That makes so much sense. Do you do any beach cleanups or volunteer work?", 
        sender: 'me', 
        time: 'Fri 2:00 PM' 
      },
      { 
        id: 4, 
        text: "Yes! I organize monthly cleanups with a local group. You should come along sometime - it's actually really fun and we usually grab coffee after!", 
        sender: 'them', 
        time: 'Fri 4:45 PM' 
      },
      { 
        id: 5, 
        text: "I'd love to join you for a beach walk sometime!", 
        sender: 'me', 
        time: '3d ago' 
      }
    ]
  },
  {
    id: 4,
    name: 'Sam',
    image: person7,
    lastMessage: "That sounds great! Let me know when you're free",
    timestamp: '5d ago',
    unread: 0,
    messages: [
      { 
        id: 1, 
        text: "Hey Sam! I saw you're into music - what kind of gigs do you usually go to?", 
        sender: 'me', 
        time: 'Mon 1:00 PM' 
      },
      { 
        id: 2, 
        text: "Hey! I love indie and alternative rock mostly. There's this great venue in South London that has amazing local bands!", 
        sender: 'them', 
        time: 'Mon 3:30 PM' 
      },
      { 
        id: 3, 
        text: "That sounds awesome! I'd love to check it out sometime. Are you going to any shows soon?", 
        sender: 'me', 
        time: 'Mon 4:00 PM' 
      },
      { 
        id: 4, 
        text: "Yes! There's a band playing this weekend that I'm really excited about. Want to join? It's going to be a great night!", 
        sender: 'them', 
        time: 'Mon 5:15 PM' 
      },
      { 
        id: 5, 
        text: "That sounds great! Let me know when you're free", 
        sender: 'me', 
        time: '5d ago' 
      }
    ]
  }
];

