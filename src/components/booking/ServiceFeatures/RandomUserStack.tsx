import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface RandomUser {
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  name: {
    first: string;
    last: string;
  };
}

interface ApiResponse {
  results: RandomUser[];
}

const UserAvatarStack: React.FC = () => {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://randomuser.me/api/?results=3");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: ApiResponse = await response.json();
        setUsers(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className={styles.image_stack_container}>
        {[1, 2, 3].map((index) => (
          <div key={index} className={styles.loading_placeholder} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.image_stack_container}>
        <span className={styles.error_text}>Failed to load users</span>
      </div>
    );
  }

  return (
    <div className={styles.image_stack_container}>
      {users.map((user, index) => (
        <img
          key={index}
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default UserAvatarStack;
