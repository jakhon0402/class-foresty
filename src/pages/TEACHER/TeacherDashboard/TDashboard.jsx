import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import LightDarkSwitch from "../../../components/LightDarkSwitch";
import ProfileButton from "../../../components/Dashboard/ProfileButton";
import { logout } from "../../LoginPage/authSlice";
import { getLogoSrc } from "../../../utils/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfilePage from "../../ProfilePage/ProfilePage";
import RoomsPage from "../../RoomsPage/RoomsPage";
import SubjectsPage from "../../SubjectsPage/SubjectsPage";
import CoursesPage from "../../CoursePage/CoursesPage";
import GroupsPage from "../GroupsPage/GroupsPage";
import GroupPage from "../GroupsPage/GroupPage/GroupPage";
import StudentsPage from "../StudentsPage/StudentsPage";
import PaymentsPage from "../PaymentsPage/PaymentsPage";

const TDashboard = () => {
  const { currentUser: user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div className='-z-10 fixed w-screen h-screen bg-[#B8D8C4] dark:bg-[#0f0f0f]'></div>
      <div className='flex flex-row bg-[#B8D8C4] dark:bg-[#0f0f0f] p-[21px] gap-8'>
        <Sidebar user={user} />
        <div className='flex flex-col p-3 gap-5 flex-grow'>
          <div className='flex flex-row justify-between'>
            <div className='flex items-center justify-center gap-5'>
              <img
                src={
                  getLogoSrc(user?.educationCenter?.logo)
                  // user?.centerLogoId
                  //   ? // ? `https://platform.foresty.uz/api/image/${user?.centerLogoId}`
                  //     // // : user?.centerLogoId ?? theme === "light"
                  //     defaultLightImage
                  //   : defaultDarkImage
                }
                className='w-[50px] h-[50px] object-cover bg-contain bg-no-repeat rounded-2xl'
              />
              <span className='text-[28px] font-raleway font-extrabold text-fyTropic dark:text-foresty-white'>
                {user?.educationCenter?.name}
              </span>
            </div>
            <div className='flex flex-row justify-around items-center gap-[23px] pr-5'>
              <LightDarkSwitch />
              {/* 
              <HeaderButton
                icon={faC}
                visited={loc.pathname == "/calendar"}
                to={"/calendar"}
              /> */}

              <ProfileButton user={user} />
              <button
                onClick={() => dispatch(logout())}
                className='group flex justify-center items-center bg-foresty-white/80 hover:bg-foresty-white w-[38px] h-[38px] rounded-full text-center -ml-3 transition duration-300 ease-in-out hover:shadow-lg hover:shadow-foresty-500/50 dark:hover:shadow-fyTropic/50 dark:bg-forestydark-500'
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className='text-[14px] text-fyTropic/80 dark:text-[#787e89] dark:group-hover:text-fyTropic-200 shadow-lg transition duration-300 ease-in-out'
                />
              </button>
            </div>
          </div>

          <div className='flex w-full'>
            <Routes>
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/groups' element={<GroupsPage />} />
              <Route path='/groups/:id' element={<GroupPage />} />
              <Route path='/students' element={<StudentsPage />} />
              <Route path='/payments' element={<PaymentsPage user={user} />} />
              <Route path='/rooms' element={<RoomsPage />} />
              <Route path='/subjects' element={<SubjectsPage />} />
              <Route path='/courses' element={<CoursesPage />} />
              <Route path='/' element={<Navigate to='/t/groups' replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default TDashboard;
