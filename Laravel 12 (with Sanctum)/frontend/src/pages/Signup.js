// src/components/Signup.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const reqBody = {
        "username": username,
        "password": password
      }

      const response = await api.post('/signup', reqBody);
      if (response.status == 201) {
        localStorage.clear()

        navigate('/')

      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <main>
      <div className="hero py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-3">
            Sign Up - Gaming Portal
          </h2>
          <div className="text-muted">
            Join our community of gamers and unlock exclusive content, challenges, and rewards. Start your adventure today!
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" onClick={() => setError("")} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}
              <form onSubmit={handleSignup}>
                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="username" className="mb-1 text-muted">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="password" className="mb-1 text-muted">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary w-100">
                      Sign Up
                    </button>
                  </div>
                  <div className="col">
                    <Link to="/" className="btn btn-danger w-100">
                      Sign In
                    </Link>
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

export default Signup;
