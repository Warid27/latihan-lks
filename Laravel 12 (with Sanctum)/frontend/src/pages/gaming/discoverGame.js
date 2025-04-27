import { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function DiscoverGames() {
    const [listGame, setListGame] = useState([]);
    const [tableData, setTableData] = useState({
        isLastPage: true,
        page: 0,
        pageCount: 1,
        size: 10,
        totalElements: "",
    });
    const [filters, setFilters] = useState({
        sortBy: 'title',
        sortDir: 'asc',
        page: 0,
        size: 100,
    });
    const navigate = useNavigate()
    useEffect(() => {
        const fetchListGame = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found!");
                return; // Stop if no token is available
            }

            try {
                const response = await api.get('games', {
                    params: {
                        sortBy: filters.sortBy,
                        sortDir: filters.sortDir,
                        page: filters.page,
                        size: filters.size,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTableData({
                    isLastPage: response.data.isLastPage,
                    page: response.data.page,
                    pageCount: response.data.pageCount,
                    size: response.data.size,
                    totalElements: response.data.totalElements,
                });

                setListGame(response.data.content);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchListGame();
    }, [filters]); 

    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h1>Discover Games</h1>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="mb-3">{tableData.totalElements} Games Available</h2>
                        </div>

                        <div className="col-lg-8" style={{ textAlign: 'right' }}>
                            <div className="mb-3">
                                <div className="btn-group" role="group">
                                    <button type="button" onClick={() => setFilters({
                                        ...filters,
                                        sortBy: 'popular'
                                    })} className={`btn ${filters.sortBy === 'popular' ? "btn-secondary" : "btn-outline-primary"} `}>Popularity</button>
                                    <button type="button" onClick={() => setFilters({
                                        ...filters,
                                        sortBy: 'uploaddate'
                                    })} className={`btn ${filters.sortBy === 'uploaddate' ? "btn-secondary" : "btn-outline-primary"} `}>Recently Updated</button>
                                    <button type="button" onClick={() => setFilters({
                                        ...filters,
                                        sortBy: 'title'
                                    })} className={`btn ${filters.sortBy === 'title' ? "btn-secondary" : "btn-outline-primary"} `}>Alphabetically</button>
                                </div>

                                <div className="btn-group" role="group">
                                    <button type="button" onClick={() => setFilters({
                                        ...filters,
                                        sortDir: 'asc'
                                    })} className={`btn ${filters.sortDir === 'asc' ? "btn-secondary" : "btn-outline-primary"}`}>ASC</button>
                                    <button type="button" onClick={() => setFilters({
                                        ...filters,
                                        sortDir: 'desc'
                                    })} className={`btn ${filters.sortDir === 'desc' ? "btn-secondary" : "btn-outline-primary"}`}>DESC</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {listGame.map((game) => (
                            <div className="col-md-6" key={game.slug}>
                                <button onClick={() => navigate(`/gaming/details/${game.slug}`)} className="cursor-pointer card card-default mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <img src={game.thumbnail ? `http://localhost:8000/storage/${game.thumbnail}` : "http://localhost:8000/storage/thumbnail.png"} alt={`${game.title} Logo`} className="w-100" />
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1">{game.title} <small className="text-muted">By {game.author}</small></h5>
                                                <p>{game.description}</p>
                                                <hr className="mt-1 mb-1" />
                                                <div className="text-muted">#scores submitted: {game.scoreCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DiscoverGames;
