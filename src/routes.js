import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import CreateAccount from './pages/createAccount';
import Users from './pages/users';
import Notifications from './pages/notifications';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>

            <Routes>
                <Route path="/cadastrar" element={<CreateAccount />} />
            </Routes>

            <Routes>
                <Route exact path="/pessoas" element={<Users />} />
            </Routes>

            <Routes>
                <Route path="/notificacoes" element={<Notifications />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes