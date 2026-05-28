import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("octocat");

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch User Profile
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("User Not Found");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    return () => controller.abort();
  }, [username]);

  // Fetch Repositories
  useEffect(() => {
    if (activeTab !== "repositories") return;

    const controller = new AbortController();

    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRepos();

    return () => controller.abort();
  }, [activeTab, username]);

  // Fetch Followers
  useEffect(() => {
    if (activeTab !== "followers") return;

    const controller = new AbortController();

    async function fetchFollowers() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/followers`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();
        setFollowers(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchFollowers();

    return () => controller.abort();
  }, [activeTab, username]);

  const handleSearch = () => {
    if (search.trim() !== "") {
      setUsername(search);
    }
  };

  return (
    <div className="app">
      <h1 className="title">
        Assignment 2: User Profile with Tabs & Persistent Scroll
      </h1>

      <div className="underline"></div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <h2 className="message">Loading...</h2>}

      {error && <h2 className="error">{error}</h2>}

      {user && (
        <>
          {/* Profile Card */}
          <div className="profile-card">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="avatar"
            />

            <h2>{user.name}</h2>

            <p className="bio">
              {user.bio || "No bio available"}
            </p>

            <div className="stats">
              <div>
                <h3>{user.followers}</h3>
                <p>Followers</p>
              </div>

              <div>
                <h3>{user.public_repos}</h3>
                <p>Repositories</p>
              </div>

              <div>
                <h3>{user.following}</h3>
                <p>Following</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>

            <button
              className={activeTab === "repositories" ? "active" : ""}
              onClick={() => setActiveTab("repositories")}
            >
              Repositories
            </button>

            <button
              className={activeTab === "followers" ? "active" : ""}
              onClick={() => setActiveTab("followers")}
            >
              Followers
            </button>
          </div>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="content-card">
              <h2>Profile Overview</h2>

              <p>
                <strong>Username:</strong> {user.login}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {user.location || "Not Available"}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {user.company || "Not Available"}
              </p>

              <p>
                <strong>Blog:</strong>{" "}
                {user.blog || "Not Available"}
              </p>
            </div>
          )}

          {/* Repositories */}
          {activeTab === "repositories" && (
            <div className="repo-container">
              {repos.map((repo) => (
                <div className="repo-card" key={repo.id}>
                  <h3>{repo.name}</h3>

                  <p>
                    {repo.description ||
                      "No description available"}
                  </p>

                  <div className="repo-details">
                    <span>⭐ {repo.stargazers_count}</span>

                    <span>{repo.language}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Followers */}
          {activeTab === "followers" && (
            <div className="followers-container">
              {followers.map((follower) => (
                <div className="follower-card" key={follower.id}>
                  <img
                    src={follower.avatar_url}
                    alt={follower.login}
                  />

                  <p>{follower.login}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;