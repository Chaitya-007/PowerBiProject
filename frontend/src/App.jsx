import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stocks/create" element={<CreateBook />} />
      <Route path="/stocks/edit/:id" element={<EditBook />} />
      <Route path="/stocks/details/:id" element={<ShowStock />} />
      <Route path="stocks/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
