import { useState, useEffect } from "react";
import useTitle from "../../utils/UseTitle";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function ListUser() {
    const [listUser, setListUser] = useState([]);
    useTitle("Manage Users");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setListUser(response.data.content);
                }
            } catch (error) {
                console.error("Error fetching user users:", error);
            }
        };

        fetchUser();
    }, []);
    const handleDelete = async (e, user) => {
        const token = localStorage.getItem('token');
        console.log("Token", token);
        console.log("USER ID", user.id);

        const response = await api.delete(`/users/${user.id}?delete_reason=DELETE BY ADMIN`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("RESPONSE", response);

        if (response.status === 204) {
            window.location.reload();
        }
    }

    const addUser = async () => {
        navigate("/admin/user-form");
    };

    const handleUpdate = async (e, user) => {
        navigate("/admin/user-form", {
            state: { user } // Send the user data as state
        });

    };

    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container">
                    <button onClick={addUser} className="btn btn-primary">
                        Add User
                    </button>
                </div>
            </div>
            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List User Users</h6>
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Created at</th>
                                <th>Last login</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser.length > 0 ? (
                                listUser.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.created_at}</td>
                                        <td>{user.last_login_at || "-"}</td>
                                        <td>
                                            <span
                                                className={`badge ${user.status === 'active' ? "bg-success" : "bg-danger"
                                                    } text-white rounded-pill`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-with-gap" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Lock
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button
                                                            type="submit"
                                                            className="dropdown-item"
                                                            name="reason"
                                                            value="spamming"
                                                        >
                                                            Spamming
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="submit"
                                                            className="dropdown-item"
                                                            name="reason"
                                                            value="cheating"
                                                        >
                                                            Cheating
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="submit"
                                                            className="dropdown-item"
                                                            name="reason"
                                                            value="other"
                                                        >
                                                            Other
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <button
                                                onClick={(e) => handleUpdate(e, user)} // Pass user to handleUpdate
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Update
                                            </button>
                                            <button onClick={(e) => handleDelete(e, user)} className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No users found.
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

export default ListUser;
