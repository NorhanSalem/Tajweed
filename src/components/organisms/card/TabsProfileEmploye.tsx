import { t } from 'i18next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BonusesAndDiscountsEmployee from '../../templates/hr/employees/profile/BonusesAndDiscountsEmployee';
import EmployeModification from '../../templates/hr/employees/profile/EmployeModification';
import SalaryHistoryOneEmploy from '../../templates/hr/employees/profile/SalaryHistoryOneEmploy';

const TabsProfileEmploye: any = ({  employeId }: any) => {
  return (
    <>
      <div className='bg-white p-5 rounded-xl dark:bg-dark-tertiary'>
        <Tabs>
          <TabList>
            <Tab>{t('Edit the Employe')}</Tab>
            <Tab>{t('History of bonuses and discounts')}</Tab>
            <Tab>{t('Salary history')}</Tab>
          </TabList>

          <TabPanel>
            {/* تعديل الموظف */}
            <EmployeModification
              // EditingData={EditingData}
              employeId={employeId}
              hideHeader={true}
            />
          </TabPanel>

          <TabPanel>
            {/* سجل المكافآت والخصومات */}
            <BonusesAndDiscountsEmployee
              // EditingData={EditingData}
              employeId={employeId}
              hideHeader={true}
            />
          </TabPanel>

          <TabPanel>
            {/* تعديل الموظف */}
            <SalaryHistoryOneEmploy
              // EditingData={EditingData}
              employeId={employeId}
              hideHeader={true}
            />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default TabsProfileEmploye;
