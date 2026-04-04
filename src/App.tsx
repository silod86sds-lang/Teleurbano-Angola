/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { VideoPlayer } from './pages/VideoPlayer';
import { Live } from './pages/Live';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Subscribe } from './pages/Subscribe';

import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminVideos } from './pages/admin/AdminVideos';
import { AdminLive } from './pages/admin/AdminLive';
import { AdminUsers } from './pages/admin/AdminUsers';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<Live />} />
                <Route path="/videos" element={<Home />} />
                <Route path="/video/:id" element={<VideoPlayer />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/subscribe" element={<Subscribe />} />
                
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="videos" element={<AdminVideos />} />
                  <Route path="live" element={<AdminLive />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
