/////////// IMPORTS
///
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMutate } from "../../../hooks";
import { requiredTranslation } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import MainDataSendMessageAllUser from "./MainDataSendMessageAllUser";
///
/////////// Types
///
type AddMessageAllUser_props = {
  title?: string;
  dataSource?: any;
  updateData?: any;
  setModel?: any;
  resetForm?: any;
  refetch: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddMessageAllUser = ({
  title,
  dataSource,
  setModel,
  resetForm,
  updateData,
  refetch,
}: AddMessageAllUser_props) => {
  /////////// VARIABLES
  ///

  type InitialValues_TP = {
    student_ids: [];
    teacher_ids: [];
    message: string;
    message_type: "text" | "image";
  };

  const messageValidation = () =>
    Yup.object({
      message: Yup.string().trim().required(requiredTranslation),
      message_type: Yup.string().trim().required(requiredTranslation),
    });

  const initialValues: InitialValues_TP = {
    student_ids: '',
    teacher_ids: '',
    message: "",
    message_type: "text",
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["core/admin-chat/send-message-for-users"],
    endpoint: `core/admin-chat/send-message-for-users`,
    onSuccess: (data: InitialValues_TP) => {
      setModel(false);
      notify("success");
      refetch();
    },
    onError: (err) => {
      notify("error", err.response.data.message);
    },
    formData: true,
  });
  const handleSubmit = (values: any) => {
    if (values.message_type == "image") {
      delete values.message;
    } else {
      delete values?.image;
    }
    const finalOut = {
      ...values,
      student_ids: values?.student_ids
        ? values?.student_ids?.map((item: { value: string }) => item.value)
        : null,
      teacher_ids: values?.teacher_ids
        ? values?.teacher_ids?.map((item: { value: string }) => item.value)
        : null,
      file: values.message_type == "image" ? values?.file[0] : null,
    }
    mutate(finalOut);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={messageValidation}
        onSubmit={(values: any) => handleSubmit(values)}
      >
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              header={title}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mt-8"
                  loading={isLoading}
                >
                  {t("submit")}
                </Button>
              }
            >
              <MainDataSendMessageAllUser />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
          
    </>
  );
};
