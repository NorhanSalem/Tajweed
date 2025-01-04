import { t } from "i18next";
import React from "react";
import { useFetch } from "../../../hooks";

function JoinToProfileTeacher({ userID }: any) {
  const { isLoading, isSuccess, refetch, data, isRefetching, error } =
    useFetch<any>({
      endpoint: `dashboard/teacher/token/${userID}`,
      queryKey: [`dashboard/teacher/token/${userID}`],
    });
  const endpoint = "https://qurancourses.cam/en";

  const handleJoin = () => {
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
        {t("Join to profile Teacher")}
      </button>
    </div>
  );
}

export default JoinToProfileTeacher;
