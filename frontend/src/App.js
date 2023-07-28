import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { FormPage } from "./pages/FormPage";
import { useEffect, useState } from "react";
import { isAuth } from "./services/utils/isAuth";
import { Profile } from "./pages/Profile";
import { Projects } from "./pages/Projects";
import { Login } from "./components/Login";
import { Spinner } from "@material-tailwind/react";
export default function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const checkAuth = async () => {
      try {
        setIsAuthenticated(await isAuth());
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [location]);
  if(isLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner />
    </div>
  );
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <FormPage isLogin={true} />}
        />
        <Route path="/login" element={<FormPage isLogin={true} />} />
        <Route path="/signup" element={<FormPage isLogin={false} />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <FormPage isLogin={true} />}
        />
        <Route
          path="/teams/:teamSlug/projects"
          element={isAuthenticated ? <Projects /> : <FormPage isLogin={true} />}
        />
        <Route path="*" element={<FormPage isLogin={true} />} />
      </Routes>
    </>
  );
}
