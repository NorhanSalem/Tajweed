{
  dataHome?.data?.map((item) => (
    <div className="col-span-12 sm:col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
      <div
        className={`home-cards ${
          nameShowItem != item.kay ? "h-[297px]" : "h-full"
        }   rounded-xl p-3 px-[1.7rem] py-[1.7rem] dark:bg-dark-primary dark:border-0 `}
      >
        {/* <>{console.log(item.kay)}</> */}
        <div className="flex justify-between">
          {item?.total >= 0 && (
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
            {item?.kay === "الطلاب" && (
              <FaUserGraduate className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "المعلمين" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "إجمالي الاشتراكات" && (
              <FaBriefcase className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay == "الجلسات" && (
              <IoBook className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "إجمالي المصروفات والإيرادات" && (
              <FaExchangeAlt className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "الطلاب الأكثر تفاعلا" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "المعلمون الأكثر تفاعلا" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "التوزيع الجغرافي للمعلمين" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "التوزيع الجغرافي للطلاب" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "الباقات" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "الإيرادات" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "مديونات ترتيل المعلقة" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "المصروفات" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "ساعات الذروة" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
            )}
            {item?.kay === "أكثر الأيام استخداما للتطبيق" && (
              <FaUserTie className="text-mainBlue text-[20px] dark:!text-white" />
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
              {item?.non_egyptians && <small>{item?.non_egyptians}</small>}
            </div>
            {/* إجمالي الجلسات  المنهية */}
            {item?.kay == "الجلسات" && (
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
            {item?.kay == "الجلسات" && (
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
            {item?.kay == "إجمالي الاشتراكات" && (
              <div className="flex justify-between">
                <div className="text-lightGreen flex items-center gap-1">
                  {item?.finished >= 0 && (
                    <>
                      <p className="bg-red-500 w-1 h-1 p-1 rounded-full m-0 "></p>
                      <small>{t("Total successful subscriptions")}</small>
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

              {item?.in_progress >= 0 && <small>{item?.in_progress}</small>}
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

                    <small>{t("Total unbooked classes")}</small>
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

                    <small>{t("Total classes returns")}</small>
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

                    <small>{t("Total classes returns")}</small>
                  </>
                )}
              </div>
              {item?.total_all?.free_canceled && (
                <small>{item?.total_all?.free_canceled?.toFixed(1)}</small>
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
                <small>{item?.total_all?.daily_expenses.toFixed(1)}</small>
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
                <small>{item?.total_all?.daily_revenues.toFixed(1)}</small>
              )}
            </div>
            {item?.data
              ?.slice(0, item.kay === nameShowItem ? item.data.length : 5)
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
                  {item.kay == nameShowItem ? t("Show less") : t("Show more")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
}
