import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import UserGrid from "./components/feature/user-table/UserGrid";
import AddEditUser from "./components/feature/add-edit-user/AddEditUser";

const App = () =>{
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/"  element={<UserGrid />} />
        <Route path="/add-user"  element={<AddEditUser />} />
      </Routes>
    </div>
  )
}

export default App;