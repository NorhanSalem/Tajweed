import { t } from "i18next";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaBriefcase,
  FaExchangeAlt,
  FaUserGraduate,
  FaUserTie,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import DateRange from "../../components/molecules/DateRange/DateRange";
import { Loading } from "../../components/organisms/Loading/Loading";
import { useFetch } from "../../hooks";

type HomeProps_TP = {
  title: string;
};
type dataHome_TP = {
  data: {
    total: number;
    totaly: string;
    total_all: {
      kay: string;
      finished: number;
      booked: number;
      unbooked: number;
      canceled: number;
      free_canceled: number;
      expenses: number;
      daily_expenses: number;
      revenues: number;
      daily_revenues: number;
    };
    kay: string;
    egyptians: number;
    non_egyptians: number;
    finished: number;
    cancelled: number;
    in_progress: number;
    male: number;
    female: number;
    data: {
      name: string;
      number: number;
    }[];
  }[];
};
export const Home = ({ title }: HomeProps_TP) => {
  const [showItems, setShowItems] = useState(false);
  const [nameShowItem, setNameShowItem] = useState();

  const [dateFilter, setDateFilter] = useState("");
  const queryParams = {
    date_range: dateFilter,
  };
  const searchParams = new URLSearchParams(queryParams as any);
  const endpoint = `dashboard/home?${searchParams.toString()}`;
  const { data: dataHome, isLoading } = useFetch<dataHome_TP>({
    endpoint: endpoint,
    queryKey: [endpoint],
    enabled: !!dateFilter,
  });

  const show = (key) => {
    setShowItems(!showItems);
    nameShowItem == key ? setNameShowItem("") : setNameShowItem(key);
  };

  return (
    <>
      {/* {console.log(dataHome?.data)} */}
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading && <Loading />}
      <div className="bg-white p-2 md:p-5 rounded-xl dark:bg-dark-tertiary dark:text-dark-textGray ">
        <div className="w-1/1 sm:w-1/2  xl:w-1/4 mb-12 mt-[0.5rem] grid ">
          <DateRange setDateFilter={setDateFilter} />
        </div>

        <div className="flex flex-col sm:grid grid-cols-12 gap-[1.7rem] gap-y-12 cards-home-page px-[0.75rem]">
          {dataHome?.data?.map((item) => (
            <div className="col-span-12 sm:col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
              <div
                className={`home-cards ${
                  nameShowItem != item.kay ? "h-[297px]" : "h-full"
                }   rounded-xl p-3 px-[1.7rem] py-[1.7rem] dark:bg-dark-primary dark:border-0 `}
              >
                {/* <>{console.log(item.kay)}</> */}
                <div className="flex justify-between">
                  {item?.total && (
                    <div className="dark:text-dark-textWhite ">
                      {item?.total?.toFixed(1)}
                    </div>
                  )}
                  {item?.totaly && (
                    <div className="dark:text-dark-textWhite ">
                      {item?.totaly?.toFixed(1)}
                    </div>
                  )}
                  {item?.total_all?.kay && (
                    <div className="dark:text-dark-textWhite ">
                      {item?.total_all?.kay}
                    </div>
                  )}
                  <div className="flex justify-endcenter">
                    {item?.slug === "Students" && (
                      <FaUserGraduate className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Teachers" && (
                      <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Total_subscriptions" && (
                      <FaBriefcase className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug == "Sessions" && (
                      <IoBook className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Total_profit" && (
                      <FaExchangeAlt className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Most_active_students" && (
                      <FaUserGraduate className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Most_active_teachers" && (
                      <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Teachers_geographical_distribution" && (
                      <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Students_geographical_distribution" && (
                      <FaUserGraduate className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Paid_packages" && (
                      <FaMoneyBillWave className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Revenues" && (
                      <FaMoneyBillWave className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Pending_Qurancourses_debits" && (
                      <FaMoneyBillWave className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Expenses" && (
                      <FaMoneyBillWave className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Rush_hours" && (
                      <FaClock className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                    {item?.slug === "Rush_days" && (
                      <FaClock className="text-mainBlue text-[20px] dark:!text-white" />
                    )}
                  </div>
                </div>
                <div className="mt-3 info-card-data">
                  {item?.kay && (
                    <small className="text-lightGreen dark:text-dark-textWhite">
                      {" "}
                      {item?.kay}
                    </small>
                  )}
                  <div className="mt-2">
                    {/* عدد المصرين */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.egyptians >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Egyptian")}</small>
                          </>
                        )}
                      </div>
                      {item?.egyptians >= 0 && <small>{item?.egyptians}</small>}
                    </div>
                    {/* غير  المصرين */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.non_egyptians >= 0 && (
                          <>
                            <p className="bg-blue-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Not Egyptian")}</small>
                          </>
                        )}
                      </div>
                      {item?.non_egyptians >= 0 && (
                        <small>{item?.non_egyptians}</small>
                      )}
                    </div>
                    {/* إجمالي الجلسات  المنهية */}
                    {item?.slug == "Sessions" && (
                      <div className="flex justify-between">
                        <div className="text-lightGreen flex items-center gap-1">
                          {item?.finished >= 0 && (
                            <>
                              <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                              <small>{t("Totals classes finished")}</small>
                            </>
                          )}
                        </div>
                        {item?.finished >= 0 && <small>{item?.finished}</small>}
                      </div>
                    )}
                    {item?.slug == "Sessions" && (
                      <div className="flex justify-between">
                        <div className="text-lightGreen flex items-center gap-1">
                          {item?.canceled >= 0 && (
                            <>
                              <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                              <small>{t("Totals classes canceled")}</small>
                            </>
                          )}
                        </div>
                        {item?.canceled >= 0 && <small>{item?.canceled}</small>}
                      </div>
                    )}
                    {/* إجمالي الجلسات المحجوزة */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.booked >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Totals classes booked")}</small>
                          </>
                        )}
                      </div>
                      {item?.booked >= 0 && <small>{item?.booked}</small>}
                    </div>
                    {/* إجمالي الجلسات الغير محجوزة */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.unbooked >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Totals classes unbooked")}</small>
                          </>
                        )}
                      </div>
                      {item?.unbooked >= 0 && <small>{item?.unbooked}</small>}
                    </div>
                    {/* إجمالي الاشتراكات الناححه  */}
                    {item?.slug == "Total_subscriptions" && (
                      <div className="flex justify-between">
                        <div className="text-lightGreen flex items-center gap-1">
                          {item?.finished >= 0 && (
                            <>
                              <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                              <small>
                                {t("Total successful subscriptions")}
                              </small>
                            </>
                          )}
                        </div>
                        {item?.finished >= 0 && <small>{item?.finished}</small>}
                      </div>
                    )}
                    {/* إجمالي الاشتراكات الملغاه  */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.cancelled >= 0 && (
                          <>
                            <p className="bg-blue-500  w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Total canceled subscriptions")}</small>
                          </>
                        )}
                      </div>

                      {item?.cancelled >= 0 && <small>{item?.cancelled}</small>}
                    </div>
                    {/* إجمالي الاشتراكات غير مكتمله  */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.in_progress >= 0 && (
                          <>
                            <p className="bg-blue-500  w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Total incomplete subscriptions")}</small>
                          </>
                        )}
                      </div>

                      {item?.in_progress >= 0 && (
                        <small>{item?.in_progress}</small>
                      )}
                    </div>
                    {/* عدد الذكور */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.male >= 0 && (
                          <>
                            <p className="bg-blue-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("male")}</small>
                          </>
                        )}
                      </div>
                      {item?.male && <small>{item?.male}</small>}
                    </div>
                    {/* عدد الاناث */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.female >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Female")}</small>
                          </>
                        )}
                      </div>
                      {item?.female >= 0 && <small>{item?.female}</small>}
                    </div>
                    {/* إجمالي الجلسات المنتهية */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.finished && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total classes completed")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.finished && (
                        <small>{item?.total_all?.finished?.toFixed(1)}</small>
                      )}
                    </div>
                    {/* إجمالي الجلسات المحجوزه */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.booked && (
                          <>
                            <p className="bg-blue-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total classes booked")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.booked && (
                        <small>{item?.total_all?.booked?.toFixed(1)}</small>
                      )}
                    </div>
                    {/* إجمالي الجلسات الغير محجوزة*/}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.unbooked && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total unbooked sessions")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.unbooked && (
                        <small>{item?.total_all?.unbooked?.toFixed(1)}</small>
                      )}
                    </div>
                    {/* إجمالي مرتجع الجلسات   */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.canceled && (
                          <>
                            <p className="bg-blue-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total class returns")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.canceled && (
                        <small>{item?.total_all?.canceled?.toFixed(1)}</small>
                      )}
                    </div>
                    {/* إجمالي الجلسات المجانية الملغاة  */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.free_canceled && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total class returns")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.free_canceled && (
                        <small>
                          {item?.total_all?.free_canceled?.toFixed(1)}
                        </small>
                      )}
                    </div>
                    {/* إجمالي المصروفات */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.expenses >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total cost")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.expenses >= 0 && (
                        <small>{item?.total_all?.expenses.toFixed(1)}</small>
                      )}
                    </div>
                    {/* إجمالي المصروفات اليومية*/}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.daily_expenses >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total daily expenses")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.daily_expenses >= 0 && (
                        <small>
                          {item?.total_all?.daily_expenses.toFixed(1)}
                        </small>
                      )}
                    </div>
                    {/*   إجمالي الإيرادات   */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.revenues >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total revenue")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.revenues >= 0 && (
                        <small>{item?.total_all?.revenues.toFixed(1)}</small>
                      )}
                    </div>

                    {/*  إجمالي الإيرادات اليومية  */}
                    <div className="flex justify-between">
                      <div className="text-lightGreen flex items-center gap-1">
                        {item?.total_all?.daily_revenues >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>

                            <small>{t("Total daily revenue")}</small>
                          </>
                        )}
                      </div>
                      {item?.total_all?.daily_revenues >= 0 && (
                        <small>
                          {item?.total_all?.daily_revenues.toFixed(1)}
                        </small>
                      )}
                    </div>
                    {item?.data
                      ?.slice(
                        0,
                        item.kay === nameShowItem ? item.data.length : 5
                      )
                      .map((child, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="text-lightGreen flex items-center gap-1">
                            <>
                              <p className="bg-black w-1 h-1 p-1 rounded-full m-0 "></p>
                              <small>{child?.name}</small>
                            </>
                          </div>
                          {child?.number && (
                            <small>
                              {typeof child?.number == "string"
                                ? child?.number
                                : Number(child?.number).toFixed(1)}
                            </small>
                          )}
                        </div>
                      ))}
                    {item?.data?.length > 5 && (
                      <div className="text-end">
                        <button
                          className="text-red-500 text-xs"
                          onClick={() => show(item.kay)}
                        >
                          {item.kay == nameShowItem
                            ? t("Show less")
                            : t("Show more")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
