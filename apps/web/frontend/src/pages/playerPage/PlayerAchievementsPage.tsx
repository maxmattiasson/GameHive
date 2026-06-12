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
  const { id: slug } = useParams();
  const id = slug?.match(/[0-9a-f]{24}$/i)?.[0];

  const visitedAchievements = useUserAchievements(id);
  const userAchievementIds = id
    ? visitedAchievements.data.map((a) => a._id)
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

  if (loading) return <p className={styles.empty}>Loading...</p>;

  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.heading}>Achievements</h2>
        <p className={styles.intro}>Gloat on your accomplishments so far!</p>
      </div>

      {unlockedAchievements.length === 0 ? (
        <p className={styles.empty}>No achievements unlocked yet.</p>
      ) : (
        <div className={styles.grid}>
          {unlockedAchievements.map((ach) => (
            <InfoCard key={ach._id}>
              <h3>{ach.title}</h3>
              <p>{ach.description}</p>
            </InfoCard>
          ))}
        </div>
      )}

      {lockedAchievements.length > 0 && (
        <div>
          <h3 className={styles.subheading}>Achievements to strive for</h3>
          <ul className={styles.lockedList}>
            {lockedAchievements.map((ach) => (
              <li key={ach._id} className={styles.lockedItem}>
                <span className={styles.lockedIcon}>🔒</span>
                <span>
                  <strong>{ach.title}:</strong> {ach.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/profile" className={styles.backLink}>
        Back to profile
      </Link>
    </section>
  );
}
