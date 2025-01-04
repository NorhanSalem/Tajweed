import { useFormikContext } from "formik";
import { BaseInput, Label } from "../../atoms";

type BaseInputRepeater_TP = {
  name: string;
  type: "text" | "number";
  id: string;
  placeholder: string;
  label: string;
  value: string;
  required: boolean;
  onChange: (e: { target: { value: string } }) => void;
};
function BaseInputRepeater({
  name,
  type,
  id,
  placeholder,
  label,
  required,
  value,
  onChange,
  ...props
}: BaseInputRepeater_TP) {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext<{
      [key: string]: any;
    }>();
  return (
    <div className="col-span-1 mt-[2px]">
      <Label htmlFor={id} required={required} className={`mb-3 text-sm flex justify-start`}>
        {label}
      </Label>
      <div className="">
        <BaseInput
          type={type}
          id={id}
          {...props}
          value={value || values[name]}
          error={touched[name] && !!errors[name]}
          autoComplete="off"
          onBlur={() => {
            setFieldTouched(name, true);
          }}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default BaseInputRepeater;
