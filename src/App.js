import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import EmployeeProfile from "./pages/EmployeeProfile";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Dashboard />} />

      <Route path="/employee/:id" element={<EmployeeProfile />} />

    </Routes>
  );
}

export default App;