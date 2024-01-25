import { ROLE } from "../../lib/roles";
import {
  CoursesIcon,
  GroupsIcon,
  HomeIcon,
  PaymentsIcons,
  RoomsIcon,
  StudentsIcons,
  SubjectsIcon,
  TeachersIcon,
} from "../Icons/SidebarIcons";

export function getMenuList(role) {
  if (role === ROLE.TEACHER) {
    return [
      // {
      //   name: "Bosh sahifa",
      //   icon: <HomeIcon />,
      //   to: "/home",
      // },
      { name: "Guruhlar", icon: <GroupsIcon />, to: "/groups" },
      { name: "O'quvchilar", icon: <StudentsIcons />, to: "/students" },
      { name: "To'lovlar", icon: <PaymentsIcons />, to: "/payments" },
      { name: "Kurslar", icon: <CoursesIcon />, to: "/courses" },
      { name: "Fanlar", icon: <SubjectsIcon />, to: "/subjects" },
      { name: "Xonalar", icon: <RoomsIcon />, to: "/rooms" },
    ];
  } else if (role == ROLE.STUDENT) {
    return [
      // {
      //   name: "Bosh sahifa",
      //   icon: <HomeIcon />,
      //   to: "/home",
      // },
      { name: "Guruhlar", icon: <GroupsIcon />, to: "/groups" },
      { name: "O'qituvchilar", icon: <TeachersIcon />, to: "/teachers" },
      // { name: "To'lovlar", icon: <PaymentsIcons />, to: "/payments" },
      { name: "Kurslar", icon: <CoursesIcon />, to: "/courses" },
      { name: "Fanlar", icon: <SubjectsIcon />, to: "/subjects" },
      { name: "Xonalar", icon: <RoomsIcon />, to: "/rooms" },
    ];
  }
}
