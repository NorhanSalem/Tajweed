import { DatePicker } from "@mantine/dates";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
import { formatDate } from "../../../../utils/date";
import { useState } from "react";
import { useFetch, useIsRTL, useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import { Button, Label } from "../../../atoms";
import { Tabs } from "@mantine/core";
import RescheduleDays from "../../../templates/incomingSessions/RescheduleDays";
import ReschedulePeriods from "../../../templates/incomingSessions/ReschedulePeriods";
import { InnerFormLayout } from "../../InnerFormLayout";
import { convertTo24Hour } from "../../../../utils/helpers";

type Reschedule_Tp = {
  session_id?: string;
  refetch: () => void;
  data: any;
  setOpenModal: any;
};
function Reschedule2({ refetch, data, setOpenModal }: Reschedule_Tp) {
  console.log("🚀 ~ data:", data);
  const isRTL = useIsRTL();
  const { mutate, isLoading: submitFormLoading } = useMutate({
    endpoint: `dashboard/sessions/change-session/${data?.session_id}`,
    mutationKey: [`Reschedule/${data?.session_id}`],
    onSuccess: () => {
      notify("success", `${t("Class rescheduled successfully")}`);
      refetch();
      setOpenModal(false);
    },
    onError: (err) => {
      notify("error", err.response?.data?.message);
    },
    formData: true,
  });
  let timeString = data?.time;
  timeString = timeString.replace(/م/g, "PM").replace(/ص/g, "AM");
  return (
    <>
      <div className="">
        <InnerFormLayout
          customStyle="p-8"
          title={`${t("Reschedule")}`}
          showpopuptitle={true}
        >
          <Formik
            initialValues={{
              time: convertTo24Hour(timeString),
              date: data?.date,
            }}
            onSubmit={(values) => {
              console.log("🚀 ~ Reschedule ~ values:", values);
              mutate({
                ...values,
                date: formatDate(values?.date)
                  ? formatDate(values?.date)
                  : data?.date,
              });
            }}
          >
            {(formik) => {
              const { setFieldValue, values } = formik;

              return (
                <Form>
                  <div>
                    <input
                      type="time"
                      name="time"
                      className="rounded-md m-0 border p-3  text-[14px] sm:text-[16px] !w-full"
                      placeholder={`${t("Select time")}`}
                      value={values?.time}
                      onChange={(e) =>
                        setFieldValue("time", `${e.target.value}:00`)
                      }
                    />
                  </div>
                  <div className="text-start my-2">
                    <Label
                      children={`${t("Dates")}`}
                      htmlFor="dates"
                      className="mb-2 text-start"
                    />
                    <DatePicker
                      locale={isRTL ? "ar" : "en"}
                      className="border p-2 rounded-lg dark:bg-dark-primary mx-auto w-fit"
                      id="date"
                      placeholder={`${t("Select dates")}`}
                      type="default"
                      onChange={(date) => setFieldValue("date", date)}
                      value={values?.date}
                      minDate={new Date()}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitFormLoading}
                    className="mx-auto mt-5 block"
                  >
                    {t("Confirm")}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </InnerFormLayout>
      </div>
    </>
  );
}

export default Reschedule2;
