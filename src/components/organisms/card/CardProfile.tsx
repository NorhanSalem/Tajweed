import { BsBookmarkFill } from "react-icons/bs";
import { t } from "i18next";
const CardProfile = ({ data }: any) => {
  return (
    <>
      <div className="flex flex-row justify-between gap-6 w-[63rem]">
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content ">
            <h2>{data?.total_subscriptions}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>
          <p className="client-title dark:text-white">
            {t("Total subscriptions")}
          </p>
        </div>
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.total_sessions}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">{t("Total classes")}</p>
        </div>
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.total_booked_sessions}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">
            {t("Total classes booked")}
          </p>
        </div>
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
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.available_balance}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">
            {t("Available Balance")}
          </p>
        </div>
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.pending_balance}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">{t("Pending Balance")}</p>
        </div>
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.last_month_profit}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>
          </div>

          <p className="client-title dark:text-white">
            {t("Profits last month")}
          </p>
        </div>
        <div className="client-box dark:bg-dark-tertiary">
          <div className="content">
            <h2>{data?.total_profit}</h2>

            <div className="client-icon">
              <BsBookmarkFill size={15} color="#44936e" />
            </div>

            <p className="client-title dark:text-white">
              {" "}
              {t("Total profits")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
