import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./routes/Admin";
import Owner from "./routes/Owner";
import User from "./routes/User";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/owner/*" element={<Owner />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;


