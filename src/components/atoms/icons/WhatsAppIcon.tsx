import { BsWhatsapp } from 'react-icons/bs';
type DeleteProps_TP = {
  className?: string;
  action?: () => void;
  size?: number;
};
export const WhatsAppIcon = ({
  className,
  action,
  size,
  ...props
}: DeleteProps_TP) => {
  return (
    <BsWhatsapp
      size={size}
      className={`fill-[#25d366] dark:fill-[#25d366]  cursor-pointer  ${className}`}
      onClick={action}
      {...props}
    />
  )
};
