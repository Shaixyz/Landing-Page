import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/LoginPage";
import Home from "./pages/Home";
import RoleBaseRoute from "./components/auth/RoleBaseRoute";
import AuthRoute from "./components/auth/AuthRoute";
import useAuth from "./context/auth/useAuth";
import SignUp from "./pages/SignUp/SignUpPage";
import Verify from "./pages/SignUp/Verify";
import Header from "./components/Layout/components/Header";
import FeatureSection from "./pages/Home/FeatureSection";

function App() {
  const {isAuthenticated, user} = useAuth();
  return (
    <Fragment>
  <Header />


      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify' element={<Verify />} />

        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <AuthRoute>
              <RoleBaseRoute accessibleRoles={["Admin", "Manager"]}>
                <Home />
              </RoleBaseRoute>
            </AuthRoute>
          }
        />
          <Route path='/features' element={
          <AuthRoute>
            <RoleBaseRoute accessibleRoles={["Admin","Manager"]}>
              <FeatureSection />
            </RoleBaseRoute>
          </AuthRoute>
        }
        />
      </Routes>
    </Fragment>
  );
}

export default App;