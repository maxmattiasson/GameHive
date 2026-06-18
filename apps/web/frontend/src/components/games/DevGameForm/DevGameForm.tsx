import React, { useEffect, useState } from "react";
import styles from "./DevGameForm.module.css";
import getGenres from "../../../services/genreService";
import type { Genre } from "../../../types/genre";
import type { Game } from "../../../types/game";
import { createGame, updateGame } from "../../../services/gameService";
import Button from "../../ui/Button";

type Props = {
  selectedGame: Game | null;
  onSuccess: (savedGame: Game) => void;
};

export default function DevGameForm({ selectedGame, onSuccess }: Props) {
  const [title, setTitle] = useState(selectedGame?.title ?? "");
  const [release, setRelease] = useState(
    selectedGame?.release
      ? new Date(selectedGame.release).toISOString().slice(0, 10)
      : "",
  );
  const [platforms, setPlatforms] = useState(selectedGame?.platforms ?? []);
  const [multiplayer, setMultiplayer] = useState(
    selectedGame?.multiplayer ?? false,
  );
  const [desc, setDesc] = useState(selectedGame?.desc ?? "");
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [thumb, setThumb] = useState(selectedGame?.thumb ?? "");
  const [selectedGenres, setSelectedGenres] = useState(
    selectedGame?.genres.map((g) => g._id) ?? [],
  );

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGame = {
      title,
      release,
      desc,
      genres: selectedGenres,
      platforms,
      multiplayer,
      thumb,
    };
    try {
      const result = selectedGame
        ? await updateGame(selectedGame._id, newGame)
        : await createGame(newGame);
      onSuccess?.(result);
      // if (selectedGame) {
      //   await updateGame(selectedGame._id, newGame);
      // } else {
      //   await createGame(newGame);
      //   onSuccess();
      // }
      setTitle("");
      setDesc("");
      setRelease("");
      setSelectedGenres([]);
      setPlatforms([]);
      setMultiplayer(false);
      setThumb("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres();
        setGenreList(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadGenres();
  }, []);

  const platformOptions = ["PC", "PS5", "Xbox"];

  return (
    <form className={styles.devUploadForm} onSubmit={handleSubmit}>
      <h3>{selectedGame ? "Edit game" : "Upload game"}</h3>

      <label className={styles.field}>
        <span>Title</span>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Release date</span>
        <input
          className={styles.input}
          type="date"
          value={release}
          onChange={(e) => setRelease(e.target.value)}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Description</span>
        <textarea
          className={styles.textArea}
          minLength={20}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span>Thumbnail URL</span>
        <input
          className={styles.input}
          type="text"
          value={thumb}
          onChange={(e) => setThumb(e.target.value)}
        />
      </label>

      <div className={styles.field}>
        <span className={styles.sectionLabel}>Platforms</span>
        <div className={styles.platformGroup}>
          {platformOptions.map((platform) => (
            <label key={platform} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={platform}
                checked={platforms.includes(platform)}
                onChange={(e) => {
                  if (e.target.checked) setPlatforms([...platforms, platform]);
                  else setPlatforms(platforms.filter((p) => p !== platform));
                }}
              />
              {platform}
            </label>
          ))}
        </div>
      </div>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={multiplayer}
          onChange={(e) => setMultiplayer(e.target.checked)}
        />
        Multiplayer
      </label>

      <div className={styles.field}>
        <span className={styles.sectionLabel}>Genres</span>
        <div className={styles.genreGroup}>
          {genreList.map((genre) => (
            <label key={genre._id} className={styles.genreLabel}>
              <input
                className={styles.genreInput}
                type="checkbox"
                value={genre._id}
                checked={selectedGenres.includes(genre._id)}
                onChange={(e) => {
                  if (e.target.checked)
                    setSelectedGenres([...selectedGenres, genre._id]);
                  else
                    setSelectedGenres(
                      selectedGenres.filter((id) => id !== genre._id),
                    );
                }}
              />
              {genre.name}
            </label>
          ))}
        </div>
      </div>

      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
