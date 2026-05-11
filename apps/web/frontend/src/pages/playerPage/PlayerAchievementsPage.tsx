import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getAllAchievements } from "../../services/achievementsService";
import type { Achievement } from "../../types/achievements";
import { useUserAchievements } from "../../hooks/useUserAchievements";
import { InfoCard } from "../../components/ui/InfoCard";
import styles from "./PlayerAchievementsPage.module.css";

export function PlayerachievementsPage() {
  const { user } = useAuth();

  const { id } = useParams();
  const visitedAchievements = useUserAchievements(id);
  const userAchievementIds = id
    ? visitedAchievements.data.map((a) => a._id) // get every achievement id from visited user
    : (user?.userAchievements ?? []);

  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAllAchievements();
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const unlockedAchievements = achievements.filter((ach) =>
    userAchievementIds.includes(ach._id),
  );

  const lockedAchievements = achievements.filter(
    (ach) => !userAchievementIds.includes(ach._id),
  );

  return (
    <section>
      <h2>Achievements</h2>
      <p>Gloat on your accomplishments so far!</p>

      {loading ? <p>Loading...</p> : null}

      <div className={styles.gridContainer}>
        {user?.userAchievements &&
          unlockedAchievements.map((ach) => (
            <InfoCard key={ach._id}>
              <h3>{ach.title}</h3>
              <p>{ach.description}</p>
            </InfoCard>
          ))}
      </div>

      <h3>Achievements to strive for:</h3>
      <ul>
        {lockedAchievements.map((ach) => (
          <li key={ach._id}>
            <strong>{ach.title}:</strong> {ach.description}
          </li>
        ))}
      </ul>
      <Link to="/profile">Back to profile</Link>
    </section>
  );
}
