import { useNavigate } from "react-router-dom";
import useTitle from "../utils/UseTitle";

function NotFound() {
    const navigate = useNavigate();
    useTitle("Not Found")
    return (
        <main className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-light">
            <div className="text-center">
                <h2 className="mb-3">404 Not Found</h2>
                <div className="text-muted mb-3">The requested URL was not found.</div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate("/")}
                >
                    Back To Login
                </button>
            </div>
        </main>
    );
}

export default NotFound;