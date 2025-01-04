/////////// IMPORTS
///
//import styles from './Settings.module.css'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { numberFormatterCtx } from '../../context/settings/number-formatter';
import { useFetch } from '../../hooks';
import { useIsRTL } from '../../hooks/useIsRTL';
import { notify } from '../../utils/toast';
import { useQueryClient } from '@tanstack/react-query';
import { Loading } from '../../components/organisms/Loading/Loading';

// import { authCtx } from "../context/auth-and-perm/auth"
///
/////////// Types
///
type SettingsProps_TP = {
  title: string;
};
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Settings = ({ title }: SettingsProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const isRTL = useIsRTL();
  // const { logOutHandler, isLoggingOut } = useContext(authCtx)
  const { digits_count, changeDigitsCount, digits_countLoading } =
    useContext(numberFormatterCtx);
  ///
  /////////// STATES
  ///
  const [digitsCount, setDigitsCount] = useState(digits_count);

  ///
  /////////// SIDE EFFECTS
  ///
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';
  }, [isRTL]);




  const changeDigitsCountHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setDigitsCount(+e.target.value);
  ///
  return (
    <>
      {/* {isRefetching || isFetching ? <Loading /> : ''} */}
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </>
  );
};
