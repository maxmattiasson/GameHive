import React, { useEffect, useState } from "react";
import styles from "./CreateGameForm.module.css"
import getGenres from "../../../services/genreService";
import type { Genre } from "../../../types/genre";

export default function CreateGameForm(){
    const [title, setTitle] = useState("")
    const [release, setRelease] = useState("")
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [multiplayer, setMultiplayer] = useState(false);
    const [desc, setDesc] = useState("");
    const [genreList, setGenreList] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newGame = {
          title,
          release,
          desc,
          genres: selectedGenres,
          platforms,
          multiplayer,
        };
      
        try {
          const res = await fetch("http://localhost:3000/api/games", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newGame),
          });
      
          if (!res.ok) {
            throw new Error("Failed to create game");
          }
      
          const data = await res.json();
          console.log("Created game", data);
      
          setTitle("");
          setDesc("");
          setRelease("");
          setSelectedGenres([]);
          setPlatforms([]);
          setMultiplayer(false);
        } catch (err) {
          console.error(err);
        }
      };


    useEffect(() => { 
        const loadGenres = async () => {
            try {
                const data = await getGenres();
                setGenreList(data)
            } catch (err) {
                console.error(err)
            }
        };

        loadGenres();  
    }, [])

    const options = ["PC", "PS5", "Xbox"];

    return (
        <>
            <form className={styles.devUploadForm} onSubmit={handleSubmit}>
                <h3>Upload game</h3>
                <label>
                    <span>Title</span>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </label>
                <label>
                    <span>Release date</span>
                    <input
                        type="date"
                        name="release"
                        value={release}
                        onChange={(e) => setRelease(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>Game description</span>
                    <textarea className={styles.textArea} value={desc} onChange={(e) => setDesc(e.target.value)} />
                </label>
                <label>
                    <span>Multiplayer</span> 
                <input
                    type="checkbox"
                    checked={multiplayer}
                    onChange={(e) => setMultiplayer(e.target.checked)}
                    />
                    </label>
                {options.map((platform) => (
                <label key={platform}>
                   <span>{platform}</span> 
                    <input
                    type="checkbox"
                    value={platform}
                    checked={platforms.includes(platform)}
                    onChange={(e) => {
                        if (e.target.checked) {
                        setPlatforms([...platforms, platform]);
                        } else {
                        setPlatforms(platforms.filter(p => p !== platform));
                        }
                    }}
                    />
                </label>
                ))}
                {genreList.map((genre) => (
                    <label key={genre._id} className={styles.genreList}>
                        <span>{genre.name}</span>
                        <input className={styles.genreInput} 
                        type="checkbox"
                         value={genre._id}
                         checked={selectedGenres.includes(genre._id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                setSelectedGenres([...selectedGenres, genre._id]);
                                } else {
                                setSelectedGenres(selectedGenres.filter((id) => id !== genre._id));
                                }
                            }}
                            />
                        </label>
                        ))}
                        <button type="submit">Submit</button>
            </form>
        </>
    )
}