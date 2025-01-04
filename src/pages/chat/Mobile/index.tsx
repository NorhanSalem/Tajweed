import { useDebouncedState } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { Button } from "../../../components/atoms";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import { Loading } from "../../../components/organisms/Loading/Loading";
import { AddMessageAllUser } from "../../../components/templates/chat/AddMessageAllUser";
import Chats from "../../../components/templates/chat/Chats";
import { useFetch } from "../../../hooks";

function MobileChat({ title }: any) {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [word, setWord] = useDebouncedState("", 300);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 786);
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  // Store the chats in state
  const [chats, setChats] = useState<any[]>([]);

  const {
    data: fetchedChats,
    isLoading: isChatsLoading,
    refetch,
  } = useFetch<any>({
    endpoint: `core/get-all-admin-chat?search=${word}`,
    queryKey: [`core/get-all-admin-chat${word}`],
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Update the chats state when fetchedChats is updated
    if (fetchedChats?.data) {
      setChats(fetchedChats.data);
    }
  }, [fetchedChats]);

  // Reset chats with updatedChats
  const resetCountMessage = (updatedChats: any[]) => {
    setChats(updatedChats); // Update the chats state with the updated chats
  };

  const handleNavLinkClick = () => {
    if (isMobileView) {
      setIsComponentVisible(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div
        className={`grid relative ${
          isMobileView ? "grid-cols-1" : "grid-cols-6"
        } gap-3 h-[84vh] overflow-hidden`}
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
            {chats?.length > 0 && (
              <Chats
                trigger={setIsComponentVisible}
                chats={chats}
                show="isComponentVisible"
                isMobileView={isMobileView}
                onNavLinkClick={handleNavLinkClick}
                refresh={refetch}
                resetCountMessage={resetCountMessage} // Pass the resetCountMessage function
              />
            )}
          </div>
        )}

        {(!isMobileView || !isComponentVisible) && (
          <div className="grow h-full overflow-hidden rounded-lg lg:col-span-4 md:col-span-4 md:p-4 sm:px-0 sm:py-4 py-4 px-1 bg-white dark:bg-dark-tertiary">
            <Outlet />
          </div>
        )}

        <ModalTemplate
          isOpen={modal}
          onClose={() => {
            setModal(false);
          }}
        >
          <AddMessageAllUser refetch={refetch} setModel={setModal} />
        </ModalTemplate>
      </div>
    </>
  );
}

export default MobileChat;
