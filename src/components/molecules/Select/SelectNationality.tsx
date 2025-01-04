import { Form, Formik } from "formik";

import { t } from "i18next";
import { Select } from "..";
import { useFetch } from "../../../hooks";
import * as Yup from "yup";
import { requiredTranslation } from "../../../utils/helpers";

type SelectNationality_tp = {
  setStatus?: any;
  updateData?: any;
  resetForm?: any;
  onChange?: (option: any) => void;
  NationalityName?: string | undefined;
  label?: string;
  fieldKey?: any;
  placeholder?: string;
};
export default function SelectNationality({
  setStatus,
  updateData,
  resetForm,
  fieldKey,
  onChange,
  NationalityName,
  placeholder = t("Choose nationality"),
  label,
}: SelectNationality_tp) {
  const {
    data: NationalityOptions,
    isLoading: NationalityLoading,
    failureReason,
  } = useFetch<any>({
    queryKey: ["dashboard/nationally"],
    endpoint: `dashboard/countries?show_all=${true}`,

    onSuccess(data) {},
  });
  const NationalityValidatingSchema = () =>
    Yup.object({
      nationality_id: Yup.string().trim().required(requiredTranslation),
    });

  const dataOptions = NationalityOptions?.data?.map((state: any) => ({
    value: state.id,
    label: state.nationality,
  }));

  return (
    <div>
      <Select
        placeholder={placeholder}
        label={label}
        id="optionStatus"
        name={NationalityName}
        isDisabled={!NationalityLoading && !!failureReason}
        loadingPlaceholder={`${t("loading")}`}
        loading={NationalityLoading}
        options={dataOptions}
        onChange={onChange}
        defaultValue={{
          value: !resetForm ? updateData?.nationality?.id : "",
          label: !resetForm
            ? updateData?.nationality?.nationality?.ar
            : t("Choose nationality"),
        }}
      />
    </div>
  );
}
