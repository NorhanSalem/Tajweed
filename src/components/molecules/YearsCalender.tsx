import { useFormikContext } from "formik"
import { useState } from "react"
import { Label } from "../atoms"

export default function YearsCalender({
  labelProps,
  label,
  className,
  name,
  Placeholder,
  value,
}: {
  labelProps?: string
  label: string
  name: string
  className?: string
  Placeholder:string
  value?: Date
}) {
  const years = Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, index) => 1970 + index
  )

  const { setFieldValue, errors, touched, handleBlur, values } =
    useFormikContext<{ [key: string]: any }>()

  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-1 ">
        {label && (
          <Label
            htmlFor={name}
            //@ts-ignore
            {...labelProps}
            className="mb-3"
          >
            {label}
          </Label>
        )}
        <select
          name={name}
          value={value ? value : values[name]}
          onChange={(e) => {
            setFieldValue(name, e.target.value)
          }}
          onBlur={handleBlur(name)}
          className={`w-full p-[10px] px-[45px] rounded-[5px]  border border-[hsl(0, 0%, 80%)]  ${className}`}
        >
          <option value="" disabled>
            {Placeholder}
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
