import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/LoginPage";
import Home from "./pages/Home";
import RoleBaseRoute from "./components/auth/RoleBaseRoute";
import AuthRoute from "./components/auth/AuthRoute";
import useAuth from "./context/auth/useAuth";

function App() {
  return (
    
    <Routes>
      <Route path='/signin' element={<LogIn />} />
      <Route path='/' element={
        <AuthRoute>
          <RoleBaseRoute accessibleRoles={["Admin"]}>
            <Home />
          </RoleBaseRoute>
        </AuthRoute>
      }/>
    </Routes>
  );
}

export default App;

 //  <Router>

    //     <div className="App">

    //       <Routes>

    //           {publicRoutes.map((route ,index) =>{
    //             {/* const Layout = route.layout === null ? Fragment : DefaultLayout; // Ý nghĩa đoạn này là nếu không có route.layout thì sẽ lưu DefaultLayout vào biến layout */}
    //             const Page = route.component

    //             let Layout = DefaultLayout
    //             if (route.layout){
    //               Layout = route.layout
    //             }
    //             else if( route.layout === null){
    //               Layout = Fragment
    //             }

    //               return <Route key={index} path={route.path} element={
    //                 <Layout>
    //                 <Page/>
    //                 </Layout>                
    //               } />
    //           })}




    //       </Routes>



    //     </div>

    //  </Router>