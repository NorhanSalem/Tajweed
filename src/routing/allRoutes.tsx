import { t } from "i18next";
import { Route, Routes } from "react-router-dom";
import SponsorsRevenues from "../components/templates/Sponsors revenues/SponsorsRevenues";
import AllStudents from "../components/templates/Student/AllStudents";
import StudentsRevenues from "../components/templates/Student/StudentsRevenues";
import TeachersFinances from "../components/templates/Teacher/TeachersFinances";
import TeachersPerformance from "../components/templates/Teacher/TeachersPerformance";
import Sliders from "../components/templates/content management/Sliders";
import AllNotifications from "../components/templates/notifications/AllNotifications";
import ProfilePageStudent from "../components/templates/profile student/ProfilePageStudent";
import ProfilePage from "../components/templates/profile/ProfilePage";
import Profile from "../pages/Profile/index";
import AllSponsor from "../components/templates/sponser/AllSponsor";
import { useAuth } from "../context/auth-and-perm/AuthProvider";
import DirectorsRegister from "../pages/Public Administration/DirectorsRegister";
import Slider from "../pages/Site Administration/Site/Slider";
import { TeacherTermsCondition } from "../pages/Site Administration/TeacherTearmsCondition";
import { AboutUs } from "../pages/Site Administration/aboutUs";
import { ContactInfo } from "../pages/Site Administration/contactInfo";
import ContactUs from "../pages/Site Administration/contacts";
import FeatureQuran from "../pages/Site Administration/feature Tartil";
import { Header } from "../pages/Site Administration/header";
import LearningSteps from "../pages/Site Administration/learningSteps";
import PopularQuestions from "../pages/Site Administration/popularQuestions";
import Reviews from "../pages/Site Administration/reviews";
import { StudentTermsCondition } from "../pages/Site Administration/student terms condition";
import { TermsOfAcceptanceOfTeachers } from "../pages/Site Administration/terms-of acceptance of teachers";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import GeneralExpenses from "../pages/reports/GeneralExpenses";
import MarketingExpenses from "../pages/reports/MarketingExpenses";
import SalariesExpenses from "../pages/reports/SalariesExpenses";
import TeachersCommissions from "../pages/reports/TeachersCommissions";
import { Settings } from "../pages/settings";
//human resources pages
import { PermissionForm } from "../components/templates/Permission/PermissionForm";
import Conversation from "../components/templates/chat/Conversation";
import ProfilePageEmployee from "../components/templates/hr/employees/profile/ProfilePageEmployee";
import IncomingSession from "../pages/IncomingSession";
import DetailsTeacher from "../pages/Request to goin/DetailsTeacher";
import NewTeacher from "../pages/Request to goin/NewTeacher";
import TeachingLanguage from "../pages/TeachingLanguage/TeachingLanguage";
import AllCoupon from "../pages/allCoupons.tsx";
import AllSession from "../pages/allSessions";
import DetailsAllSessionStudents from "../pages/allSessions/DetailsAllSessionStudents";
import DetailsAllSessionTeachers from "../pages/allSessions/DetailsAllSessionTeachers";
import AllSubscriptions from "../pages/allSubscriptions";
import ChatNotFound from "../pages/chat/ChatNotFound";
import StudentsChat from "../pages/chat/students";
import CurrentSession from "../pages/currentSession";
import { Finances } from "../pages/finances";
import FinishedSession from "../pages/finishedSession";
import AllCities from "../pages/general setting/Country/cities/AllCities";
import AllCountry from "../pages/general setting/Country/country/AllCountry";
import { GeneralSetting } from "../pages/general setting/GeneralSetting";
import Contacts from "../pages/general setting/contacts";
import Faqs from "../pages/general setting/faqs/Faqs";
import AllPackages from "../pages/general setting/pakages/AllPackages";
import PaymentMethods from "../pages/general setting/paymentMethode/PaymentMethods";
import Allcompensations from "../pages/hr/compensations/Compensations";
import Employees from "../pages/hr/employees/allEmployees";
import Allsalaries from "../pages/hr/salaries/allsalaries";
import { OuterSetting } from "../pages/outer setting";
import PermissionMain from "../pages/permission";
import RestrictedMessages from "../pages/restricted messages/RestrictedMessages";
import AllRewards from "../pages/rewards/AllRewards";
import Specializations from "../pages/specializations/Specializations";
import AllTeachers from "../pages/teatcher/allTeachers";
import TeacherEditProfileRequests from "../pages/teatcher/profile/edit-requests";
import EditRequestView from "../pages/teatcher/profile/edit-requests/[requestId]";
import TodaySession from "../pages/todaySession";
import { ErrorPage } from "./ErrorPage";
import { Root } from "./Root";
import AllBlogs from "../pages/blogs";
import AllCategory from "../pages/categoryBlogs";
import AllSpam from "../pages/spam";
import ActiveTeacher from "../pages/activeTeacher/ActiveTeacher";
import InActiveTeachers from "../pages/inActiveTeachers/InActiveTeachers";
import ActiveStudent from "../pages/ActiveStudent/ActiveStudent";
import NotActiveStudent from "../pages/NotActiveStudent/NotActiveStudent";
import CouponsHistory from "../pages/couponsHistory";
import CanTech from "../pages/CanTech";
import AllChat from "../pages/chat/all";
import TeachersChat from "../pages/chat/teachers";
import Seo from "../pages/seo";

