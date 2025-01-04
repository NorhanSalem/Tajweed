import { t } from "i18next";
import React from "react";
import { EditIcon } from "../atoms/icons";
import { TextAreaField } from "./formik-fields";
import { notify } from "../../utils/toast";
import { useMutate } from "../../hooks";
import { Form, Formik } from "formik";
import { Button } from "../atoms";

type Report_TP = {
  detailsReport: any;
  refetch: any;
  sessionId: any;
  setOpenReport:any
};
function Report({ detailsReport, refetch, sessionId , setOpenReport }: Report_TP) {
  const { mutate, isLoading: submitFormLoading } = useMutate({
    mutationKey: [`teacher/editReport/${sessionId}`],
    endpoint: `dashboard/teacher/editReport/${sessionId}`,
    onSuccess: (data) => {
      refetch();
      notify("success");
      setOpenReport(false)
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });
  return (
    <div className="pt-10 pb-5 px-7 text-start">
      <div className="flex justify-between my-5">
        <h2 className="text-center text-2xl">{t("Details Report")}</h2>
        <EditIcon />
      </div>
      <div>
        <Formik
          initialValues={{ report: detailsReport }}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          <Form>
            <TextAreaField
              id=""
              name="report"
              // value={detailsReport}
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

export default Report;
