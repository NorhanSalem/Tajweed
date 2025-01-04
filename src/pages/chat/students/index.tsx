import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { Button } from "../../../components/atoms";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import { Loading } from "../../../components/organisms/Loading/Loading";
import { AddMessageAllUser } from "../../../components/templates/chat/AddMessageAllUser";
import Chats from "../../../components/templates/chat/Chats";
import { useFetch } from "../../../hooks";

function StudentsChat({ title }: any) {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 786);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleNavLinkClick = () => {
    if (isMobileView) {
      setIsComponentVisible(false);
    }
  };
  const {
    data: chats,
    isLoading: isChatsLoading,
    refetch,
  } = useFetch<any>({
    endpoint: `core/get-all-admin-chat?search=${word}&user_type=Student`,
    queryKey: [`core/get-all-admin-chat${word}&user_type=Students`],
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div
        className={`grid ${isMobileView ? "grid-cols-1" : "grid-cols-6"} gap-3`}
      >
        {isComponentVisible && (
          <div
            className={`rounded-lg ${
              isMobileView ? "col-span-1" : "lg:col-span-2 md:col-span-2"
            } p-4 bg-white dark:bg-dark-tertiary`}
          >
            <input
              placeholder={`${t("Search")}`}
              className="rounded-xl w-full bg-slate-100 mb-2"
              onChange={(e: any) => setWord(e.target.value)}
            />
            <Button
              variant="primary"
              className="w-full p-3 mb-2 bg-slate-100 rounded-xl border border-slate-500 text-black dark:text-white"
              action={() => setModal(true)}
            >
              {t("Send a message to everyone")}
            </Button>
            {isChatsLoading && <Loading />}
            {chats?.data && (
              <Chats
                trigger={setIsComponentVisible}
                chats={chats?.data}
                show="isComponentVisible"
                isMobileView={isMobileView} // Pass isMobileView state
                onNavLinkClick={handleNavLinkClick}
              />
            )}
          </div>
        )}

        {(!isMobileView || !isComponentVisible) && (
          <div className="grow rounded-lg lg:col-span-4 md:col-span-4 p-4 bg-white dark:bg-dark-tertiary">
            <Outlet />
          </div>
        )}
        {/* <ModalTemplate
          isOpen={modal}
          onClose={() => {
            setModal(false);
          }}
        >
          <AddMessageAllUser refetch={refetch} setModel={setModal} />
        </ModalTemplate> */}
      </div>
    </>
  );
}

export default StudentsChat;
