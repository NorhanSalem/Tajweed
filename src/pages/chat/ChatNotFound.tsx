import { t } from "i18next";
import React from "react";

export default function ChatNotFound() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-[75vh]">
      <svg
        id="FAQ_ic"
        data-name="FAQ ic"
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <rect
          id="Rectangle_2409"
          data-name="Rectangle 2409"
          width="120"
          height="120"
          rx="60"
          fill="#11897d"
        />
        <g id="messages-2" transform="translate(25 25)">
          <path
            id="Vector"
            d="M41.217,43.253l1.138,9.216a2.9,2.9,0,0,1-4.376,2.858L25.757,48.065a29.121,29.121,0,0,1-3.938-.262,14.176,14.176,0,0,0,3.442-9.216C25.261,30.3,18.085,23.6,9.218,23.6a16.58,16.58,0,0,0-9.1,2.654A18.485,18.485,0,0,1,0,24.033C0,10.762,11.522,0,25.757,0S51.514,10.762,51.514,24.033A23.49,23.49,0,0,1,41.217,43.253Z"
            transform="translate(12.652 5.834)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M32.087,14.993a14.18,14.18,0,0,1-3.442,9.218,16.289,16.289,0,0,1-12.6,5.746L8.43,34.479A1.825,1.825,0,0,1,5.688,32.7l.729-5.746A14.55,14.55,0,0,1,0,14.993,14.653,14.653,0,0,1,6.942,2.654,16.578,16.578,0,0,1,16.044,0C24.911,0,32.087,6.709,32.087,14.993Z"
            transform="translate(5.834 29.425)"
            fill="none"
            stroke="#deb00d"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          />
          <path
            id="Vector-3"
            data-name="Vector"
            d="M0,0H70V70H0Z"
            fill="none"
            opacity="0"
          />
        </g>
      </svg>
      <p className="dark:text-white">{t("Inbox Is Empty")}</p>
    </div>
  );
}
