const dummyUsers = [
  {
    name: "Alice",
    fullName: "Dr. Alice Johnson",
    color: "#4f46e5",
    role: "Lead Researcher"
  },
  {
    name: "Bob",
    fullName: "Prof. Bob Smith",
    color: "#16a34a",
    role: "Co-Researcher"
  },
  
  {
    name: "David",
    fullName: "Dr. David Brown",
    color: "#9333ea",
    role: "Collaborator"
  },
  {
    name: "Eve",
    fullName: "Dr. Eve Davis",
    color: "#ea580c",
    role: "Guest Researcher"
  }
];

let currentIndex = 0;

export const getNextDummyUser = () => {
  const user = dummyUsers[currentIndex];
  currentIndex = (currentIndex + 1) % dummyUsers.length;
  return user;
};
