import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Account } from "./Components/Account";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Status from "./Components/Status";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <Account>
      {/* <Status /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Account>
  );
}

export default App;
