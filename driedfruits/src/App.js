import React from "react";
import Navbar from "./components/Navbar.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Products />
      <Contact />
    </div>
  );
}

export default App;
