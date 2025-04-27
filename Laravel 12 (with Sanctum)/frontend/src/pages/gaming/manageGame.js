import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

function ManageGame() {
    const [listGame, setListGame] = useState([]);

    const navigate = useNavigate()
    useEffect(() => {
        const fetchListGame = async () => {
            const token = localStorage.getItem('token');
            const currentUser = localStorage.getItem('username');
            if (!token) {
                console.error("Token not found!");
                return;
            }

            try {
                const response = await api.get('games', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const filteredGames = response.data.content.filter(
                    (game) => game.author === currentUser
                );

                setListGame(filteredGames);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };


        fetchListGame();
    }, []);
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container">
                    <button onClick={() => navigate("create")} className="btn btn-primary">
                        Add Game
                    </button>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Games</h6>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th width="100">Thumbnail</th>
                                <th width="200">Title</th>
                                <th width="500">Description</th>
                                <th width="180">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listGame.length > 0 ? (
                                listGame.map((game) => (
                                    <tr key={game.slug}>
                                        <td>
                                            <img
                                                src={`http://localhost:8000/storage/${game.thumbnail}`}
                                                alt={`${game.title} Thumbnail`}
                                                style={{ width: '100%' }}
                                            />
                                        </td>
                                        <td>{game.title}</td>
                                        <td>{game.description}</td>
                                        <td>
                                            <button onClick={() => navigate(`/gaming/details/${game.slug}`)} className="btn btn-sm btn-primary">Detail</button>{' '}
                                            <button onClick={() => navigate(`/gaming/manage/edit/${game.slug}`)} className="btn btn-sm btn-secondary">Update</button>{' '}
                                            <button className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No games found. Go create something awesome!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>



                </div>
            </div>
        </main>
    );
}

export default ManageGame;
