import { Button, Menu } from "@mantine/core";
import { useFetch } from "../../../hooks";
import { t } from "i18next";

function InterviewMene({
  placeholder,
  setStatus,
  setDataTeacherID,
  data,
  mutate,
}: any) {
  const {
    data: StatusOptions,
    isLoading: StatusLoading,
    failureReason,
  } = useFetch<any>({
    endpoint: "dashboard/teachers/interview-status",
    queryKey: ["interview-status"],
    onSuccess() {},
  });

  const mapStatusOptions = (options: any) => {
    return (
      options?.data?.map((state: any) => ({
        value: state.key,
        label: state.value,
      })) || []
    );
  };

  const dataOptions = [...mapStatusOptions(StatusOptions)];

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button className=" bg-transparent hover:bg-transparent text-black !border-mainBlue border-solid rounded-md ">
          {placeholder ? placeholder : t("interview status")}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {dataOptions?.map((item) => (
          <Menu.Item
            className="rtl:text-start"
            onClick={(option) => {
              //@ts-ignore
              setStatus(item?.value);
              {
                setDataTeacherID && setDataTeacherID(data?.id);
              }

              {
                mutate && mutate({ interview_status: item?.value });
              }
            }}
          >
            {" "}
            {item?.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
export default InterviewMene;
