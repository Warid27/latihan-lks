import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'
import api from '../api/api'; // Import the Axios instance
import useTitle from '../utils/UseTitle';

function Signin({  message, setMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  useTitle("Gaming Portal")
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlError = params.get('error');
    const statusError = params.get('status')
    if (urlError) {
      const errorMsg = `${statusError}: ${urlError}`
      setError(decodeURIComponent(errorMsg));
      // Clean URL
      window.history.replaceState({}, document.title, '/');
    }
  }, [location.search]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const reqBody = {
        "username": username,
        "password": password
      }

      const response = await api.post('/signin', reqBody);
      if (response.status == 200) {
        localStorage.clear()
        
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)
        localStorage.setItem("username", response.data.username)

        if (response.data.role == "admin") {
          navigate('/admin')
        } else {
          navigate('/gaming')
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <main>
      <section className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-center mb-4">Gaming Portal</h1>
              <div className="card card-default">
                <div className="card-body">
                  <h3 className="mb-3">Sign In</h3>
                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {error}
                      <button type="button" onClick={() => setError("")} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  )}
                  {message && (
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                      {message}
                      <button type="button" onClick={() => setMessage("")} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  )}
                  <form onSubmit={handleLogin}>
                    <div className="form-group my-3">
                      <label htmlFor="username" className="mb-1 text-muted">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        autoFocus
                        autoComplete='true'
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="password" className="mb-1 text-muted">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="mt-4 row">
                      <div className="col">
                        <button type="submit" className="btn btn-primary w-100">
                          Sign In
                        </button>
                      </div>
                      <div className="col">
                        <Link to="/signup" className="btn btn-danger w-100">
                          Sign up
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signin;