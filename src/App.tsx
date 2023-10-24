import { Route, Routes } from "react-router-dom";
import AddReservation from "./pages/AddReservation";
import EmployeeLogin from "./pages/EmployeeLogin";
import ReservationList from "./pages/ReservationList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReservationList />} />
      <Route path="/add-reservation" element={<AddReservation />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
    </Routes>
  );
}

export default App;
