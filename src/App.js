import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"; // Adjust the import path here
import { Loginform } from "./Loginform";
import { Register } from "./Register";
import Product from "./Product";
import Update from "./Form/Update";
import Create from "./Form/Create";
import Detail from "./Form/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginform />} />
          <Route path="/product" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/create" element={<Create />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
