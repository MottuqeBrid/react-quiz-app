import { Route, Routes } from "react-router";
import { AuthProvider } from "../AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import CheckBox from "./CheckBox";

function App() {
  // const { currentUser } = useAuth();
  // console.log(currentUser);
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            {/* <Route path="/quiz" element={<Quiz />} /> */}
            <Route
              path="/quiz/:id"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            {/* <Route path="/result" element={<Result />} /> */}
            <Route
              path="/result/:id"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
            {/* <Route path="/*" element={<PrivateRoute />}>
              <Route path="/result" element={<Result />} />
            </Route> */}
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
