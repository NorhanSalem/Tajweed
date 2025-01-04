import { t } from "i18next"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import AvailableCoupons from "../../templates/profile student/profile-components/AvailableCoupons"
import NotificationsStudent from "../../templates/profile student/profile-components/NotificationsStudent"
import RatingsStudent from "../../templates/profile student/profile-components/RatingsStudent"
import SessionHistoryStudent from "../../templates/profile student/profile-components/SessionHistoryStudent"
import StudentWallet from "../../templates/profile student/profile-components/StudentWallet"
import SubscriptionLogStudent from "../../templates/profile student/profile-components/SubscriptionLogStudent"
import TeacherModificationStudent from "../../templates/profile student/profile-components/TeacherModificationStudent"

const TabsProfileStudent: any = ({
  // EditingData,
  studentId,
}: any) => {
  return (
    <>
      <div className="bg-white p-5 rounded-xl dark:bg-dark-tertiary">
        <Tabs>
          <TabList>
            <Tab>{t("Edit the student")}</Tab>
            <Tab>{t("Subscription history")}</Tab>
            <Tab>{t("Record classes")}</Tab>
            <Tab>{t("Class evaluations")}</Tab>
            <Tab>{t("Available coupons")}</Tab>
            <Tab>{t("Notifications")}</Tab>
            <Tab>{t("Wallet add from the control panel")}</Tab>
          </TabList>

          <TabPanel>
            {/* تعديل الطالب */}
            <TeacherModificationStudent
              // EditingData={EditingData}
              studentId={studentId}
              hideHeader={true}
            />
          </TabPanel>

          <TabPanel>
            {/* سجل الاشتراكات */}
            <SubscriptionLogStudent studentId={studentId} />
          </TabPanel>
          <TabPanel>
            {/* سجل الجلسات */}
            <SessionHistoryStudent studentId={studentId} />
          </TabPanel>
          <TabPanel>
            {/* التقييمات */}
            <RatingsStudent studentId={studentId} />
          </TabPanel>

          <TabPanel>
            {/* الكوبونات المتاحة */}
            <AvailableCoupons studentId={studentId} />
          </TabPanel>
          <TabPanel>
            {/* الإشعارات */}
            <NotificationsStudent studentId={studentId} />
          </TabPanel>
          <TabPanel>
            {/* الإشعارات */}
            <StudentWallet studentId={studentId} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  )
}

export default TabsProfileStudent
