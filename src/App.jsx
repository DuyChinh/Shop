import Products from "./components/Products/Products"
// import Header from "./components/Header/Header"
import  { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart/Cart";
import { Routes, Route } from "react-router-dom";
import SearchProduct from "./components/SearchProduct/SearchProduct";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import Order from "./components/Order/Order";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Products />}></Route>
        {/* <Route path="/" element={<SimpleSlider />}></Route> */}
        <Route
          path="/cart"
          element={
            <Cart /> 
          }
        />

        <Route path="/products/:id" element={<ProductDetail />}></Route>
        <Route path="/search/:title" element={<SearchProduct />}></Route>
        <Route path="/order" element={<Order/>}></Route>
      </Routes>
      {/* <Footer/> */}
      <Toaster />
    </>
  );
}

export default App