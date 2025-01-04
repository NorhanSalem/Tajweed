/////////// IMPORTS
///
import { t } from "i18next";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiDollar } from "react-icons/bi";
import { Loading } from "../../components/organisms/Loading/Loading";
import { useFetch } from "../../hooks";

///
/////////// Types
///
type FinancesProps_TP = {
  title: string;
};
type dataFinances_TP = {
  data: {
    total: number;
    key: string;
    subscriptions: number;
    admin_expenses: number;
    used_coupons: number;
    payment_gateway_fees: number;
    refunds: number;
    teachers_available_balance: number;
    teachers_pending_balance: number;
    students_wallet: number;
    general: number;
    marketting: number;
    salaries: number;
    sponsors: number;
    gross_profit: number;
    indebtedness: number;
    other_expenses: number;
    available: number;
    pending: number;
    withdrawn: number;
    deposits: number;
    paid: number;
    finished_subscriptions: number;
    coupons: number;
    payment_gateway: number;
    teachers_withdraws: number;
    teachers_available: number;
  }[];
};
///
export const Finances = ({ title }: FinancesProps_TP) => {
  const {
    data: dataFinances,
    refetch,
    isLoading,
    isRefetching,
  } = useFetch<dataFinances_TP>({
    endpoint: `dashboard/finances`,
    queryKey: [`finances`],
    onSuccess(data) {},
    onError(err) {
      console.log(err);
    },
  });
  console.log("🚀 ~ Finances ~ dataFinances:", dataFinances);

  const [showItems, setShowItems] = useState(false);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading && <Loading />}

      <div className="bg-white p-2 sm:p-8 rounded-xl dark:bg-dark-tertiary">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 gap-y-8">
          {dataFinances?.data?.map((item) => (
            <div className="col-span-1 animation-card">
              <div
                className={`${
                  !showItems ? "h-[297px]" : "h-full"
                } box-shadow-style h-[235px]  rounded-xl p-8 dark:bg-dark-primary dark:border-0 dark:text-dark-textWhite`}
              >
                <div className="flex justify-between">
                  <p>{item?.total}</p>

                  <div className="flex justify-end center">
                    <BiDollar className="text-[20px] text-mainGreen font-bold dark:text-dark-textWhite" />
                  </div>
                </div>
                <div className="mt-3">
                  <small className="text-lightGreen dark:text-dark-textWhite text-[13px] font-medium">
                    {item?.key}
                  </small>
                  <div className="mt-2 finances-data-card">
                    {/* الاشتراكات */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.subscriptions >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Subscriptions")}</small>
                          </>
                        )}
                      </small>
                      {item?.subscriptions >= 0 && (
                        <small>{item?.subscriptions}</small>
                      )}
                    </div>
                    {item?.key == "هامش الربح" && (
                      <div className="flex justify-between">
                        <small className="text-lightGreen flex items-center gap-1">
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Refunds")}</small>
                          </>
                        </small>
                        {item?.refunds && <small>{item?.refunds}</small>}
                      </div>
                    )}

                    {item?.key == "إجمالي الرصيد المتاح" && (
                      <div className="flex justify-between">
                        <small className="text-lightGreen flex items-center gap-1">
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Refunds")}</small>
                          </>
                        </small>
                        {item?.refunds && <small>{item?.refunds}</small>}{" "}
                      </div>
                    )}

                    {/* مصاريف ادارية */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.admin_expenses >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Administrative expenses")}</small>
                          </>
                        )}
                      </small>
                      {item?.admin_expenses >= 0 && (
                        <small>{item?.admin_expenses}</small>
                      )}
                    </div>

                    {/*  الكوبونات المستخدمة */}

                    {!!item?.used_coupons && (
                      <div className="flex justify-between">
                        <small className="text-lightGreen flex items-center gap-1">
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("used coupons")}</small>
                          </>
                        </small>

                        <small>{item?.used_coupons}</small>
                      </div>
                    )}

                    {/* مصاريف بوابة الدفع */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.payment_gateway_fees && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Payment gateway fees")}</small>
                          </>
                        )}
                      </small>
                      {item?.payment_gateway_fees && (
                        <small>{item?.payment_gateway_fees}</small>
                      )}
                    </div>

                    {/*   المرتجعات */}
                    {/* <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.refunds >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("returns")}</small>
                          </>
                        )}
                      </small>
                      {item?.refunds >= 0 && <small>{item?.refunds}</small>}
                    </div> */}

                    {/*   الرصيد المتاح للمعلمين */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.teachers_available_balance >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Credit available to teachers")}</small>
                          </>
                        )}
                      </small>
                      {item?.teachers_available_balance >= 0 && (
                        <small>{item?.teachers_available_balance}</small>
                      )}
                    </div>

                    {/*  عمولات المعلمين المعلقة*/}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.teachers_pending_balance >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>
                              {t("Teachers' commissions suspended")}
                            </small>
                          </>
                        )}
                      </small>
                      {item?.teachers_pending_balance >= 0 && (
                        <small>{item?.teachers_pending_balance}</small>
                      )}
                    </div>

                    {/* <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.teachers_available_balance && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("teachers available balance")}</small>
                          </>
                        )}
                      </small>
                      {item?.teachers_available_balance && (
                        <small>{item?.teachers_available_balance}</small>
                      )}
                    </div> */}
                    {/*  محفظة الطلاب  */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.students_wallet >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("students wallet")}</small>
                          </>
                        )}
                      </small>
                      {item?.students_wallet >= 0 && (
                        <small>{item?.students_wallet}</small>
                      )}
                    </div>

                    {/*   مصروفات عامه  */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.general >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("General expenses")}</small>
                          </>
                        )}
                      </small>
                      {item?.general >= 0 && <small>{item?.general}</small>}
                    </div>

                    {/*   مصروفات تسويق  */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.marketting >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Marketing expenses")}</small>
                          </>
                        )}
                      </small>
                      {item?.marketting >= 0 && (
                        <small>{item?.marketting}</small>
                      )}
                    </div>

                    {/*    مرتبات إداريين  */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.salaries >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("salaries")}</small>
                          </>
                        )}
                      </small>
                      {item?.salaries >= 0 && <small>{item?.salaries}</small>}
                    </div>

                    {/*     إيرادات ممولين  */}
                    {item.key == "إيرادات أخرى" && (
                      <div className="flex justify-between">
                        <small className="text-lightGreen flex items-center gap-1">
                          {item?.sponsors >= 0 && (
                            <>
                              <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                              <small>{t("funded revenues")}</small>
                            </>
                          )}
                        </small>
                        {item?.sponsors >= 0 && <small>{item?.sponsors}</small>}
                      </div>
                    )}

                    {/*      إجمالي هامش الربح  */}
                    {item.key == "صافي الربح" && (
                      <>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.gross_profit >= 0 && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("Gross profit margin")}</small>
                              </>
                            )}
                          </small>
                          {item?.gross_profit >= 0 && (
                            <small>{item?.gross_profit}</small>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.sponsors >= 0 && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("Total funded revenues")}</small>
                              </>
                            )}
                          </small>
                          {item?.sponsors >= 0 && (
                            <small>{item?.sponsors}</small>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.indebtedness && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("Total indebtedness")}</small>
                              </>
                            )}
                          </small>
                          {item?.indebtedness && (
                            <small>{item?.indebtedness}</small>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.other_expenses && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("Total other expenses")}</small>
                              </>
                            )}
                          </small>
                          {item?.other_expenses && (
                            <small>{item?.other_expenses}</small>
                          )}
                        </div>
                      </>
                    )}
                    {/* متاح */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.available >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("available")}</small>
                          </>
                        )}
                      </small>
                      {item?.available >= 0 && <small>{item?.available}</small>}
                    </div>

                    {/* معلق */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.pending >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("pending")}</small>
                          </>
                        )}
                      </small>
                      {item?.pending >= 0 && <small>{item?.pending}</small>}
                    </div>
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.available && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("available")}</small>
                          </>
                        )}
                      </small>
                      {item?.available && <small>{item?.available}</small>}
                    </div>

                    {/* تم التحويل */}
                    <div className="flex justify-between">
                      <small className="text-lightGreen flex items-center gap-1">
                        {item?.withdrawn >= 0 && (
                          <>
                            <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                            <small>{t("Transfer completed")}</small>
                          </>
                        )}
                      </small>
                      {item?.withdrawn >= 0 && <small>{item?.withdrawn}</small>}
                    </div>
                    {/*  المرتجعات */}
                    {item.key == "محفظة الطالب" && (
                      <>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.refunds && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("returns")}</small>
                              </>
                            )}
                          </small>
                          {item?.refunds && <small>{item?.refunds}</small>}
                        </div>

                        {/*  تم الشحن */}
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.deposits && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("charged")}</small>
                              </>
                            )}
                          </small>
                          {item?.deposits && <small>{item?.deposits}</small>}
                        </div>

                        {/*   مستخدم */}
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.paid && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("used")}</small>
                              </>
                            )}
                          </small>
                          {item?.paid && <small>{item?.paid}</small>}
                        </div>
                      </>
                    )}

                    {/*   إجمالي الرصيد المتاح*/}
                    {item.key === "إجمالي الرصيد المتاح" && (
                      <>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.sponsors >= 0 && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("funded revenues")}</small>
                              </>
                            )}
                          </small>
                          {item?.sponsors && <small>{item?.sponsors}</small>}
                        </div>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.finished_subscriptions >= 0 && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("finished subscriptions")}</small>
                              </>
                            )}
                          </small>
                          {item?.finished_subscriptions && (
                            <small>{item?.finished_subscriptions}</small>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.coupons >= 0 && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("coupons")}</small>
                              </>
                            )}
                          </small>
                          {item?.coupons >= 0 && <small>{item?.coupons}</small>}
                        </div>

                        {/* <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.payment_gateway && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("payment gateway")}</small>
                              </>
                            )}
                          </small>
                          {item?.payment_gateway && (
                            <small>{item?.payment_gateway}</small>
                          )}
                        </div> */}
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.teachers_withdraws >= 0 && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("Teacher transfers")}</small>
                              </>
                            )}
                          </small>
                          {item?.teachers_withdraws >= 0 && (
                            <small>{item?.teachers_withdraws}</small>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <small className="text-lightGreen flex items-center gap-1">
                            {item?.teachers_available && (
                              <>
                                <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                                <small>{t("teachers available")}</small>
                              </>
                            )}
                          </small>
                          {item?.teachers_available && (
                            <small>{item?.teachers_available}</small>
                          )}
                        </div>
                      </>
                    )}

                    {/* {Object.keys(item).length > 5 && (
                      <div className="text-end">
                        <button
                          className="text-red-500 text-xs"
                          onClick={() => setShowItems(!showItems)}
                        >
                          {showItems ? t("Show less") : t("Show more")}
                        </button>
                      </div>
                    )} */}
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
