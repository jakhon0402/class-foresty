import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../LoginPage/authSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import { NavigateByRole, RequireAuth } from "../../customHooks/protectedRoutes";
import { ROLE } from "../../lib/roles";
import TDashboard from "../TEACHER/TeacherDashboard/TDashboard";
import SDashboard from "../STUDENT/StudentDashboard/SDashboard";

const MainPage = () => {
  const { currentUser, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  return loading ? (
    <div className='flex w-screen h-screen items-center justify-center'>
      <CircularProgress />
    </div>
  ) : (
    currentUser && (
      <Routes>
        <Route element={<RequireAuth allowedRoles={[ROLE.TEACHER]} />}>
          <Route path='/t/*' element={<TDashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLE.STUDENT]} />}>
          <Route path='/s/*' element={<SDashboard />} />
        </Route>
        <Route path='*' element={<NavigateByRole />} />
      </Routes>
    )
  );
};

export default MainPage;
