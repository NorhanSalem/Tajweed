import { Tabs } from "@mantine/core";
import { t } from "i18next";
import ButtonMultiPeriods from "./ButtonMultiPeriods";

type ReschedulePeriods_TP = {
  DetailsCalender: any;

  selectedPeriods: any;
  setSelectedPeriods: any;
};

function ReschedulePeriods({
  DetailsCalender,
  selectedPeriods,
  setSelectedPeriods,
}: ReschedulePeriods_TP) {
  const activePeriod = "bg-[#0d675e] text-white cursor-pointer";

  return (
    <>
      {DetailsCalender?.data?.map((item: any) => {
        return item?.periods
          ?.filter((period: any) => !period.disabled && !period?.has_session)
          .map((period: any) => {
            return (
              <>
                <Tabs.Panel
                  value={item?.day_name}
                  className="m-1 w-[100px]"
                  key={period?.id}
                >
                  <ButtonMultiPeriods
                    activePeriod={activePeriod}
                    item={item}
                    period={period}
                    selectedPeriods={selectedPeriods}
                    setSelectedPeriods={setSelectedPeriods}
                  />
                </Tabs.Panel>
              </>
            );
          });
      })}
    </>
  );
}

export default ReschedulePeriods;
