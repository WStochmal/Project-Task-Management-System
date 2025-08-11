// lib
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Project from "./pages/Project/Project";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
