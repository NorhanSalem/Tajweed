export interface TextAreaInputProp_TP
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  override?: boolean;
  autocomplete?: string;
}

const BASE_CLASS_NAME =
  'form-textarea w-full dark:bg-[#151521] dark:text-white rounded-md base-text-area-style border-1 border-[rgba(0, 29, 110, 0.4)] focus:!border-1 focus:!border-[rgba(0, 29, 110, 0.7)]';

export const TextAreaInput = ({
  name,
  id,
  className,
  disabled,
  override,
  autocomplete,
  ...props
}: TextAreaInputProp_TP) => {
  var newClassName = `${BASE_CLASS_NAME} ${className || ''}`;
  if (override) {
    newClassName = className || '';
  }
  return (
    <textarea
      name={name}
      id={id}
      disabled={disabled}
      className={newClassName}
      autoComplete={autocomplete}
      {...props}
    />
  );
};
