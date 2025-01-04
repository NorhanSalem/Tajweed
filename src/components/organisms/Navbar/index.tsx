import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/global/300-1.jpg";
import { Modal } from "../../molecules/Modal/index";
import ar from "../../../assets/global/ar.svg";
import en from "../../../assets/global/en.svg";
import DarkModeToggle from "react-dark-mode-toggle";
import { FaBars } from "react-icons/fa";
import Cookies from "js-cookie";
import { useFetch, useIsRTL } from "../../../hooks";
import { useLanguageContext } from "../../../context/language";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import ArrowSideBar_IC from "../../atoms/icons/ArrowSideBar";
import { Breadcrumbs } from "../../molecules/Breadcrumbs";
import OutsideClickHandler from "react-outside-click-handler";
import { Menu } from "@headlessui/react";

const NavBar = ({
  setOpenSide,
  openSide,
  handleCollapsedSideBar,
  isSidebarCollapsed,
}: any) => {
  const [dropDown, setDropDown] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const [page, setPage] = useState(1); // Page state for pagination
  const [notificationsToShow, setNotificationsToShow] = useState<any[]>([]); // Notifications to display

  const { data } = useFetch<any>({
    endpoint: `dashboard/settings`,
    queryKey: [`dashboard/settings`],
  });

  const { data: allNotifications = [], isLoading } = useFetch<any>({
    endpoint: `core/notifications`,
    queryKey: [`core/notifications`],
  });

  const handleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === null) {
      localStorage.setItem("darkMode", "false");
    }
    setIsDarkMode(savedMode === "true");
    document.body.classList.toggle("dark", savedMode === "true");
  }, []);

  useEffect(() => {
    if (allNotifications.data?.length > 0) {
      const start = (page - 1) * 8;
      const end = start + 8;
      setNotificationsToShow((prevNotifications) => [
        ...prevNotifications,
        ...allNotifications.data.slice(start, end),
      ]);
    }
  }, [page, allNotifications]);

  const { t } = useTranslation();
  const handleDropDown = () => setDropDown((prevState) => !prevState);
  const isRTL = useIsRTL();
  const { changeLang } = useLanguageContext();
  const [currentLang, setCurrentLang] = useState<string>(
    Cookies.get("i18next") || "en"
  );
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleToggleSideBar = () => {
    document.body.setAttribute("drawer-aside-bar", openSide ? "off" : "on");
    setOpenSide(!openSide);
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    navigate("/login");
  };

  const loadMoreNotifications = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
    allNotifications.un_read_notifications = 0;
  };

  return (
    <div className="w-100 flex shadow-md h-16 items-center justify-between p-2">
      <div className="w-100 flex items-center py-6">
        <div
          className="sidebar_mobile_toggle cursor-pointer"
          onClick={handleToggleSideBar}
        >
          <FaBars className="text-[25px] mx-5 text-mainBlue dark:text-white" />
        </div>
        <div
          className={`${
            !isSidebarCollapsed
              ? "sm:w-[250px] flex flex-row items-center justify-between"
              : "w-[70px] flex justify-center"
          }`}
        >
          {!isSidebarCollapsed && (
            <>
              <img
                src={data?.data?.[1]?.value || ""}
                className="lg:ms-3 h-12 w-[50%] object-contain image-logo-site block dark:hidden"
                alt="logo"
              />
              <img
                src={data?.data?.[0]?.value || ""}
                className="lg:ms-3 h-12 w-[80%] object-contain image-logo-site hidden dark:block"
                alt="logo"
              />
            </>
          )}
          <ArrowSideBar_IC
            className={`cursor-pointer transition-ease collapsed-button-sidebar scale-x-[-1]  ${
              isSidebarCollapsed && "scale-x-[1] text-[#009ef7]"
            }`}
            onClick={handleCollapsedSideBar}
          />
        </div>
        <Breadcrumbs isSidebarCollapsed={isSidebarCollapsed} />
      </div>

      <div className="me-2 flex items-center gap-4 relative">
        <div
          type="button"
          onClick={(e) =>
            changeLang(
              e.currentTarget.firstElementChild?.getAttribute(
                "data-lang"
              ) as string
            )
          }
        >
          {isRTL ? (
            <img
              data-lang="en"
              src={en}
              className="ms-3  cursor-pointer h-[30px] md:w-[45px] w-[65px] object-cover rounded-[.325rem]"
              alt="ar"
            />
          ) : (
            <img
              data-lang="ar"
              src={ar}
              className="ms-3 cursor-pointer h-[30px] md:w-[40px] w-[65px] object-cover rounded-[.325rem]"
              alt="en"
            />
          )}
        </div>

        <button onClick={handleNotificationClick}>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex relative w-full justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                {/* {allNotifications.un_read_notifications > 0 ?(
                    <div className="bg-[#11897d] absolute top-0 -left-1 h-6 w-6 rounded-full text-white flex items-center justify-center font-bold ">
                      {allNotifications.un_read_notifications}
                    </div>
                  ):
                  <>
                  </>
                  } */}

                <div className="bg-[#000] absolute top-0 -left-1 h-6 w-6 rounded-full text-white flex items-center justify-center font-bold ">
                  {allNotifications.un_read_notifications}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffc83d"
                    d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 h-[500px] overflow-y-auto break-all mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 w-full">
                {isLoading ? (
                  <div className="text-center py-2">Loading...</div>
                ) : notificationsToShow.length > 0 ? (
                  notificationsToShow.map(
                    (notification: any, index: number) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-[#0d675e] text-white"
                                : "!text-gray-900"
                            } group flex flex-col    w-full break-words rounded-md px-2 py-2 text-sm hover:bg-[#0c524c]`}
                          >
                            <div className="break-words group-hover:text-white">
                              {notification.title}
                            </div>
                            <div className="break-words text-left !text-slate-500 rtl:text-right  group-hover:!text-white">
                              {notification.body}
                            </div>
                            <div className="text-sm  !text-emerald-700 group-hover:!text-white">
                              {notification.date}
                            </div>
                            <div className="h-[1px] my-3 w-full bg-stone-500"></div>
                          </button>
                        )}
                      </Menu.Item>
                    )
                  )
                ) : (
                  <div className="text-center py-2">No notifications</div>
                )}
                {notificationsToShow.length < allNotifications.data?.length && (
                  <div className="text-center py-2">
                    <span
                      onClick={loadMoreNotifications}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Read more
                    </span>
                  </div>
                )}
              </div>
            </Menu.Items>
          </Menu>
        </button>
        <div className="flex items-center justify-center">
          <DarkModeToggle
            onChange={handleDarkMode}
            checked={isDarkMode}
            size={45}
            className="xoverflow-visible basis-36 "
          />
        </div>

        <OutsideClickHandler
          onOutsideClick={() => {
            setDropDown(false);
            setNotificationOpen(false);
          }}
        >
          <div className="relative">
            <button
              className="dark:text-white"
              onClick={() => setDropDown((prev) => !prev)}
            >
              {user?.username}
            </button>
            {dropDown && (
              <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t("Profile")}
                  </Link>
                  <Link
                    to="/setting/generalSetting"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t("Settings")}
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    {t("Logout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </OutsideClickHandler>
        <div
          className="flex items-center basis-36 justify-center gap-2 relative cursor-pointer"
          onClick={handleDropDown}
        >
          <img
            src={logo}
            className="w-10 h-10 rounded-lg object-contain"
            alt="logo"
          />
          <div className="user-info-navbar">
            <div className="m-0 text-[0.80rem] flex flex-col items-center info-user-navbar">
              <span>{user?.data?.data?.name}</span>
              <span className="badge bg-[#43916d] text-[#f5f8fa] rounded-md font-bold text-xs px-[0.3rem] mr-2 py-[0.05rem] ml-2 info-user-name">
                {user?.data?.data?.user_type}
              </span>
              <a
                href="#"
                className="font-bold text-center w-full text-[#a1a5b7] hover:text-[#009ef7] text-xs"
              >
                {user?.data?.data?.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
