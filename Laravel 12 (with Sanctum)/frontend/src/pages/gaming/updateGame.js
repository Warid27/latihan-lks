import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateGame() {
    const navigate = useNavigate();
    
    const { slug } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [game, setGame] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Important!
        const token = localStorage.getItem('token');
        try {
            const reqBody = { title, description };
            const response = await api.post("games", reqBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                setTimeout(async () => {
                    await handleUpload(response.data.slug);
                    navigate("/gaming/manage");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            // Add error handling here if you want
        }
    };

    const handleUpload = async (slug) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();


        if (thumbnail) formData.append('thumbnail', thumbnail);
        if (game) formData.append('zipfile', game);
        // if (token) formData.append("token", token);
        try {
            await api.post(`/games/${slug}/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error(error);
            // Error handling here too
        }
    };

    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-3">Manage Games - Gaming Portal</h2>
                </div>
            </div>

            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6">
                            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                                {/* Title */}
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="title" className="mb-1 text-muted">
                                                Title <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                id="title"
                                                type="text"
                                                placeholder="Title"
                                                className="form-control"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="description" className="mb-1 text-muted">
                                                Description <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                name="description"
                                                className="form-control"
                                                placeholder="Description"
                                                id="description"
                                                cols="30"
                                                rows="5"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Thumbnail */}
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="thumbnail" className="mb-1 text-muted">
                                                Thumbnail <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                name="thumbnail"
                                                className="form-control"
                                                id="thumbnail"
                                                onChange={(e) => setThumbnail(e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Game File */}
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="game" className="mb-1 text-muted">
                                                File Game <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                name="game"
                                                className="form-control"
                                                id="game"
                                                onChange={(e) => setGame(e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-4 row">
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary w-100">
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button type="button" onClick={() => navigate(-1)} className="btn btn-danger w-100">
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UpdateGame;
