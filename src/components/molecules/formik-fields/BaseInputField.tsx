import { useFormikContext } from "formik";
import { BaseInput, FormikError, Label } from "../../atoms";
import UploadImg from "../UploadImg";
import { TextAreaField } from "./TextAreaField";
import { useState } from "react";

export const BaseInputField = ({
  label,
  id,
  required,
  labelProps,
  setImgUpload,
  valueTextArear,
  labelStyle,
  Style,
  placeholder,
  type = "text",
  onChange,
  value,
  ...props
}: {
  label?: string;
  id: string;
  setImgUpload?: any;
  valueTextArear?: any;
  required?: boolean;
  labelStyle?: string;
  Style?: string;
  labelProps?: {
    [key: string]: any;
  };
  name: string;
  onChange0?: (e: React.ChangeEvent) => void;
  type: "text" | "number" | "password" | "email" | "file" | "textarea";
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext<{
      [key: string]: any;
    }>();
  const [typePass, setTypePass] = useState("password");
  const changeable = () => {
    typePass === "password" ? setTypePass("text") : setTypePass("password");
  };

  return (
    <>
      <div className={` ${Style}`}>
        {label && (
          <Label
            htmlFor={id}
            {...labelProps}
            required={required}
            className={`mb-3 w-[6rem] text-sm ${labelStyle}`}
          >
            {label}
          </Label>
        )}
        <div className="inline-block w-[80%]">
          {type == "file" ? (
            <div className="col-span-2">
              <UploadImg name={props?.name} hidden={true} />
            </div>
          ) : type == "textarea" ? (
            <div className="col-span-1 ">
              <TextAreaField
                //@ts-ignore
                label={props?.label}
                name={props?.name}
                //@ts-ignore

                placeholder={placeholder}
                id={id}
                //value={props.value || values[props.name]}
              />
            </div>
          ) : (
            <div className="col-span-1 mt-[2px]">
              <BaseInput
                type={type === "password" ? typePass : type}
                id={id}
                {...props}
                // value={fieldValue}
                value={value ? value : props.value || values[props.name]}
                error={touched[props.name] && !!errors[props.name]}
                autoComplete="off"
                onBlur={() => {
                  setFieldTouched(props.name, true);
                }}
                placeholder={placeholder}
                onChange={
                  onChange
                    ? onChange
                    : (e) => {
                        if (props.value === undefined) {
                          // setFieldValueState(e.target.value)
                          setFieldValue(props.name, e.target.value);
                        }
                      }
                }
              />
            </div>
          )}
          <FormikError name={props.name} />
        </div>
      </div>
    </>
  );
};