export const AllRoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home title={t("home")} />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/settings" element={<Settings title={t("settings")} />} />
        <Route path="/finances" element={<Finances title={t("finances")} />} />
        <Route
          path="/today-session"
          element={<TodaySession title={t("today-class")} />}
        />
        <Route
          path="/current-session"
          element={<CurrentSession title={t("current-class")} />}
        />
        <Route
          path="/finished-session"
          element={<FinishedSession title={t("finished-class")} />}
        />
        <Route
          path="/incoming-session"
          element={<IncomingSession title={t("incoming-class")} />}
        />
        <Route
          path="/all-session"
          element={<AllSession title={t("all-class")} />}
        />
        <Route path="/Profile" element={<Profile title={t("Profile")} />} />
        <Route
          path="/details-incoming-session-student/:type/:id"
          element={
            <DetailsAllSessionStudents
              title={t("details-incoming-class-students")}
            />
          }
        />
        <Route
          path="/details-incoming-session-teacher/:type/:id"
          element={
            <DetailsAllSessionTeachers
              title={t("details-incoming-class-teacher")}
            />
          }
        />
        <Route
          path="/all-subscriptions"
          element={<AllSubscriptions title={t("all-subscriptions")} />}
        />
        <Route
          path="/site/about-us"
          element={<AboutUs title={t("aboutUs")} />}
        />
        <Route path="/site/slider" element={<Slider title={t("slider")} />} />
        <Route
          path="/site/learning-Steps"
          element={<LearningSteps title={t("learning-steps")} />}
        />
        <Route
          path="/site/feature-quran-curses"
          element={<FeatureQuran title={t("Why Quran Curses")} />}
        />
        <Route
          path="/site/reviews"
          element={<Reviews title={t("reviews")} />}
        />
        <Route path="/blogs" element={<AllBlogs title={t("Blogs")} />} />
        <Route
          path="/category"
          element={<AllCategory title={t("Categories")} />}
        />
        <Route path="/spam" element={<AllSpam title={t("Banned list")} />} />

        <Route
          path="/site/popular-questions"
          element={<PopularQuestions title={t("popular-questions")} />}
        />
        <Route
          path="/CouponsHistory"
          element={<CouponsHistory title={t("coupon-history")} />}
        />
        <Route
          path="/site/contact-info"
          element={<ContactInfo title={t("contact-info")} />}
        />

        <Route path="/site/header" element={<Header title={t("header")} />} />

        <Route
          path="/site/contacts"
          element={<ContactUs title={t("contacts")} />}
        />
        <Route
          path="/site/teacher-terms-condition"
          element={
            <TeacherTermsCondition title={t("teacher-terms-condition")} />
          }
        />
        <Route
          path="/site/student-terms-condition"
          element={
            <StudentTermsCondition title={t("student-terms-condition")} />
          }
        />
        <Route
          path="/site/terms-of-acceptance-of-teachers"
          element={
            <TermsOfAcceptanceOfTeachers
              title={t("terms-of-acceptance-of-teachers")}
            />
          }
        />
        <Route
          path="/hr/employees"
          element={<Employees title={t("Employees")} />}
        />
        <Route
          path="/hr/employees/profile/:employeeId"
          element={<ProfilePageEmployee title={t("Employees")} />}
        />

        <Route
          path="/hr/compensations"
          element={<Allcompensations title={t("Compensations")} />}
        />
        <Route
          path="/hr/salaries"
          element={<Allsalaries title={t("salaries")} />}
        />
        <Route
          path="/teacher/teachers"
          element={<AllTeachers title={t("all-teachers")} />}
        />
        <Route
          path="/teacher/activeTeacher"
          element={<ActiveTeacher title={t("Active-teachers")} />}
        />
        <Route
          path="/teacher/inActiveTeachers"
          element={<InActiveTeachers title={t("in-active-teachers")} />}
        />
        <Route
          path="/AllRewards"
          element={<AllRewards title={t("All-Rewards")} />}
        />
        <Route
          path="/teacher/newTeacher"
          element={<NewTeacher title={t("Requests to join")} />}
        />
        <Route
          path="/teacher/newTeacher/DetailsTeacher/:Id"
          element={<DetailsTeacher />}
        />
        <Route
          path="/teacher/teachers/profile/:teacherId"
          element={<ProfilePage title="profile/:teacherId" />}
        />
        <Route path="/SEO" element={<Seo title="SEO" />} />
        <Route
          path="/teacher/teachers-performance"
          element={<TeachersPerformance title={t("teachers-performance")} />}
        />
        <Route
          path="/teacher/teachers-finances"
          element={<TeachersFinances title={t("teachers-finances")} />}
        />
        <Route
          path="/teacher/profile/edit-requests"
          element={<TeacherEditProfileRequests title={t("Edit requests")} />}
        />
        <Route
          path="/teacher/profile/edit-requests/:requestId"
          element={<EditRequestView />}
        />
        <Route
          path="/teaching-Language"
          element={<TeachingLanguage title={t("teaching-Language")} />}
        />
        <Route
          path="/students/all-students"
          element={<AllStudents title={t("all-students")} />}
        />
        <Route
          path="/students/ActiveStudent"
          element={<ActiveStudent title={t("Active-Student")} />}
        />
        <Route
          path="/students/NotActiveStudent"
          element={<NotActiveStudent title={t("not-active-Student")} />}
        />
        <Route
          path="/student/students/profile/:studentId"
          element={<ProfilePageStudent title={t("all-students")} />}
        />
        <Route
          path="/teacher/specializations"
          element={<Specializations title={t("specializations")} />}
        />
        <Route
          path="/teacher/canTeach"
          element={<CanTech title={t("teachingFields")} />}
        />
        <Route
          path="/report/students_revenues"
          element={<StudentsRevenues title={t("students_revenues")} />}
        />
        <Route
          path="/report/sponsor-revenues"
          element={<SponsorsRevenues title={t("sponsor-revenues")} />}
        />
        <Route
          path="/report/general-expenses"
          element={<GeneralExpenses title={t("General expenses")} />}
        />
        <Route
          path="/report/teachers-commissions"
          element={<TeachersCommissions title={t("teachers-commissions")} />}
        />
        <Route
          path="/report/marketing-expenses"
          element={<MarketingExpenses title={t("marketing-expenses")} />}
        />
        <Route
          path="/report/salaries-expenses"
          element={<SalariesExpenses title={t("salaries-expenses")} />}
        />
        {/*  */}
        <Route
          path="/site/sliders"
          element={<Sliders title={t("Sliders")} />}
        />
        {/*  */}
        <Route
          path="/advertisement/sponsors"
          element={<AllSponsor title={t("All Sponsors")} />}
        />
        <Route
          path="/advertisement/coupons"
          element={<AllCoupon title={t("Coupons")} />}
        />
        <Route
          path="/advertisement/notifications"
          element={<AllNotifications title={t("Notifications")} />}
        />
        <Route
          path="/setting"
          element={<OuterSetting title={t("Setting")} />}
        />
        <Route
          path="/setting/generalSetting"
          element={<GeneralSetting title={t("Setting")} />}
        />
        <Route
          path="/setting/allPackages"
          element={<AllPackages title={t("allPackages")} />}
        />
        <Route
          path="/restricted-messages"
          element={<RestrictedMessages title={t("restricted-messages")} />}
        />
        <Route
          path="/setting/payments"
          element={<PaymentMethods title={t("payments")} />}
        />
        <Route
          path="/administration/users"
          element={<DirectorsRegister title={t("users")} />}
        />
        <Route
          path="/administration/permission"
          element={<PermissionMain title={t("permission")} />}
        />
        <Route
          path="/administration/permission/addPermission"
          element={<PermissionForm title={t("add permission")} />}
        />
        <Route
          path="/administration/permission/editPermission/:Id"
          element={<PermissionForm title={t("edit permission")} />}
        />
        <Route path="/setting/faq" element={<Faqs title={t("faq")} />} />
        <Route
          path="/setting/contacts"
          element={<Contacts title={t("Contacts")} />}
        />

        <Route path="/chat/all" element={<AllChat title={t("Chat")} />}>
          <Route
            path=""
            element={
              <div>
                <ChatNotFound />
              </div>
            }
          />
          <Route path=":userId" element={<Conversation />} />
        </Route>
        <Route
          path="/chat/students"
          element={<StudentsChat title={t("Chat")} />}
        >
          <Route
            path=""
            element={
              <div>
                <ChatNotFound />
              </div>
            }
          />
          <Route path=":userId" element={<Conversation />} />
        </Route>
        <Route
          path="/chat/Teachers"
          element={<TeachersChat title={t("Chat")} />}
        >
          <Route
            path=""
            element={
              <div>
                <ChatNotFound />
              </div>
            }
          />
          <Route path=":userId" element={<Conversation />} />
        </Route>

        <Route
          path="/setting/country"
          element={<AllCountry title={t("country")} />}
        />
        <Route
          path="/setting/cities"
          element={<AllCities title={t("Cities")} />}
        />
        <Route path="/setting/faq" element={<Faqs title={t("faq")} />} />
      </Route>
      <Route
        errorElement={<ErrorPage />}
        path="/login"
        element={<Login title={t("login")} />}
      />
    </Routes>
  );
};
