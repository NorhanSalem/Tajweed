import { useParams } from "react-router";
import { useFetch } from "../../../hooks";
import TabsProfile from "../../organisms/card/TabsProfile";
import StatisticsProfile from "./StatisticsProfile";
import { Formik, Form } from "formik";
import { notify } from "../../../utils/toast";
import { useMutate } from "../../../hooks";

type ProfilePage_TP = {
  title: String;
};
type InitialValues_TP = {
  profile: string;
};
function ProfilePage({ title }: ProfilePage_TP) {
  const { teacherId } = useParams();

  const { data } = useFetch<any>({
    endpoint: `dashboard/teachers/${teacherId}`,
    queryKey: [`dashboard/teachers/${teacherId}`],
  });
  const initialValues: InitialValues_TP = {
    profile: data?.data?.model?.profile,
  };
  const { mutate: update, isLoading } = useMutate({
    mutationKey: ["dashboard/teachers"],
    endpoint: `dashboard/teachers/${teacherId}`,
    onSuccess: (data: InitialValues_TP) => {
      notify("success");
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },

    formData: true,
  });
  return (
    <div className="w-100">
      <Formik
        onSubmit={(values: any) => {
          // console.log(values);
          // update({
          //   ...values,
          //   _method: "put",
          //   profile: values.profile,
          // });
        }}
        initialValues={initialValues}
      >
        <Form>
          <StatisticsProfile data={data?.data} />
          <h3 className="text-[red] text-center mb-3">
            {data?.data?.model.valid_teacher}
          </h3>
        </Form>
      </Formik>
      <div className="w-100">
        <TabsProfile EditingData={data} teacherId={teacherId} />
      </div>
    </div>
  );
}
export default ProfilePage;
