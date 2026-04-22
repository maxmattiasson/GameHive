import type { Game } from "../../../types/game";
import { useState } from "react";
import styles from "./CreateGameForm.module.css"

export default function CreateGameForm(){
    const [title, setTitle] = useState("")
    const [release, setRelease] = useState("")
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [multiplayer, setMultiplayer] = useState(false);

    const options = ["PC", "PS5", "Xbox"];

    return (
        <>
            <form className={styles.devUploadForm}>
                <h3>Upload game</h3>
                {/* export interface Game {
                  _id: string;
                  title: string;
                  release: Date;
                  dev: string;
                  genres: Genre[];
                  platforms: string[];
                  desc: string;
                  thumb: string;
                  multiplayer: boolean;
                  avg_rating: number;
                  review: any[];
                } */}
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <label>Release date
                <input
                    type="date"
                    name="release"
                    value={release}
                    onChange={(e) => setRelease(e.target.value)}
                    required
                />
                </label>
                <label>Multiplayer
                <input
                    type="checkbox"
                    checked={multiplayer}
                    onChange={(e) => setMultiplayer(e.target.checked)}
                    />
                    </label>
                {options.map((platform) => (
                <label key={platform}>
                    {platform}
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
                        <button type="submit">Submit</button>
            </form>
        </>
    )
}