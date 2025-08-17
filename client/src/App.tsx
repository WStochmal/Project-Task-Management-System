// lib
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Project from "./pages/Project/Project";
import { AppContextProvider } from "./context/appContext";
import { Layout } from "./layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects/:id" element={<Project />} />
          </Routes>
        </Router>
      </Layout>
    </AppContextProvider>
  );
}

export default App;
