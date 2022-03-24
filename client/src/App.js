import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Payment from "./Pages/Payment";
import Vaccine from "./Pages/Vaccine";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/vaccine" element={<Vaccine />} />
        <Route exact path="/register" element={<register />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
