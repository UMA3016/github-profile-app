import profileImage from "../images/profile.png";
export const mockUser = {
  avatar_url: profileImage,
  name: "Umasri",
  bio: "React Developer",
  followers: 500,
  following: 120,
  public_repos: 15,
};

export const mockRepos = [
  {
    id: 1,
    name: "React Project",
    language: "JavaScript",
    stargazers_count: 120,
  },
  {
    id: 2,
    name: "Node API",
    language: "Node.js",
    stargazers_count: 80,
  },
  {
    id: 3,
    name: "Portfolio Website",
    language: "HTML/CSS",
    stargazers_count: 45,
  },
];

export const mockFollowers = [
  {
    id: 1,
    login: "manasa",
  },
  {
    id: 2,
    login: "sri",
  },
  {
    id: 3,
    login: "kavya",
  },
];