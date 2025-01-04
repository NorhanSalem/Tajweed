import { useFormikContext } from "formik"
import { default as BasePhoneInput } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import "react-phone-number-input/style.css"
import { tv } from "tailwind-variants"
import { useIsRTL } from "../../../hooks"
import i18n from "../../../i18n"
import { FormikError } from "../../atoms"
import { Label } from "../../atoms/Label"
import { Dispatch, SetStateAction } from "react"

type PhoneInputs_TP = {
  label: string
  name: "phone" | "mobile"
  placeholder: string
  setPhone_country?:any
}

const phoneInput = tv({
  base: "rounded-md border-2 border-transparent focus:border-2 focus:border-mainGreen form-input px-4 py-[.30rem] w-full shadows bg-white dark:bg-dark-tertiary dark:text-white",
  variants: {
    error: {
      true: "border-mainRed !rounded-md !border-2",
    },
  },
})

export const PhoneInput = ({
  label,
  name,
  placeholder,
  setPhone_country,
}: PhoneInputs_TP) => {
  const { setFieldValue, errors, touched, handleBlur } = useFormikContext<any>()

  const isRTL = useIsRTL()

  const textDir = isRTL ? "right" : "left"
  const inputPhone = document.querySelector(".PhoneInputInput")
  const phoneStyle = `text-align: ${textDir};`
  if (inputPhone) {
    //@ts-ignore
    inputPhone!.style.cssText = phoneStyle
  }

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-1">
          <Label htmlFor={name}>{label}</Label>

          <BasePhoneInput
            onBlur={handleBlur(name)}
            className={phoneInput({
              error: touched[name] && !!errors.phone,
            })}
            flags={flags}
            placeholder={placeholder}
            name={name}
            onChange={(number: number | string | undefined) => {
              setFieldValue(name, number)
            }}
            style={{ direction: "ltr" }}
            onCountryChange={(country)=>setPhone_country(country)} // Add this prop to log country key
          />
        </div>
        <FormikError name={name} />
      </div>
    </>
  )
}
