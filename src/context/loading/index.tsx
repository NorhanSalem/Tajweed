import { createContext, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";

interface LoadingContextProviderProps {
  children: React.ReactNode;
}
interface LoadingContextType {
  visible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType
);

export const LoadingContextProvider = ({
  children,
}: LoadingContextProviderProps) => {
  const [visible, { toggle, open, close }] = useDisclosure(false);

  return (
    <LoadingContext.Provider value={{ open, close, visible, toggle }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingOverlay = () => useContext(LoadingContext);
