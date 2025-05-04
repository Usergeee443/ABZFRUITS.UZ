import React from "react";
import ReactDOM from "react-dom/client";

// Main App Component
function App() {
  const products = [
    { name: "Almonds", img: "https://via.placeholder.com/300x200?text=Almonds", price: "$10/kg" },
    { name: "Apricots", img: "https://via.placeholder.com/300x200?text=Apricots", price: "$12/kg" },
    { name: "Raisins", img: "https://via.placeholder.com/300x200?text=Raisins", price: "$8/kg" },
  ];

  return (
    <div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }

          nav {
            background-color: #d97706;
            color: white;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 10;
          }

          nav .logo {
            font-size: 24px;
            font-weight: bold;
          }

          nav .links a {
            color: white;
            text-decoration: none;
            margin-left: 16px;
          }

          nav .links a:hover {
            text-decoration: underline;
          }

          #home {
            background-color: #fef3c7;
            padding: 80px 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }

          #home .hero {
            text-align: center;
            max-width: 640px;
          }

          #home h1 {
            font-size: 36px;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 16px;
          }

          #home p {
            font-size: 18px;
            color: #4b5563;
            margin-bottom: 24px;
          }

          #home a {
            background-color: #d97706;
            color: white;
            padding: 8px 24px;
            border-radius: 4px;
            text-decoration: none;
            display: inline-block;
          }

          #home a:hover {
            background-color: #b45309;
          }

          #products {
            background-color: white;
            padding: 48px 16px;
          }

          #products .container {
            max-width: 1280px;
            margin: 0 auto;
          }

          #products h2 {
            font-size: 30px;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 16px;
            text-align: center;
          }

          #products p {
            font-size: 18px;
            color: #4b5563;
            margin-bottom: 32px;
            text-align: center;
          }

          #products .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 32px;
          }

          #products .product {
            background-color: #fff7ed;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          #products img {
            width: 100%;
            height: 192px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 16px;
          }

          #products h3 {
            font-size: 20px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
          }

          #products .price {
            color: #4b5563;
            margin-bottom: 16px;
          }

          #products button {
            background-color: #d97706;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          #products button:hover {
            background-color: #b45309;
          }

          #contact {
            background-color: #fef3c7;
            padding: 48px 16px;
          }

          #contact .container {
            max-width: 448px;
            margin: 0 auto;
            background-color: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          #contact h2 {
            font-size: 30px;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 16px;
            text-align: center;
          }

          #contact p {
            font-size: 18px;
            color: #4b5563;
            margin-bottom: 24px;
            text-align: center;
          }

          #contact .form-group {
            margin-bottom: 16px;
          }

          #contact label {
            display: block;
            color: #4b5563;
            margin-bottom: 8px;
          }

          #contact input,
          #contact textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
          }

          #contact textarea {
            height: 100px;
            resize: vertical;
          }

          #contact button {
            background-color: #d97706;
            color: white;
            padding: 8px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: block;
            width: 100%;
          }

          #contact button:hover {
            background-color: #b45309;
          }

          footer {
            background-color: #d97706;
            color: white;
            text-align: center;
            padding: 16px;
          }

          @media (max-width: 768px) {
            nav {
              flex-direction: column;
              align-items: flex-start;
            }

            nav .links {
              margin-top: 8px;
            }

            #home h1 {
              font-size: 28px;
            }

            #products .grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      {/* Navbar */}
      <nav>
        <div className="logo">Dried Fruits Delight</div>
        <div className="links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home">
        <div className="hero">
          <h1>Welcome to Dried Fruits Delight</h1>
          <p>Discover our premium selection of dried fruits, perfect for healthy snacking and culinary creations.</p>
          <a href="#products">Buy Now</a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products">
        <div className="container">
          <h2>Our Dried Fruits</h2>
          <p>Explore our range of high-quality dried fruits, sourced from the best farms.</p>
          <div className="grid">
            {products.map((product, index) => (
              <div key={index} className="product">
                <img src={product.img} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <button>Buy Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <p>Have questions? Reach out to us for more information or inquiries.</p>
          <div className="form-group">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" />
            parcialidad{" "}
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="4"></textarea>
          </div>
          <button>Submit</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Dried Fruits Delight. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
