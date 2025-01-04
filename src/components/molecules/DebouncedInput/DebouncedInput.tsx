import React from 'react';
import { Label } from '../../atoms';

function DebouncedInput({
  value: initialValue,
  onChange,
  label,
  id,
  debounce = 1000,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
  id: string;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col gap-1'>
          {label && (
            <Label htmlFor={id} className='mb-3'>
              {label}
            </Label>
          )}
          <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
export default DebouncedInput;
