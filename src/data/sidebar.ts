import { t } from "i18next";
import { BsLockFill } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import AdministrationIcon from "../components/atoms/icons/sideBar/AdministrationIcon";
import AdminsRecords from "../components/atoms/icons/sideBar/AdminsRecords";
import AllSessionsIcon from "../components/atoms/icons/sideBar/AllSessionsIcon";
import AllSubscriptionsIcon from "../components/atoms/icons/sideBar/AllSubscriptionsIcon";
import ChatsIcon from "../components/atoms/icons/sideBar/ChatsIcon";
import ContactUsIcon from "../components/atoms/icons/sideBar/ContactUsIcon";
import CouponsIcon from "../components/atoms/icons/sideBar/CouponsIcon";
import CurrentSessionsIcon from "../components/atoms/icons/sideBar/CurrentSessionsIcon";
import EditRequestIcon from "../components/atoms/icons/sideBar/EditRequestIcon";
import ExpensesIcon from "../components/atoms/icons/sideBar/ExpensesIcon";
import FianceesIcon from "../components/atoms/icons/sideBar/FianceesIcon";
import FinishedSessionIcon from "../components/atoms/icons/sideBar/FinishedSessionIcon";
import HomeIcon from "../components/atoms/icons/sideBar/HomeIcon";
import HumanResourcesIcon from "../components/atoms/icons/sideBar/HumanResourcesIcon";
import SeoIcon from "../components/atoms/icons/sideBar/SeoIcon";
import IncomingSessionIcon from "../components/atoms/icons/sideBar/IncomingSessionIcon";
import LocationsIcons from "../components/atoms/icons/sideBar/LocationsIcons";
import NotificationsIcon from "../components/atoms/icons/sideBar/NotificationsIcon";
import PackagesIcon from "../components/atoms/icons/sideBar/PackagesIcon";
import PermissionsIcon from "../components/atoms/icons/sideBar/PermissionsIcon";
import RequestedJoin from "../components/atoms/icons/sideBar/RequestedJoin";
import RestrictedMessagesIcon from "../components/atoms/icons/sideBar/RestrictedMessagesIcon";
import RevenuesIcon from "../components/atoms/icons/sideBar/RevenuesIcon";
import RewardsIcon from "../components/atoms/icons/sideBar/RewardsIcon";
import SettingIcon from "../components/atoms/icons/sideBar/SettingIcon";
import SpecializationsIcon from "../components/atoms/icons/sideBar/SpecializationsIcon";
import StudentIcon from "../components/atoms/icons/sideBar/StudentIcon";
import TeacherFinancesIcon from "../components/atoms/icons/sideBar/TeacherFinacesIcon";
import TeacherPerformanceIcon from "../components/atoms/icons/sideBar/TeacherPerformanceIcon";
import TeachersIcon from "../components/atoms/icons/sideBar/TeachersIcon";
import TodaySessionIcon from "../components/atoms/icons/sideBar/TodaySessionIcon";
import teachingLanguageIcon from "../components/atoms/icons/sideBar/teachingLanguageIcon";

export type MenuItem_TP = {
  id: string;
  icon: IconType;
  label: string;
  link?: string;
  heading?: string; // Add the heading property
  items?: {
    id: string;
    icon: IconType;
    label: string;
    link?: string;
    items?: MenuItem_TP[];
  }[];
};

