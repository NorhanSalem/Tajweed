import { t } from "i18next";
import { useParams } from "react-router";
import { useFetch } from "../../../hooks";
import TabsProfileStudent from "../../organisms/card/TabsProfileStudent";
import StatisticsProfileStudent from "./StatisticsProfileStudent";
import { Helmet } from "react-helmet-async";

type ProfilePageStudent_TP = {
  title: string;
};

function ProfilePageStudent({ title }: ProfilePageStudent_TP) {
  const { studentId } = useParams();

  // data Teacher
  const { data } = useFetch<any>({
    endpoint: `dashboard/students/${studentId}`,
    queryKey: [`dashboard/students/${studentId}`],
  });
  const { data: Profile } = useFetch<any>({
    endpoint: `dashboard/students/token/${studentId}`,
    queryKey: [`dashboard/students/token/${studentId}`],
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="w-100">
        <StatisticsProfileStudent Profile={Profile}  data={data?.data} studentId={studentId} />

        <div className="w-100">
          <TabsProfileStudent studentId={studentId} />
        </div>
      </div>
    </>
  );
}
export default ProfilePageStudent;
