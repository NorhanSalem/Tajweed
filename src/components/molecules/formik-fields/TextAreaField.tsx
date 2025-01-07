import { useFormikContext } from "formik";
import { TextAreaInputProp_TP } from "../../atoms/inputs/TextAreaInput";

import { FormikError, Label, TextAreaInput } from "../../atoms";
import { Style } from "ckeditor5";

export const TextAreaField = ({
  label,
  name,
  placeholder,
  id,
  required,
  style,
  labelStyle,
  ...props
}: {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  style?: string;
  labelStyle?: string;
} & TextAreaInputProp_TP) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext<{
      [key: string]: any;
    }>();
  return (
    <div className="col-span-1">
      <Label htmlFor={id} required={required} className={labelStyle}>
        {label}
      </Label>
      <TextAreaInput
        placeholder={placeholder}
        id={id}
        value={props.value || values[name]}
        className={`mt-3 ${
          touched[name as string] &&
          !!errors[name as string] &&
          "!border-mainRed border-2"
        } ${style}`}
        onChange={(e) => {
          if (props.value === undefined) {
            // setFieldValueState(e.target.value)
            setFieldValue(name, e.target.value);
          }
        }}
        onBlur={() => {
          setFieldTouched(name as string, true);
        }}
        {...props}
      />

      <FormikError name={name as string} />
    </div>
  );
};
