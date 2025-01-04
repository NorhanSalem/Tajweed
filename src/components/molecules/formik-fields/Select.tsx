import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  Theme,
} from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { SelectOption_TP } from "../../../types";
import { FormikError, Label, Spinner } from "../../atoms";
import { Modal } from "../Modal";
import { t } from "i18next";

type Select_TP = {
  value?:
    | SingleValue<SelectOption_TP>
    | MultiValue<SelectOption_TP>
    | undefined;
  label?: string;
  name?: string;
  style?: string;
  labelStyle?: string;
  modalTitle?: string;
  id: string;
  isMulti?: boolean;
  required?: boolean;
  placeholder?: string;
  loadingPlaceholder?: string;
  labelCss?: string;
  options: SelectOption_TP[] | undefined;
  loading?: boolean;
  onChange?: (
    option: SingleValue<SelectOption_TP> | MultiValue<SelectOption_TP>
  ) => void | undefined;
  creatable?: boolean;
  formatCreateLabel?: (inputValue: string) => string;
  fieldKey?: "id" | "value";
  isDisabled?: boolean;
  onSimpleCreate?: (inputValue: string) => void;
  onComplexCreate?: (inputValue: string) => void;
  CreateComponent?: ({
    value,
    onAdd,
    setSelectOptions,
  }: {
    value: string;
    onAdd: (value: string) => void;
    setSelectOptions?: (options: any[]) => void;
  }) => JSX.Element;
  setOptions?: (options: any[]) => void;
  defaultValue?: SelectOption_TP;
};

const selectTheme = (theme: Theme) => {
  const isDarkMode = document.body.classList.contains("dark");

  return {
    ...theme,
    borderRadius: 5,
    colors: {
      ...theme.colors,
      neutral80: isDarkMode ? "#FFFFFF" : "#295E56",
      primary25: isDarkMode ? "#2d2d2d" : "#e9eeed",
      primary: isDarkMode ? "#FFFFFF" : "#295E56",
    },
  };
};

const selectClassNames = (touched: boolean, error: boolean) => ({
  control: ({ menuIsOpen }: { menuIsOpen: boolean }) =>
    `border-style !rounded-md !shadow-none  !shadow-md !border-1 dark:!bg-[#151521] dark:!text-white dark:!border-dark-borderDark  date-range-lib ${
      touched && error ? " !border-mainRed" : ""
    } 
                  ${menuIsOpen && "!border-[rgba(0, 29, 110, 0.4)] "}

                  `,
  dropdownIndicator: () => `!text-mainGreen z-[999999]`,
  valueContainer: () => `!overflow-x-auto !overflow-y-hidden scrollbar  `,
});

export const SelectComp = ({
  label,
  name,
  id,
  isMulti,
  required,
  placeholder,
  loadingPlaceholder,
  options,
  loading,
  onChange,
  isDisabled,
  creatable = false,
  formatCreateLabel,
  fieldKey = "value",
  onSimpleCreate,
  CreateComponent,
  onComplexCreate,
  setOptions,
  modalTitle,
  defaultValue,
  style,
  labelStyle,
  labelCss,
  ...props
}: Select_TP) => {
  const animatedComponents = makeAnimated();
  const { setFieldValue, errors, touched, handleBlur } = useFormikContext<{
    [key: string]: any;
  }>();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const customNoOptionsMessage = () => t("No options");
  const [createValue, setCreateValue] = useState("");
  const handleCreate = (inputValue: string) => {
    if (onSimpleCreate) {
      onSimpleCreate(inputValue);
    } else if (CreateComponent) {
      setCreateModalOpen(true);
      setCreateValue(inputValue);
    }
  };

  var selectProps = {
    ...props,
    components: {
      ...animatedComponents,
      LoadingIndicator: () => <Spinner className="ml-2" size="medium" />,
    },
    id: id,
    defaultValue,
    name,

    isMulti,
    required,
    placeholder: loading ? loadingPlaceholder : placeholder,
    options,
    isLoading: loading && !isDisabled,
    isDisabled: loading || isDisabled,
    classNames: selectClassNames(
      !!touched[name as string],
      !!errors[name as string]
    ),
    theme: selectTheme,
    onBlur: handleBlur(name) as (e: ChangeEvent) => void,
    onChange: (
      option: SingleValue<SelectOption_TP> | MultiValue<SelectOption_TP>,
      actionMeta: ActionMeta<SelectOption_TP>
    ) => {
      if (setFieldValue) {
        setFieldValue(
          name as string,
          isMulti
            ? (option as MultiValue<SelectOption_TP>).map(
                (option) => option[fieldKey]
              )
            : (option as SelectOption_TP)[fieldKey],

          true
        );
      }
      if (onChange) {
        onChange(option);
      }
    },
  };

  return (
    <>
      <div className="col-span-1">
        <div className={`flex flex-row gap-1 ${labelStyle}`}>
          {label && (
            <Label
              htmlFor={id}
              className={`mb-2 text-sm hidden md:block w-[4rem] ${labelCss}`}
            >
              {label}
            </Label>
          )}
          {creatable ? (
            <>
              <CreatableSelect
                {...selectProps}
                formatCreateLabel={formatCreateLabel}
                onCreateOption={handleCreate}
              />
              {CreateComponent && (
                <Modal
                  title={modalTitle || "Create new option"}
                  isOpen={creatable && createModalOpen}
                  onClose={() => {
                    setCreateModalOpen(false);
                  }}
                >
                  {
                    <CreateComponent
                      onAdd={(createValue) => {
                        onComplexCreate && onComplexCreate(createValue);
                        setCreateModalOpen(false);
                      }}
                      value={createValue}
                      setSelectOptions={setOptions}
                    />
                  }
                </Modal>
              )}
            </>
          ) : (
            <Select
              className={`${style}`}
              {...selectProps}
              //  menuPlacement="auto"

              noOptionsMessage={customNoOptionsMessage}
            />
          )}
        </div>
        <FormikError name={name as string} />
      </div>
    </>
  );
};
