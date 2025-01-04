import { t } from "i18next";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TabsProfileEmployee: any = ({ EditingData, employeeId }: any) => {
  return (
    <>
      <div className="bg-white p-5 rounded-xl dark:bg-dark-tertiary">
        <Tabs>
          <TabList>
            <Tab>{t("Edit the Employee")}</Tab>
            <Tab>{t("Compensations records")}</Tab>
            <Tab>{t("Salaries records")}</Tab>
          </TabList>
          <TabPanel>
            {/* تعديل الموظف */}
            {/* <TeacherModificationStudent
              EditingData={EditingData}
              studentId={studentId}
              hideHeader={true}
            /> */}
          </TabPanel>

          <TabPanel>
            {/*سجل المكافآت والخصومات */}
            {/* <SubscriptionLogStudent studentId={studentId} /> */}
          </TabPanel>
          <TabPanel>
            {/*  سجل الرواتب   */}

            {/* <SessionHistoryStudent studentId={studentId} /> */}
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default TabsProfileEmployee;
