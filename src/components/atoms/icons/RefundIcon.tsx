import * as React from "react";
import { t } from "i18next";
const RefundIcon = ({ action, className }: any) => (
  <img
    className={className}
    onClick={action}
    src="https://admin.khalwa.com/images/refund.svg"
    alt=""
    title={t("Refund")}
  />
);
export default RefundIcon;
