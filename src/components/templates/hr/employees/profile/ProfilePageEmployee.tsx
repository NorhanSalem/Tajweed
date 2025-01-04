import { useParams } from "react-router";
import { useFetch } from "../../../../../hooks";
import TabsProfileEmploye from "../../../../organisms/card/TabsProfileEmploye";
import StatisticsProfileEmployee from "./StatisticsProfileEmployee";
import { Helmet } from "react-helmet-async";

type ProfilePageEmploy_TP = {
  title: string;
};

function ProfilePageEmploye({ title }: ProfilePageEmploy_TP) {
  const employId = useParams().employeeId;
  console.log(employId);
  const { data } = useFetch<any>({
    endpoint: `dashboard/hr/employees/${employId}`,
    queryKey: [`dashboard/hr/employees/${employId}`],
  });

  console.log(data);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="w-100">
        <StatisticsProfileEmployee data={data?.data} />

        <div className="w-100">
          <TabsProfileEmploye employeId={employId} />
        </div>
      </div>
    </>
  );
}
export default ProfilePageEmploye;
