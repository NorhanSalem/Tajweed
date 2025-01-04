import { BsBookmarkFill } from "react-icons/bs";
import { t } from "i18next";
const CardProfileStudent = ({ data }: any) => {
  return (
    <>
      <div className="col-span-1">
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.total_subscriptions}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">
            {t("Total subscriptions")}
          </p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.total_sessions}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white"> {t("Total classes")}</p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.total_booked_sessions}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">
            {t("Total booked classes")}
          </p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.total_unbooked_sessions}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">
            {t("Total unbooked classes")}
          </p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.wallet_balance}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">{t("Wallet Balance")}</p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content ">
            <h2 className="dark:text-white">{data?.total_paid}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">{t("Total Paid")}</p>
        </div>
      </div>
    </>
  );
};

export default CardProfileStudent;
