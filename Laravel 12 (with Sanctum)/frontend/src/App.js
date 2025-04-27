import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Admin from './pages/admin/index';
import ListAdmin from './pages/admin/admins';
import ListUser from './pages/admin/users';
import UserForm from './pages/admin/userForm';

import Gaming from './pages/gaming/index';
import DiscoverGames from './pages/gaming/discoverGame';
import GameDetails from './pages/gaming/gameDetails';
import ManageGame from './pages/gaming/manageGame';
import CreateGame from './pages/gaming/createGame';
import UpdateGame from './pages/gaming/updateGame';

import Navbar from './components/navbar';

// Utils
import AuthGuard from './utils/AuthGuard';
import NotFound from './pages/notFound';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  return (
    <Router>
      <div>
       <Navbar setMessage={setMessage} />
        <Routes>
          <Route path="/" element={<Signin setMessage={setMessage} message={message} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={
            <AuthGuard ability={'admin'} >
              <Admin />
            </AuthGuard>
          } />
          <Route path="/admin/listadmin" element={
            <AuthGuard ability={'admin'} >
              <ListAdmin />
            </AuthGuard>
          } />
          <Route path="/admin/listuser" element={
            <AuthGuard ability={'admin'} >
              <ListUser />
            </AuthGuard>
          } />
          <Route path="/admin/user-form" element={
            <AuthGuard ability={'admin'} >
              <UserForm />
            </AuthGuard>
          } />
          <Route path="/gaming" element={
            <AuthGuard ability={'user'} >
              <Gaming />
            </AuthGuard>
          } />
          <Route path="/gaming/list" element={
            <AuthGuard ability={'user'} >
              <DiscoverGames />
            </AuthGuard>
          } />
          <Route path="/gaming/details/:slug" element={
            <AuthGuard ability={'user'} >
              <GameDetails />
            </AuthGuard>
          } />
          <Route path="/gaming/manage" element={
            <AuthGuard ability={'user'} >
              <ManageGame />
            </AuthGuard>
          } />
          <Route path="/gaming/manage/create" element={
            <AuthGuard ability={'user'} >
              <CreateGame />
            </AuthGuard>
          } />
          <Route path="/gaming/manage/update/:slug" element={
            <AuthGuard ability={'user'} >
              <UpdateGame />
            </AuthGuard>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
