import { Fragment } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LogIn from "./components/auth/LoginPage";
import Home from "./pages/Home";
import RoleBaseRoute from "./components/auth/RoleBaseRoute";
import AuthRoute from "./components/auth/AuthRoute";
import useAuth from "./context/auth/useAuth";
import SignUp from "./pages/SignUp/SignUpPage";
import Verify from "./pages/SignUp/Verify";
import Header from "./components/Layout/components/Header";
import FeatureSection from "./pages/Home/FeatureSection";
import AboutUs from "./pages/AboutUs/AboutUsPage";

function App() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  // Define paths where the header should be hidden
  const hideHeaderPaths = ['/signin', '/signup', '/verify'];
  
  // Check if current path is one of the paths to hide header
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <Fragment>
      {showHeader && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify' element={<Verify />} />

        {/* Protected Routes */}
        <Route path='/features' element={
          <AuthRoute>
            <RoleBaseRoute accessibleRoles={["Admin", "Manager"]}>
              <FeatureSection />
            </RoleBaseRoute>
          </AuthRoute>
        } />
          <Route path='/about-us' element={
          <AuthRoute>
            <RoleBaseRoute accessibleRoles={["Admin", "Manager"]}>
              <AboutUs />
            </RoleBaseRoute>
          </AuthRoute>
        } />
      </Routes>
    </Fragment>
  );
}

export default App;
