import { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { Loader } from "@mantine/core";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { request } from "../../../utils/axios-util";
import { Button, Label } from "../../atoms";
import { useMutate } from "../../../hooks";
import { InnerFormLayout, Select } from "../../molecules";
import { DatePicker } from "@mantine/dates";
import TimePicker from "../../molecules/TimePicker";
import { formatDate } from "../../../utils/date";
import "dayjs/locale/ar";
import { Spinner } from "../../atoms";
import { BaseInputField, TextAreaField } from "../../molecules";

import SubscribeToPackageForm from "./SubscribeToPackageForm"; // Import the new form

type BookSessionFormProps = {
  studentId: string;
  closeModal: () => void;
  refetch?: any;
  teacher_id: number;
};

function BookSessionForm({
  studentId,
  teacher_id,
  closeModal,
  refetch,
}: BookSessionFormProps) {
  const { t } = useTranslation();
  const [isTeacherOptionsLoading, setIsTeacherOptionsLoading] = useState(true);
  const [firstTeacherLabel, setFirstTeacherLabel] = useState(""); // State to hold first option label

  async function loadTeacherOptions(
    search: string,
    loadedOptions: any,
    { page }: any
  ) {
    setIsTeacherOptionsLoading(true);
    try {
      const response = await request({
        url: `/dashboard/all-teachers-student?teacher_id=${teacher_id}&search=${search}&page=${
          page || 1
        }`,
      });

      const teacherOptions = response?.teachers.map((teacher: any) => ({
        label: teacher?.name,
        value: teacher?.id,
      }));

      if (teacherOptions.length > 0 && !firstTeacherLabel) {
        setFirstTeacherLabel(teacherOptions[0].label);
      }

      return {
        options: teacherOptions,
        hasMore:
          response?.paginate?.total_pages > response?.paginate?.current_page,
        additional: {
          page: page + 1,
        },
      };
    } finally {
      setIsTeacherOptionsLoading(false);
    }
  }

  const { mutate, isLoading: submitFormLoading } = useMutate({
    endpoint: `dashboard/students/${studentId}/book-session`,
    mutationKey: [`dashboard/students/${studentId}/book-session`],
    onSuccess: () => {
      closeModal();
      if (refetch) refetch();
    },
    onError: (err) => {
      console.error(err);
    },
    formData: true,
  });

  useEffect(() => {
    loadTeacherOptions("", [], { page: 1 });
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          time: "",
          teacher_id: teacher_id,
          dates: [],
          duration: "",
        }}
        onSubmit={(values) => {
          mutate({
            ...values,
            dates: values.dates.map((date) => formatDate(date)),
            time: values.time,
            teacher_id: values.teacher_id,
          });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="dark:bg-[#1E1E2D] rtl:text-right">
            <InnerFormLayout
              customStyle="p-8"
              title={t("Book a class")}
              showpopuptitle={true}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-3">
                  <DatePicker
                    locale={t("ar")}
                    className="border p-2 rounded-lg dark:bg-dark-primary mx-auto w-fit"
                    id="dates"
                    placeholder={t("Select dates")}
                    type="multiple"
                    onChange={(dates) => setFieldValue("dates", dates)}
                    value={values.dates}
                    minDate={new Date()}
                    styles={{
                      day: {
                        "&[data-selected], &[data-selected]:hover": {
                          backgroundColor: `#11897d`,
                          color: "white",
                        },
                      },
                    }}
                  />
                </div>
                <div className="col-span-3 flex flex-col gap-4">
                  <div>
                    <Label
                      htmlFor="teacher"
                      className="mb-2 hidden md:block text-center"
                    >
                      {t("Book a class")}
                    </Label>
                    <div className="flex items-center">
                      <AsyncPaginate
                        className="w-full"
                        loadingMessage={() =>
                          isTeacherOptionsLoading ? (
                            <Loader size="sm" className="mx-auto" />
                          ) : (
                            ""
                          )
                        }
                        noOptionsMessage={() => <span>{t("No options")}</span>}
                        id="teacher"
                        placeholder={firstTeacherLabel || t("Teacher")}
                        loadOptions={loadTeacherOptions}
                        onChange={(option) =>
                          setFieldValue("teacher_id", option.value)
                        }
                        additional={{ page: 1 }}
                        debounceTimeout={300}
                      />
                      <div>{isTeacherOptionsLoading ? <Spinner /> : ""}</div>
                    </div>
                  </div>

                  <div className="">
                    <TimePicker
                      name="time"
                      label=""
                      onChange={(time) => setFieldValue("time", time)}
                    />
                  </div>

                  <div className="w-full">
                    <Select
                      placeholder={t("duration")}
                      id="duration"
                      name="duration"
                      loadingPlaceholder={t("loading")}
                      options={[
                        { label: "30", value: 30 },
                        { label: "60", value: 60 },
                        { label: "90", value: 90 },
                        { label: "120", value: 120 },
                        { label: "150", value: 150 },
                      ]}
                      onChange={(option) =>
                        setFieldValue("duration", option?.value)
                      }
                      labelStyle="lg:flex-col"
                      style="w-full"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={submitFormLoading}
                      className="mx-auto mt-5 block"
                    >
                      {t("Confirm")}
                    </Button>
                  </div>
                </div>
                <div className="col-span-3 ">
                  <Label
                    htmlFor="add-balance"
                    className="mb-2 hidden md:block text-center"
                  >
                    {t("Add balance")}
                  </Label>
                  <div className="lg:w-full ">
                    <BaseInputField
                      id="name"
                      name="wallet"
                      type="text"
                      placeholder={`${t("Balance")}`}
                      labelProps={{ className: "mb-1 " }}
                      className="mb-3 w-[10.5rem]"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <TextAreaField
                      label=" "
                      name="reason"
                      id="reason"
                      placeholder={`${t("Add reason")}`}
                      rows={3}
                    />
                    <Button
                      type="submit"
                      disabled={submitFormLoading}
                      className="mx-auto mt-5 block"
                    >
                      {t("submit")}
                    </Button>
                  </div>
                </div>
                <div className="col-span-3">
                  <SubscribeToPackageForm
                    studentId={studentId}
                    closeModal={closeModal}
                  />
                </div>
              </div>
            </InnerFormLayout>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default BookSessionForm;
