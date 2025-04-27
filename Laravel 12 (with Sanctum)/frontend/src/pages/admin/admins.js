import { useState, useEffect } from "react";
import useTitle from "../../utils/UseTitle";
import api from "../../api/api";

function ListAdmin() {
    const [listAdmin, setListAdmin] = useState([]);
    useTitle("List Admin Users");

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('admins', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log("RESPONSE ADMIN", response)
                    setListAdmin(response.data.content);
                }
            } catch (error) {
                console.error("Error fetching admin users:", error);
                // Optionally, you can set an error state here to display a message to the user
            }
        };

        fetchAdmin();
    }, []);

    return (
        <main>
            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Admin Users</h6>

                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Created at</th>
                                <th>Last login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAdmin.length > 0 ? (
                                listAdmin.map((admin, index) => (
                                    <tr key={index}>
                                        <td>{admin.username}</td>
                                        <td>{admin.created_at}</td>
                                        <td>{admin.last_login_at}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No admin users found.
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

export default ListAdmin;