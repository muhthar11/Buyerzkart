import { Routes, Route, Navigate } from "react-router-dom";
import React, { lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Realm from "realm-web";

import AdminLayout from "layouts/admin";
import { app } from "controller/services/dbServices";

const App = () => {
  const queryClient = new QueryClient();
  const url = window.location.pathname;

  
  React.useEffect(() => {
    anonymous();
  }, []);

  const anonymous = async () => {
    if (!app || !app.currentUser) {
      const credentials = Realm.Credentials.anonymous();
      await app.logIn(credentials);
    }
  }



  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="admin/*"
          element={
              <AdminLayout />
          }
        />

        <Route
          path="/"
          element={
              <Navigate to="/admin" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
