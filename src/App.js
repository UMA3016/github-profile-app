import { useState } from "react";
import {
  mockUser,
  mockRepos,
  mockFollowers,
} from "./utils/mockData";
import "./App.css";
function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user] = useState(mockUser);
  const [repos] = useState(mockRepos);
  const [followers] = useState(mockFollowers);
  return (
    <div className="container" align="center">
  <h1>GitHub Profile App</h1>
      <div className="tabs">
      <button onClick={() => setActiveTab("overview")}>
          Overview
        </button>
          <button onClick={() => setActiveTab("repos")}>
          Repositories
        </button>
        <button onClick={() => setActiveTab("followers")}>
          Followers
        </button>
     </div>
      {activeTab === "overview" && (
    <div className="card">
        <img
            src={user.avatar_url}
            alt="profile"
            width="150"
          />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>

          <p>
            Followers: {user.followers}
          </p>

          <p>
            Following: {user.following}
          </p>

          <p>
            Public Repositories: {user.public_repos}
          </p>

        </div>

      )}
      {activeTab === "repos" && (
      <div>
        {repos.map((repo) => (
          <div
              key={repo.id}
              className="repo-card"
            >

              <h3>{repo.name}</h3>

              <p>
                Language: {repo.language}
              </p>

              <p>
                ⭐ Stars: {repo.stargazers_count}
              </p>

            </div>

          ))}

        </div>

      )}
      {activeTab === "followers" && (
      <div>
          {followers.map((follower) => (
          <div
              key={follower.id}
              className="follower-card"
            >
            <p>{follower.login}</p>

            </div>
            ))}

        </div>

      )}

    </div>
  );
}

export default App;