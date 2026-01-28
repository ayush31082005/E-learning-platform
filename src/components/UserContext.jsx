// src/context/UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Ayush Chaubey",
    email: "ayush@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "I am passionate about learning new skills and growing in the IT field.",
    phone: "+91 9876543210",
    city: "Varanasi",
    courses: 12,
    certificates: 5,
    progress: 72
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
