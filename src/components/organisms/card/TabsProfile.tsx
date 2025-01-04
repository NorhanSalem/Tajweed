import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Appointments from "../../templates/profile/profile-components/Appointments";
import Notifications from "../../templates/profile/profile-components/Notifications";
import Packages from "../../templates/profile/profile-components/Packages";
import Ratings from "../../templates/profile/profile-components/Ratings";
import SessionHistory from "../../templates/profile/profile-components/SessionHistory";
import Students from "../../templates/profile/profile-components/Students";
import SubscriptionLog from "../../templates/profile/profile-components/SubscriptionLog";
import TeacherModification from "../../templates/profile/profile-components/TeacherModification";
import { t } from "i18next";
import AbsenceLog from "../../templates/profile/profile-components/AbsenceLog";
import DelayLog from "../../templates/profile/profile-components/DelayLog";
import PaymentSettings from "../../templates/profile/profile-components/PaymentSettings";

const TabsProfile: any = ({ EditingData, teacherId }: any) => {
  return (
    <>
      <div className="bg-white p-5 rounded-xl dark:bg-dark-tertiary">
        <Tabs>
          <TabList>
            <Tab>{t("Edit the teacher")}</Tab>
            <Tab>{t("Subscription history")}</Tab>
            <Tab>{t("Record classes")}</Tab>
            <Tab>{t("Appointments")}</Tab>
            <Tab>{t("Ratings")}</Tab>
            <Tab>{t("Students")}</Tab>
            <Tab>{t("Packages")}</Tab>
            <Tab>{t("Notifications")}</Tab>
            <Tab>{t("Absence log")}</Tab>
            <Tab>{t("Delay log")}</Tab>
            <Tab>{t("Payment settings")}</Tab>
          </TabList>

          {/* تعديل المعلم */}
          <TabPanel>
            <TeacherModification teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* سجل الاشتراكات */}
            <SubscriptionLog teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* سجل الجلسات */}
            <SessionHistory teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* المواعيد */}
            <Appointments teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* التقييمات */}
            <Ratings teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* الطلاب */}
            <Students teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* الباقات */}
            <Packages teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* الإشعارات */}
            <Notifications teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* سجل الغيابات */}
            <AbsenceLog teacherId={teacherId} />
          </TabPanel>
          <TabPanel>
            {/* سجل التأخير */}
            <DelayLog teacherId={teacherId} />
          </TabPanel>

          <TabPanel>
            {/*  إعدادات الدفع */}
            <PaymentSettings teacherId={teacherId} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default TabsProfile;
