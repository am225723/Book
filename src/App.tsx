import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

import LoginPage from '@/pages/LoginPage';
import ClientPortal from '@/pages/ClientPortal';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AuthRedirect from '@/components/AuthRedirect';

export default function App() {
  return (
    <>
      <Helmet><title>Client Portal</title><meta name="description" content="Secure client portal with role-based access." /></Helmet>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
          <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
          <Route path="/client/:clientId" element={<ProtectedRoute role="client"><ClientPortal /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
