import { useDebouncedState } from "@mantine/hooks";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { Button } from "../../../components/atoms";
import { ModalTemplate } from "../../../components/molecules/ModalTemplate";
import { Loading } from "../../../components/organisms/Loading/Loading";
import { AddMessageAllUser } from "../../../components/templates/chat/AddMessageAllUser";
import Chats from "../../../components/templates/chat/Chats";
import { useFetch } from "../../../hooks";
import MobileChat from "../../chat/Mobile/index";

function AllChat({ title }: any) {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [word, setWord] = useDebouncedState("", 300);
  const {
    data: chats,
    isLoading: isChatsLoading,
    refetch,
  } = useFetch<any>({
    endpoint: `core/get-all-admin-chat?search=${word}`,
    queryKey: [`core/get-all-admin-chat${word}`],
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <MobileChat />
    </>
  );
}

export default AllChat;
