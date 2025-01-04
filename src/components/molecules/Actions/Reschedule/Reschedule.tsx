import { useState, useEffect } from "react";
import { useFetch, useIsRTL, useMutate } from "../../../../hooks";
import { notify } from "../../../../utils/toast";
import { InnerFormLayout } from "../../InnerFormLayout";
import { Button } from "../../../atoms";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { DatePicker } from "@mantine/dates";
import { useTranslation } from "react-i18next";
import { Select } from "../../../molecules";
import { Formik } from "formik";
import TimePicker from "../../TimePicker";
import { formatDate } from "../../../../utils/date";

type Reschedule_Tp = {
  session_id?: string;
  refetch: () => void;
  data: any;
  setOpenModal: any;
};

function Reschedule({ refetch, data, setOpenModal }: Reschedule_Tp) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availablePeriods, setAvailablePeriods] = useState<any[]>([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>("");
  const [newDate, setNewDate] = useState<string | null>(null);
  console.log("from where ", data.session_duration);
  useEffect(() => {
    if (data.date) {
      const initialDate = new Date(data.date);
      setSelectedDate(initialDate);
      setNewDate(data.date); // Keep the original date as newDate
    }
  }, [data.date]);

  const isRTL = useIsRTL();
  const endpoint = `dashboard/teachers/${data?.teacherId}/available-worktimes`;

  const {
    isLoading,
    refetch: refetchAllTimeAvailable,
    data: allTimeAvailableData = { data: [] },
  } = useFetch<any>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!data?.teacherId,
  });

  const formatAvailablePeriods = () => {
    return availablePeriods.map((period) => ({
      id: period.id,
      label: period.time,
      value: period.id,
    }));
  };

  const formatTimeForBackend = (time: string) => {
    const [timePart, suffix] = time?.split(" ");
    const [hourPart, minutePart] = timePart.split(":");
    let hour = parseInt(hourPart, 10);
    const minute = parseInt(minutePart, 10);

    if (isNaN(hour) || isNaN(minute)) return "00:00:00";

    if (suffix === "PM" && hour < 12) hour += 12;
    if (suffix === "AM" && hour === 12) hour = 0;

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    return `${formattedHour}:${formattedMinute}:00`;
  };

  const { mutate, isLoading: submitFormLoading } = useMutate({
    endpoint: `dashboard/sessions/change-session/${data?.session_id}`,
    mutationKey: [`Reschedule/${data?.session_id}`],
    onSuccess: () => {
      notify("success", t("Class rescheduled successfully"));
      refetch();
      setOpenModal(false);
    },
    onError: (err) => {
      notify("error", err.response?.data?.message);
    },
    formData: true,
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const formattedDate = localDate.toISOString().split("T")[0];
      setNewDate(formattedDate); // Update newDate with the selected date
      setSelectedDate(date); // Update selectedDate state
    } else {
      setNewDate(null);
      setSelectedDate(null);
    }
  };

  useEffect(() => {
    if (selectedDate && Array.isArray(allTimeAvailableData?.data)) {
      const localDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
      const formattedDate = localDate.toISOString().split("T")[0];

      const selectedDay = allTimeAvailableData.data.find(
        (item: any) => item.date === formattedDate
      );
      setAvailablePeriods(selectedDay?.periods || []);
    }
  }, [selectedDate, allTimeAvailableData]);

  const handleSubmit = (values: any) => {
    mutate({
      dates: newDate || data.date,
      time: values.time,
      teacher_id: values.teacher_id,
      duration: values.duration,
    });
  };

  const createDuration = () => {
    const allowedDurations = [30, 60, 90, 120, 150];
    return allowedDurations.map((duration) => ({
      label: `${duration}`,
      value: duration,
    }));
  };

  return (
    <Formik
      initialValues={{
        time: data ? data.time : "",
        teacher_id: data.teacherId,
        dates: [],
        duration: "",
      }}
      onSubmit={handleSubmit}
      // Use useEffect here to set initial duration
      enableReinitialize // This allows the Formik form to reinitialize with new props
    >
      {(formik) => {
        const { setFieldValue } = formik;

        useEffect(() => {
          if (data.session_duration) {
            setFieldValue("duration", data.session_duration);
          }
        }, [data.session_duration, setFieldValue]); // Add setFieldValue to dependencies

        return (
          <>
            {!data ? (
              <Loading />
            ) : (
              <InnerFormLayout
                title={t("Reschedule")}
                showpopuptitle={true}
                customStyle={"w-full"}
              >
                <div className="p-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="flex flex-col gap-5 col-span-2">
                      <div className="flex flex-col">
                        <label
                          htmlFor="teacherSelect"
                          className="hidden md:block mb-2 rtl:text-right"
                        >
                          {t("Teacher")}
                        </label>
                        <select
                          id="teacherSelect"
                          disabled
                          className="p-2 border rtl:bg-left rounded w-full"
                        >
                          <option value="">{data.teacherName}</option>
                        </select>
                      </div>
                      <div className="">
                        <TimePicker name="time" label={t("Time")}
                          onChange={(option) =>
                            setFieldValue("time", option.value)
                          }
                        />
                      </div>
                      <div>
                        <Select
                          placeholder={`${t("duration")}`}
                          label={`${t("Class time")}`}
                          id="duration"
                          name="duration"
                          loadingPlaceholder={`${t("loading")}`}
                          options={createDuration()}
                          onChange={(option) =>
                            setFieldValue("duration", option?.value)
                          }
                          defaultValue={{
                            value: data.session_duration,
                            label: data.session_duration,
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col col-span-3">
                      <DatePicker
                        locale={isRTL ? "ar" : "en"}
                        className="border p-2 rounded-lg dark:bg-dark-primary mx-auto w-full"
                        placeholder={t("Select dates")}
                        value={selectedDate} // Use selectedDate
                        onChange={handleDateChange}
                        styles={{
                          day: {
                            "&.available-day": {
                              backgroundColor: "#e6f3f2",
                              color: "#11897d",
                            },
                            "&[data-selected], &[data-selected]:hover": {
                              backgroundColor: `#11897d`,
                              color: "white",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mx-auto mt-8 block"
                    action={formik.handleSubmit}
                    loading={submitFormLoading}
                  >
                    {t("Confirm")}
                  </Button>
                </div>
              </InnerFormLayout>
            )}
          </>
        );
      }}
    </Formik>
  );
}

export default Reschedule;
