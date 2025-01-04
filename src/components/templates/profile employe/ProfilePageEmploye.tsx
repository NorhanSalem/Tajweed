import { t } from "i18next";
import { useParams } from "react-router";
import { useFetch } from "../../../hooks";
import TabsProfileStudent from "../../molecules/card/TabsProfileStudent";
// import StatisticsProfileStudent from "../pr/StatisticsProfileStudent"
import StatisticsProfileEmploye from "./StatisticsProfileEmploye";
import TabsProfileEmploye from "../../molecules/card/TabsProfileEmploye";

type ProfilePageEmploye_TP = {
  title: String;
};

function ProfilePageEmploye({ title }: ProfilePageEmploye_TP) {
  const { employeId } = useParams();

  // data Teacher
  const { isLoading, isSuccess, refetch, data, isRefetching, error } =
    useFetch<any>({
      endpoint: `dashboard/hr/employees/${employeId}`,
      queryKey: [`dashboard/hr/employees/${employeId}`],
    });
  // Edit Profile Teacher
  const { data: EditingData } = useFetch<any>({
    endpoint: `dashboard/hr/employees/${employeId}/edit`,
    queryKey: [`dashboard/hr/employees/${employeId}/edit`],
  });
  console.log(data);
  return (
    <div className="w-100">
      <StatisticsProfileEmploye data={data?.data} />
      <h3 className="text-[red] text-center mb-3">
        {/* {t("Total hours are less than the required hours")} */}
      </h3>

      <div className="w-100">
        <TabsProfileEmploye EditingData={EditingData} employeId={employeId} />
      </div>
    </div>
  );
}
export default ProfilePageEmploye;
