import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function GameDetails() {
    const [gameDetails, setGameDetails] = useState({
        slug: "",
        title: "",
        description: "",
        thumbnail: "",
        uploadTimestamp: "",
        author: "",
        scoreCount: 0,
        gamePath: ""
    });
    const [scoreDetails, setScoreDetails] = useState([]);
    const [loadingScores, setLoadingScores] = useState(true);
    const navigate = useNavigate()
    const { slug } = useParams();
    const currentUser = localStorage.getItem('username')
    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/games/${slug}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setGameDetails(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch game details:", error);
            }
        };

        const fetchScoreDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/games/${slug}/scores`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // HAI
                if (response.status === 200) {
                    if (response.data.status === 'not-found') {
                        setScoreDetails([]);
                    } else {
                        setScoreDetails(response.data.scores);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch score details:", error);
            } finally {
                setLoadingScores(false);
            }
        };

        fetchGameDetails();
        fetchScoreDetails();
    }, [slug]);
    const getVersionFromPath = (path) => {
        const parts = path.split('versions/v');
        return parts[1] || "Unknown Version";
    };
    const addScore = async () => {
        // /games/{slug}/scores
        const token = localStorage.getItem('token')
        const score = Math.floor(Math.random() * 10000)
        await api.post(`/games/${slug}/scores`, {
            score: score
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    }
    const downloadGame = async () => {
        try {
            const token = localStorage.getItem('token');
            const versions = getVersionFromPath(gameDetails.gamePath);
            const response = await api.get(`/games/${slug}/${versions}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob' // 👈 Important: treat it as file
            });

            const blob = new Blob([response.data], { type: 'application/zip' });
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `game-${slug}-v${versions}.zip`; // Suggested filename
            document.body.appendChild(link);
            link.click();
            link.remove();

            addScore()
        } catch (error) {
            console.error("Failed to download game:", error);
        }
    };


    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-1">{gameDetails.title || "Loading..."}</h2>
                    <a href="profile.html" className="btn btn-success">
                        By {gameDetails.author || "Unknown"}
                    </a>
                    <div className="text-muted">
                        {gameDetails.description || "No description available."}
                    </div>
                    <h5 className="mt-2">
                        Last Versions V{getVersionFromPath(gameDetails.gamePath)} ({gameDetails.uploadTimestamp ? new Date(gameDetails.uploadTimestamp).toLocaleString() : "Unknown"})
                    </h5>
                </div>
            </div>

            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6">
                            <div className="row">
                                <div className="col">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5>Top Score</h5>
                                            {loadingScores ? (
                                                <p>Loading scores...</p>
                                            ) : scoreDetails.length === 0 ? (
                                                <p>No scores yet.</p>
                                            ) : (
                                                <ol>
                                                    {scoreDetails.map((score, index) => (
                                                        <li key={index} className={`${score.username === currentUser ? "fw-bold" : ""}`}>
                                                            {score.username} ({score.score})
                                                        </li>
                                                    ))}
                                                </ol>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <img
                                        src={gameDetails.thumbnail ? `http://localhost:8000/storage/${gameDetails.thumbnail}` : "http://localhost:8000/storage/thumbnail.png"}
                                        alt={`${gameDetails.title} Thumbnail`}
                                        style={{ width: "100%" }}
                                    />
                                    <button
                                        onClick={downloadGame}
                                        className="btn btn-primary w-100 mb-2 mt-2"
                                    >
                                        Download Game
                                    </button>
                                </div>
                            </div>

                            <button onClick={()=> navigate(-1)} className="btn btn-danger w-100">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default GameDetails;
