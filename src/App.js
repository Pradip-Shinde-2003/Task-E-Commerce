import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Products from "./Component/Products";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <nav style={{ background:'#ddd', height:'50px', display:'flex', justifyContent:'end', gap:40, paddingRight:'40px', alignItems:'center', fontSize:'24px' , fontWeight:500}}>
        {!isLoggedIn ? (
          <>
            <Link to="/register" >Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/products"  >Products</Link> 
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <Products handleLogout={handleLogout} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
