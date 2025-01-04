// ... (other imports)

import { useFormikContext } from "formik";
import { t } from "i18next";
import { AsyncPaginate } from "react-select-async-paginate";
import { request } from "../../../utils/axios-util";
import { Label, Spinner } from "../../atoms";

export default function SelectStudent({ name, student_name, multi }: any) {
  const defaultAdditional: any = {
    page: 1,
  };

  const { values, setFieldValue } = useFormikContext<any>();

  async function loadStudentOptions(search: any, { page }: any) {
    const response = await request({
      url: `dashboard/students?pagenate=100&search=${search}&page=${
        page ? page : "1"
      }&    is_active= 1
      `,
    });
    //@ts-ignore
    const StudentOptions = await response?.students.map((student: any) => ({
      label: student?.name,
      value: student?.id,
    }));
    const optionsWithStatic = [
      { label: t("All"), value: "all" },
      ...StudentOptions,
    ];
    return {
      options: optionsWithStatic,
      hasMore:
        //@ts-ignore

        response?.paginate?.total_pages > response?.paginate?.current_page
          ? true
          : false,
      additional: {
        page: page + 1,
      },
    };
  }
  const isValueSet = values[name] && values[name];
  const defaultValue = isValueSet
    ? { value: values[name], label: values[name] }
    : null;

  return (
    <div>
      <Label children={`${t("students")}`} htmlFor="teacher" className="mb-2" />

      <AsyncPaginate
        additional={defaultAdditional}
        loadOptions={loadStudentOptions}
        onChange={(option) =>
          setFieldValue(name, multi ? option : option?.value)
        }
        isSearchable
        escapeClearsValue
        isMulti={multi ? true : false}
        loadingMessage={() => <Spinner variant="primary" />}
        defaultValue={defaultValue}
      />
    </div>
  );
}
