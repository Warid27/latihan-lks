// src/components/Landing.js
import useTitle from '../../utils/UseTitle';

function Admin() {
  useTitle("Administrator Portal")


  return (
    <main>
      {/* Hero Section */}
      <div className="hero py-5 bg-light">
        <div className="container text-center">
          <h1 className="mb-0 mt-0">Dashboard</h1>
        </div>
      </div>

      {/* Alert Section */}
      <div className="list-form py-5">
        <div className="container">
          <h5 className="alert alert-info">
            Welcome, Administrator. Don't forget to sign out when you are finished using this page
          </h5>
        </div>
      </div>
    </main>
  );
}

export default Admin;