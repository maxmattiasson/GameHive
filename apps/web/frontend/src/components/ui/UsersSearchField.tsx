import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { User } from "../../types/user";
import Input from "./Input";
import styles from "./UsersSearchField.module.css";
import parentStyles from "../../pages/playerPage/PlayerFriendsPage.module.css";
import { Link } from "react-router-dom";
import { slugify } from "../../helpers/slugify";
import { API_BASE_URL } from "../../config/api";

const getUsers = async (query: string): Promise<User[]> => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/users/search?query=${encodeURIComponent(trimmedQuery)}`,
    );
    if (!response.ok) {
      return [];
    }

    return (await response.json()) as User[];
  } catch {
    return [];
  }
};

export default function UsersSearchField() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(async () => {
      const users = await getUsers(value);
      setResults(users);
    }, 200);
  };

  return (
    <>
      <Input
        type="search"
        name="userSearch"
        value={query}
        onChange={handleChange}
        placeholder="Search users"
        className={styles.searchField}
      />
      {results.length > 0 ? (
        <ul className={`${styles.resultsList} ${parentStyles.card}`}>
          {results.map((user) => (
            <li key={user._id}>
              <Link to={`/users/${slugify(user.username)}-${user._id}`}>
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
