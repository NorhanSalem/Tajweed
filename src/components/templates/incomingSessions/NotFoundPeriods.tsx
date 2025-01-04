import { Tabs } from "@mantine/core";
import { t } from "i18next";
import React from "react";

function NotFoundPeriods(item: any) {
  return (
    <div>
      {" "}
      <Tabs.Panel
        value={item?.day_name}
        className={`m-1  ${item?.periods?.length === 0 ? "w-full" : "w-[100px]"}`}
        key={item?.day_name}
      >
        <div className="p-2 text-center massage-not-found mt-9">
          {t("common:No_Found_Periods")}
        </div>
      </Tabs.Panel>
    </div>
  );
}

export default NotFoundPeriods;
