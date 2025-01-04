// ... (other imports)

import { useFormikContext } from "formik";
import { t } from "i18next";
import { AsyncPaginate } from "react-select-async-paginate";
import { request } from "../../../utils/axios-util";
import { Label, Spinner } from "../../atoms";

export default function SelectTeacher({ name, teacher_name, multi }: any) {
  const defaultAdditional: any = {
    page: 1,
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "2px solid #ccc",
      boxShadow: state.isFocused ? "0 0 0 2px #3699FF" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#3699FF" : null,
      color: state.isFocused ? "white" : null,
    }),
  };
  const { values, setFieldValue } = useFormikContext<any>();

  async function loadTeacherOptions(search: any, { page }: any) {
    const response = await request({
      url: `dashboard/teachers?pagenate=100&search=${search}&page=${
        page ? page : "1"
      }& is_active=1
      `,
    });

    //@ts-ignore
    const teacherOptions = await response?.teachers.map((teacher: any) => ({
      label: teacher?.name,
      value: teacher?.id,
    }));
    const optionsWithStatic = [
      { label: t("All"), value: "all" },
      ...teacherOptions,
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
      <Label children={`${t("Teacher")}`} htmlFor="teacher" className="mb-2" />

      <AsyncPaginate
        additional={defaultAdditional}
        loadOptions={loadTeacherOptions}
        onChange={(option: any) =>
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
