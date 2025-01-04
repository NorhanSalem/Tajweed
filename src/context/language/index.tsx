import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useLoadingOverlay } from "../loading";
import { request } from "../../utils/axios-util";
import { notify } from "../../utils/toast";

interface LanguageContextProviderProps {
  children: React.ReactNode;
}
interface LanguageContextType {
  currentLang: string;
  changeLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

export const LanguageContextProvider = ({
  children,
}: LanguageContextProviderProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const queryClient = useQueryClient();
  const LoadingOverlay = useLoadingOverlay();

  const changeLang = async (language: string) => {
    LoadingOverlay.open();

    try {
      const response = await request({
        url: `dashboard/change-language?locale=${language}`,
        method: "GET",
      });
      const newLang = response as string;
      const newDir = newLang == "ar" ? "rtl" : "ltr";

      await queryClient.invalidateQueries();
      i18n.changeLanguage(newLang);

      document.documentElement.lang = newLang;
      document.documentElement.dir = newDir;
    } catch (error: any) {
      notify("error", error.response?.data?.error);
    } finally {
      LoadingOverlay.close();
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        changeLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
