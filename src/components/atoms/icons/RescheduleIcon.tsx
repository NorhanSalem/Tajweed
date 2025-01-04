import { t } from "i18next";

function RescheduleIcon({ action }: any) {
  return (
    <div onClick={action}>
      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30}>
      <title>{t('Reschedule')}</title>
        <g data-name="Change time" transform="translate(-307 -354)">
          <rect
            width={30}
            height={30}
            fill={"#deb00d"}
            data-name="Rectangle 2354"
            rx={10}
            transform="translate(307 354)"
          />
          <g
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path strokeWidth={1.5} d="M318 359v3" />
            <path
              strokeWidth={1.5}
              d="M326 359v3M313.5 366.09h17"
              data-name="Vector"
            />
            <g strokeWidth={1.5}>
              <path
                d="m329.21 372.77-3.539 3.54a1.232 1.232 0 0 0-.3.59l-.19 1.35a.635.635 0 0 0 .76.76l1.35-.19a1.189 1.189 0 0 0 .59-.3l3.54-3.54a1.365 1.365 0 0 0 0-2.22 1.361 1.361 0 0 0-2.211.01Z"
                data-name="Vector"
              />
              <path
                d="M328.7 373.28a3.185 3.185 0 0 0 2.22 2.22"
                data-name="Vector"
              />
            </g>
            <path
              strokeWidth={1.5}
              d="M322 379h-4c-3.5 0-5-2-5-5v-8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5v3.5"
              data-name="Vector"
            />
            <path
              strokeWidth={2}
              d="M321.996 370.7h.005M318.295 370.7h.005M318.295 373.7h.005"
              data-name="Vector"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default RescheduleIcon;
