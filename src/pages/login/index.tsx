/////////// IMPORTS
///
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/templates/login/LoginForm";
import { Loading } from "../../components/organisms/Loading/Loading";
import { t } from "i18next";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
///
/////////// Types
///
type LoginProps_TP = {
  title: string;
};
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Login = ({ title }: LoginProps_TP) => {
  const { login } = useAuth();
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const navigate = useNavigate();

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///
  // useEffect(() => {
  //   if (!!login) {
  //     navigate("/", { replace: true });
  //   }
  // }, [login]);

  // if (!login) {
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <LoginForm />
      </>
    );
  // }
  ///
  return <Loading mainTitle={t("loading")} />;
};
