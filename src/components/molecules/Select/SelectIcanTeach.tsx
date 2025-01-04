import { useFormikContext } from "formik"
import { t } from "i18next"
import CreatableSelect from "react-select/creatable"

type CanTeach_Tp = {
  updateData?: any
  resetForm?: any
  onChange?: (option: any) => void
  name?: string | undefined
  label: string
  placeholder?: string
}
export default function SelectIcanTeach({
  updateData,
  onChange,
  name,
  placeholder,
  label,
}: CanTeach_Tp) {
  const { setFieldValue, values, touched, errors } = useFormikContext()
  return (
    <div className="h-full">
      {/* <SelectComp2
        loadingPlaceholder={`${t("loading")}`}
        fieldKey={"value"} // Assuming "value" is the key in your teaching_fields objects
        label={label}
        id="optionStatus "
        creatable={true}
        options={dataOptionsWithTeachingFields}
        // value={value}
        name={name}
        isMulti
        options={values[name]}
        value={values[name]}
        onChange={(selectedOptions: Array<{ label: string; value: any }>) => {
          //@ts-ignore
          setFieldValue("teaching_fields", selectedOptions)
        }}
        // defaultValue={values.teaching_fields}
      /> */}
      <div className="h-full col-span-1">
        <div className="flex flex-col h-full gap-1 select2-contaries creatable-select-style">
          <label className="mb-[8px] text-mainBlack">{label}</label>
          <CreatableSelect
            classNames={
              //@ts-ignore
              (!!touched[name as string],
              //@ts-ignore

              !!errors[name as string])
            }
            placeholder={t("I Can Speak")}
            isMulti
            //@ts-ignore

            options={values[name]}
            //@ts-ignore

            value={values[name]}
            onChange={(e) => {
              //@ts-ignore
              setFieldValue(name, e)
            }}
          />
        </div>
      </div>
    </div>
  )
}
