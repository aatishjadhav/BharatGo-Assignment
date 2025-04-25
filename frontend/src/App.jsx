// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Orders from "./pages/Orders";

// function App() {

//   return (
//     <>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/:category" element={<Home />} />
//         <Route path="/orders" element={<Orders />} />
//       </Routes>

//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      <Cart />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
