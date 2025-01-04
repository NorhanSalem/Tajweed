import { t } from "i18next";
import React from "react";
import { EditIcon } from "../atoms/icons";
import { TextAreaField } from "./formik-fields";
import { notify } from "../../utils/toast";
import { useMutate } from "../../hooks";
import { Form, Formik } from "formik";
import { Button } from "../atoms";
import { useParams } from "react-router-dom";

type RatingTeacher_TP = {
  data: any;
  refetch: any;
  setOpenModal: any;
};
function RatingTeacher({
  data,
  refetch,
  setOpenModal,
}: RatingTeacher_TP) {
  const {teacherId} = useParams()
  const { mutate, isLoading: submitFormLoading } = useMutate({
    mutationKey: [`dashboard/teachers/ratings/${data.id}`],
    endpoint: `dashboard/teachers/update-rating/${data.id}`,
    onSuccess: (data) => {
      refetch();
      notify("success");
      setOpenModal(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });
  return (
    <div className="pt-10 pb-5 px-7 text-start">
      <div className="flex justify-between my-5">
        <h2 className="text-center text-2xl">{t("Edit rating")}</h2>
      </div>
      <div>
        <Formik
          initialValues={{ rating_comment: data?.rating_comment }}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          <Form>
            <TextAreaField
              id=""
              name="rating_comment"
              // value={detailsRatingTeacher}
              className="w-full  border border-gray-200 rounded-md"
              rows={15}
              placeholder=""
              label=""
            />
            <Button type="submit" disabled={submitFormLoading}>
              {t("Save")}
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default RatingTeacher;
