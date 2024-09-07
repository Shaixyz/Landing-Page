import React, { Fragment, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LogIn from "./components/auth/LoginPage";
import Home from "./pages/Home";
import RoleBaseRoute from "./components/auth/RoleBaseRoute";
import AuthRoute from "./components/auth/AuthRoute";
import useAuth from "./context/auth/useAuth";
import SignUp from "./pages/SignUp/SignUpPage";
import Verify from "./pages/SignUp/Verify";
import Header from "./components/Layout/components/Header";
import AboutUs from "./pages/AboutUs/AboutUsPage";
import Sidebar from "./pages/Admin/Sidebar";
import Dashboardview from "./pages/Admin/Dashboardview";
import Main from "./pages/Admin/Main";
import DetailProductPage from "./pages/DetailProduct/DetailProductPage";
import ChatLayout from "./pages/Notification/ChatLayout";




function App() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Define paths where the header should be hidden
  const hideHeaderPaths = ['/signin', '/signup', '/verify', '/dashboard'];

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
        <Route path='/detail-page' element={<DetailProductPage />} />
        <Route path='/chat-layout' element={<ChatLayout />} />

        {/* Protected Routes */}
        <Route path='/features' element={
          <AuthRoute>
            <RoleBaseRoute accessibleRoles={["Manager"]}>
              {/* <FeatureSection /> */}
            </RoleBaseRoute>
          </AuthRoute>
        } />
        <Route path='/about-us' element={
          <AuthRoute>
            <RoleBaseRoute accessibleRoles={["Manager"]}>
              <AboutUs />
            </RoleBaseRoute>
          </AuthRoute>
        } />

        {/* Admin Dashboard Route */}
        <Route path='/dashboard' element={
          <AuthRoute>
            <RoleBaseRoute accessibleRoles={["Admin"]}>
              <div className="flex overflow-scroll">
                <div className="basis-[12%] h-[100vh]">
                  <Sidebar />
                </div>
                <div className="basis-[88%] border overflow-scroll h-[100vh]">
                  <Dashboardview />
                  <div>
                    <Main />
                  </div>
                </div>
              </div>
            </RoleBaseRoute>
          </AuthRoute>
        } />

      </Routes>
    </Fragment>
  );
}

export default App;
