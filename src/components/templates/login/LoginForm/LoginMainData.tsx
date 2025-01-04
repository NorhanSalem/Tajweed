import { t } from "i18next";
import { useState } from "react";
import hidePasswordIcon from "../../../../assets/global/icons/eye-slash.svg";
import showPasswordIcon from "../../../../assets/global/icons/eye.svg";
import { BaseInputField } from "../../../molecules";
import { useFormikContext } from "formik";

function LoginMainData() {
  const [togglePassword, setTogglePassword] = useState(false);
  const {values} = useFormikContext()

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-dark mb-1 text-lg">
          {t("Log in to the control panel")}
        </h1>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between">
          <label className="text-dark text-sm font-bold label-form">
            {t("Email")}
          </label>
        </div>

        <div className="input-login-user">
          <BaseInputField
            labelProps={{ className: "mt-6 mb-1 font-bold " }}
            name="phone"
            id="phone"
            type="text"
            placeholder={`${t("Email")}`}
          />
          <span className="icon-login-edit"></span>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between">
          <label className="text-dark text-sm font-bold label-form">
            {t("Password")}
          </label>
        </div>
        <div data-kt-password-meter="true">
          <div className="mb-3">
            <div className="input-login-user">
              <BaseInputField
                labelProps={{
                  className: "mt-6 mb-1 font-bold ",
                }}
                name="password"
                type={togglePassword ? "text" : "password"}
                //@ts-ignore
                placeholder={t("Password")}
              />
              <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2">
                {togglePassword && (
                  <img
                    className="show-hide-pass"
                    onClick={() => setTogglePassword(!togglePassword)}
                    src={showPasswordIcon}
                    alt="show"
                  />
                )}
                {!togglePassword && (
                  <img
                    className="show-hide-pass"
                    onClick={() => setTogglePassword(!togglePassword)}
                    src={hidePasswordIcon}
                    alt="hide"
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="form-check form-check-custom form-check-solid mb-5 flex justify-between">
        <div className="flex gap-2">
          <label className="checkbox style-c">
            <input type="checkbox" />
            <div className="checkbox__checkmark"></div>
          </label>

          <label className="form-check-label" htmlFor="rememberMe">
            {t("Remember me")}
          </label>
        </div>

        {/* <div>
      <a className='forget-password-word' href='#'>
        نسيت كلمة المرور؟
      </a>
    </div> */}
      </div>
    </div>
  );
}

export default LoginMainData;
