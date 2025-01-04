import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "./useIsRTL";

type useFetchPops_TP = {
  queryKey: [string];
  endpoint: string;
  enabled?: boolean;
  select?: ((data: any) => any) | undefined;
  onError?: (err: any) => void;
  onSuccess?: (err: any) => void;
  localization?: boolean;
};
function useFetch<T>({
  endpoint,
  enabled,
  select,
  queryKey,
  onError,
  onSuccess,
  localization,
}: useFetchPops_TP) {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const config = {
    headers: {
      Authorization: authorizationHeader,
      "x-timeZone": timeZone,
      "Accept-Language": isRTL ? "ar" : "en",
    },
  };

  const query = useQuery<T>({
    queryKey: [...queryKey, isRTL],
    queryFn: () =>
      axios.get(`${baseUrl}/${endpoint}`, config).then((res) => res.data),
    enabled,
    select,
    onError: (error) => {
      notify("error", error?.response?.data?.message);
      if (error?.response?.data?.message == "Unauthenticated.") {
        localStorage.removeItem("user");
        navigate("/login");
        Cookies.remove("token");
      }
      if (onError) {
        onError(error);
      }
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
