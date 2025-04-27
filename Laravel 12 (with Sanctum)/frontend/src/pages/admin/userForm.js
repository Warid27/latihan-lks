import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useLocation } from "react-router-dom";

function UserForm() {
    const [userForm, setUserForm] = useState({
        username: "",
        password: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const { user } = location.state || {};

    useEffect(() => {
        if (user) {
            setUserForm({
                username: user.username,
                password: ""
            })
        }
    }, [user])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const { username, password } = userForm;

        if (!username || !password) {
            return;
        }

        try {
            const reqBody = {
                username,
                password,
            };
            const token = localStorage.getItem('token')
            const response = await api.post("/users", reqBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                // Show the success modal after user is added
                setModalMessage("User added successfully!");
                setModalType("success");
                setShowModal(true); // Show the modal
            }
        } catch (err) {
            setModalMessage(err.response?.data?.message || "An error occurred.");
            setModalType("error");
            setShowModal(true); // Show the modal on error
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const { username, password } = userForm;

        if (!username || !password) {
            return;
        }

        try {
            const reqBody = {
                username,
                password,
            };
            const token = localStorage.getItem('token')
            const response = await api.put(`/users/${user.id}`, reqBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                setModalMessage("User updated successfully!");
                setModalType("success");
                setShowModal(true); 
            }
        } catch (err) {
            setModalMessage(err.response?.data?.message || "An error occurred.");
            setModalType("error");
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        if (modalType === "success") {
            navigate("/admin/listuser"); // Navigate if it's a success
        }
        setShowModal(false); // Close the modal
    };

    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-3">Manage User - Administrator Portal</h2>
                    <div className="text-muted">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </div>
                </div>
            </div>

            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6">
                            {/* Form */}
                            <form onSubmit={user ? handleUpdateUser : handleAddUser}>
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
                                                value={userForm.username}
                                                onChange={handleInputChange}
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
                                                value={userForm.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col">
                                        <button className="btn btn-primary w-100" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button onClick={() => navigate(-1)} className="btn btn-danger w-100">
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal for Success/Error */}
            <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true" style={{ display: showModal ? "block" : "none" }}>
                <div className="modal-dialog">
                    <div className={`modal-content ${modalType === "success" ? "bg-success text-white" : "bg-danger text-white"}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">{modalType === "success" ? "Success" : "Error"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                        </div>
                        <div className="modal-body">
                            {modalMessage}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={handleModalClose}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UserForm;