export const sideBarItems: MenuItem_TP[] = [
  {
    id: crypto.randomUUID(),
    icon: HomeIcon,
    label: `${"Home"}`,
    link: "/",
  },
  {
    id: crypto.randomUUID(),
    icon: AllSubscriptionsIcon,
    label: `${"All subscriptions"}`,
    link: "/all-subscriptions",
  },
  {
    id: crypto.randomUUID(),
    icon: TodaySessionIcon,
    label: `${"Classes"}`,
    items: [
      {
        id: crypto.randomUUID(),
        icon: TodaySessionIcon,
        label: `${"Today classes"}`,
        link: "/today-session",
      },
      {
        id: crypto.randomUUID(),
        icon: CurrentSessionsIcon,
        label: `${"Current classes"}`,
        link: "/current-session",
      },
      {
        id: crypto.randomUUID(),
        icon: AllSessionsIcon,
        label: `${"All classes"}`,
        link: "/all-session",
      },
      {
        id: crypto.randomUUID(),
        icon: FinishedSessionIcon,
        label: `${"Finished classes"}`,
        link: "/finished-session",
      },
      {
        id: crypto.randomUUID(),
        icon: IncomingSessionIcon,
        label: `${"Incoming classes"}`,
        link: "/incoming-session",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    icon: ContactUsIcon,
    label: `${"Contact us"}`,
    link: "/setting/contacts",
  },
  {
    id: crypto.randomUUID(),
    icon: ChatsIcon,
    label: `${"chats"}`,
    // link: "/chat",
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"All"}`,
        icon: FaDotCircle,
        link: "/chat/all",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Students"}`,
        icon: FaDotCircle,
        link: "/chat/students",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Teacher"}`,
        icon: FaDotCircle,
        link: "/chat/Teachers",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    icon: BsLockFill,
    label: `${"Banned list"}`,
    link: "/spam",
  },
  //@ts-ignore
  {
    heading: "System Users",
  },
  {
    id: crypto.randomUUID(),
    label: `${"Teachers"}`,
    icon: TeachersIcon,
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"All"}`,
        icon: TeachersIcon,
        link: "/teacher/teachers",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Active Teacher"}`,
        icon: TeachersIcon,
        link: "/teacher/activeTeacher",
      },
      {
        id: crypto.randomUUID(),
        label: `${"inActive Teachers"}`,
        icon: TeachersIcon,
        link: "/teacher/inActiveTeachers",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Teachers Edit Profile Request"}`,
        link: "/teacher/profile/edit-requests",
        icon: EditRequestIcon,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Requests to join"}`,
        icon: RequestedJoin,
        link: "/teacher/newTeacher",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Teachers performance rate"}`,
        icon: TeacherPerformanceIcon,
        link: "/teacher/teachers-performance",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Teachers finances"}`,
        link: "/teacher/teachers-finances",
        icon: TeacherFinancesIcon,
      },
      {
        id: crypto.randomUUID(),
        label: `${"specializations"}`,
        icon: SpecializationsIcon,
        link: "/teacher/specializations",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Rewards and Deduction Teacher"}`,
        icon: RewardsIcon,
        link: "/AllRewards",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Teaching Fields"}`,
        icon: RewardsIcon,
        link: "/teacher/canTeach",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    label: `${"Students"}`,
    icon: StudentIcon,
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"All"}`,
        icon: StudentIcon,
        link: "/students/all-students",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Active Student"}`,
        icon: StudentIcon,
        link: "/students/ActiveStudent",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Not Active Student"}`,
        icon: StudentIcon,
        link: "/students/NotActiveStudent",
      },
    ],
  },
  //@ts-ignore
  {
    heading: `${"Site Administration"}`,
  },
  {
    id: crypto.randomUUID(),
    label: `${"Quran Curses Administration"}`,
    icon: AdministrationIcon,
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"How to use quran courses"}`,
        link: "/site/learning-Steps",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Why Quran Curses"}`,
        link: "/site/feature-quran-curses",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Blogs"}`,
        link: "/blogs",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Categories blogs"}`,
        link: "/category",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"FAQ"}`,
        link: "/site/popular-questions",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Contact information"}`,
        link: "/site/contact-info",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Header"}`,
        link: "/site/header",
        icon: FaDotCircle,
      },
      // {
      //   id: crypto.randomUUID(),
      //   label: `${"ContactUs Messages"}`,
      //   link: "/site/contacts",
      //   icon: FaDotCircle,
      // },
      {
        id: crypto.randomUUID(),
        label: `${"Teachers Terms And Conditions"}`,
        link: "/site/teacher-terms-condition",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Students Terms And Conditions"}`,
        link: "/site/student-terms-condition",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Terms of acceptance of teachers"}`,
        link: "/site/terms-of-acceptance-of-teachers",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        icon: SeoIcon,
        label: `${"SEO Page"}`,
        link: "/SEO",
      },
    ],
  },

  //@ts-ignore

  //@ts-ignore
  {
    heading: `${t("Human Resources")}`,
  },
  {
    id: crypto.randomUUID(),
    label: `${"Human Resources"}`,
    icon: HumanResourcesIcon,
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"Employees"}`,
        link: "/hr/employees",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Compensations"}`,
        link: "/hr/compensations",
        icon: FaDotCircle,
      },
      {
        id: crypto.randomUUID(),
        label: `${"Salaries"}`,
        link: "/hr/salaries",
        icon: FaDotCircle,
      },
    ],
  },

  //@ts-ignore
  {
    heading: `${t("REPORTS")}`,
  },
  {
    id: crypto.randomUUID(),
    label: `${"Revenues"}`,
    icon: RevenuesIcon,
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"Students revenues"}`,
        icon: FaDotCircle,
        link: "/report/students_revenues",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    label: `${"Expenses"}`,
    icon: ExpensesIcon,
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"General expenses"}`,
        icon: FaDotCircle,
        link: "/report/general-expenses",
      },

      {
        id: crypto.randomUUID(),
        label: `${"Salaries expenses"}`,
        icon: FaDotCircle,
        link: "/report/salaries-expenses",
      },
    ],
  },
  //@ts-ignore
  {
    heading: `${"Advertisement"}`,
  },

  {
    id: crypto.randomUUID(),
    icon: CouponsIcon,
    label: `${"Coupons"}`,
    link: "/advertisement/coupons",
  },
  {
    id: crypto.randomUUID(),
    icon: CouponsIcon,
    label: `${"Coupons History"}`,
    link: "/CouponsHistory",
  },
  {
    id: crypto.randomUUID(),
    icon: NotificationsIcon,
    label: `${"Notifications"}`,
    link: "/advertisement/notifications",
  },
  //@ts-ignore
  {
    heading: `${"SETTINGS"}`,
  },
  {
    id: crypto.randomUUID(),
    icon: SettingIcon,
    label: `${"System settings"}`,
    link: "/setting/generalSetting",
  },
  {
    id: crypto.randomUUID(),
    label: `${"Locations"}`,
    icon: LocationsIcons,
    items: [
      {
        id: crypto.randomUUID(),
        label: `${"Countries"}`,
        icon: FaDotCircle,
        link: "/setting/country",
      },
      {
        id: crypto.randomUUID(),
        label: `${"Cities"}`,
        icon: FaDotCircle,
        link: "/setting/cities",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    icon: PackagesIcon,
    label: `${"Packages"}`,
    link: "/setting/allPackages",
  },
  {
    id: crypto.randomUUID(),
    icon: RestrictedMessagesIcon,
    label: `${"Restricted Messages"}`,
    link: "/restricted-messages",
  },

  {
    id: crypto.randomUUID(),
    label: `${"teaching Language"}`,
    icon: teachingLanguageIcon,
    link: "/teaching-Language",
  },

  //@ts-ignore
  {
    heading: `${"Public Administration"}`,
  },
  {
    id: crypto.randomUUID(),
    icon: AdminsRecords,
    label: `${"Admins records"}`,
    link: "/administration/users",
  },
  {
    id: crypto.randomUUID(),
    icon: PermissionsIcon,
    label: `${"Permissions"}`,
    link: "/administration/permission",
  },
];
