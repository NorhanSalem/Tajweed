import { Tabs } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type RescheduleDays_TP = {
  DetailsCalender: any;
  setDate: Dispatch<SetStateAction<string>>;
  setNewTime?: any;
  setNewDate?: any;
};

function RescheduleDays({
  DetailsCalender,
  setDate,
  setNewTime,
  setNewDate,
}: RescheduleDays_TP) {
  const DefaultClass =
    "flex gap-1 items-center justify-center flex-col bg-[#e6f3f2] rounded-2xl p-10";

  return (
    <Tabs.List className="flex gap-1 border-0">
      <div className="overflow-x-hidden w-full flex flex-wrap">
        {DetailsCalender?.data?.map((item: any, index: number) => {
          return (
            <div key={item?.id} className="w-full mb-5 flex-1">
              <div className="flex justify-center w-full">
                <Tabs.Tab
                  value={item?.day_name}
                  className={`${DefaultClass}`}
                  onClick={(event) => {
                    setDate(item?.periods);
                    setNewDate(item?.periods);
                    setNewTime(item);
                    const slideElements =
                      document.querySelectorAll(".data-active");
                    slideElements.forEach((slide) => {
                      slide.classList.remove("data-active");
                    });
                    event.currentTarget.classList.add("data-active");
                  }}
                >
                  <div
                    className="flex flex-col items-center justify-center gap-2"
                    // onClick={() => }
                  >
                    <p>{item?.day_name}</p>
                  </div>
                </Tabs.Tab>
              </div>
            </div>
          );
        })}
      </div>
    </Tabs.List>
  );
}

export default RescheduleDays;
