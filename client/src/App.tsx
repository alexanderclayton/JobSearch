import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Application, CreateAccount, Home, Job, Login, User } from "./pages";
import { AuthProvider, ProtectedRoute } from "./context";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<User />} />
              <Route path="/job/:id" element={<Job />} />
              <Route path="/application/:id" element={<Application />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
