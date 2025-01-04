import { Helmet } from "react-helmet-async";
import { BaseInputField } from "../../components/molecules";
import { Formik } from "formik";
import { t } from "i18next";
import { Button } from "../../components/atoms";
import { useMutate } from "../../hooks";
import { notify } from "../../utils/toast";
import PhoneInput2 from "../../components/molecules/phone-input/PhoneInput2";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { useLocalStorage } from "@mantine/hooks";

type Profile_TP = {
  title: string;
};

type InitialValues_TP = {
  name: string;
  email: string;
  phone: string;
};

export default function Profile({ title }: Profile_TP) {
  const { user, login } = useAuth();
  const initialValues: InitialValues_TP = {
    name: user?.data?.data?.name,
    email: user?.data?.data?.email,
    phone: user?.data?.data?.phone,
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: [`dashboard/auth/update-profile`],
    endpoint: `dashboard/auth/update-profile`,
    onSuccess: (data: any) => {
      notify("success");
      login(data);
    },
    onError: (err: Error) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="card xl:mb-6">
        <div className="card-body pt-9 pb-0 h-[300px] profile-cover"></div>
      </div>
      <div className="py-10">
        <h2 className="text-[20px] mb-10">{t("Profile Page")}</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ setFieldValue, values, handleSubmit }) => (
            <>
              <div className="grid gap-5 grid-cols-2">
                <BaseInputField
                  name="name"
                  id="name"
                  type="text"
                  placeholder={`${t("full name")}`}
                  label={`${t("full name")}`}
                  value={values.name}
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                  }}
                />
                <BaseInputField
                  name="email"
                  id="email"
                  type="email"
                  placeholder={`${t("email")}`}
                  label={`${t("email")}`}
                  value={values.email}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                />
                <PhoneInput2 label={`${t("mobile number")}`} name="phone" />
              </div>

              <Button
                className="block my-10"
                type="submit"
                action={handleSubmit}
                loading={isLoading}
              >
                {t("Edit Profile")}
              </Button>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
