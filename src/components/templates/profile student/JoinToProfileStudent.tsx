import { t } from "i18next";
import React from "react";
import { useFetch } from "../../../hooks";

function JoinToProfileStudent({ userID }: any) {
  const { isLoading, isSuccess, refetch, data, isRefetching, error } =
    useFetch<any>({
      endpoint: `dashboard/students/token/${userID}`,
      queryKey: [`dashboard/students/token/${userID}`],
    });
    const endpoint = "https://qurancourses.cam/en";

  const handleJoin = () => {
      console.log('sssssssssssssssssssssss',data)
    const url = new URL(endpoint);
    url.searchParams.append("token", data?.token);
    window.open(url.href, "_blank");
  };

  return (
    <div>
      <button
        className="hover:text-white border-white border p-3 rounded-lg"
        onClick={handleJoin}
      >
        {t("Join to profile Student")}
      </button>
    </div>
  );
}

export default JoinToProfileStudent;
