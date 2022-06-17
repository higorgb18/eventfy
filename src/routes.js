import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import CreateAccount from './pages/createAccount';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>

            <Routes>
                <Route path="/cadastrar" element={<CreateAccount />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes