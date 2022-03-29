import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Payment from "./Pages/Payment";
import Vaccine from "./Pages/Vaccine";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Confirm from "./Pages/Confirm";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/home" element={<Home />} />
        <Route exact path="/vaccine" element={<Vaccine />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/confirm" element={<Confirm />}/>
      </Routes>
    </Router>
  );
}

export default App;
