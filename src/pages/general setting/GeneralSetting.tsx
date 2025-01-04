import { Form, Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { Button } from "../../components/atoms";
import { OuterFormLayout } from "../../components/molecules";
import { useFetch, useMutate } from "../../hooks";
import { notify } from "../../utils/toast";
import { HandleBackErrors } from "../../utils/utils-components/HandleBackErrors";
import { GeneralSettingMainData } from "../../components/templates/general setting/GeneralSettingMainData";
import { t } from "i18next";
import { useState } from "react";
import { Loading } from "../../components/organisms/Loading/Loading";
import { string } from "yup";
import { useQueryClient } from "@tanstack/react-query";

type GeneralSetting_TP = {
  title: string;
};

type InitialValues_TP = {
  [x: string]: string;
};
export const GeneralSetting = ({ title }: GeneralSetting_TP) => {
  const [updateEndPoint , setUpdateEndPoint] = useState(new Date())
  const {
    isLoading,
    isSuccess,
    data: settingData,
    refetch,
  } = useFetch<any>({
    endpoint: `dashboard/settings`,
    queryKey: [`dashboard_settings/${updateEndPoint}`],
  });

  const [dataInputs, setDataInputs] = useState([
    settingData?.data.map((item: { key: any; value: any }) => ({
      key: item.key,
      value: item.value,
    })),
  ]);

  const [imgUpload, setImgUpload] = useState();

  let initialValueDynamic: InitialValues_TP = {};

  settingData?.data?.forEach((item: { key: string; value: string }) => {
    initialValueDynamic[item?.key] = item.value;
    if (
      item?.key === "logo_ar" ||
      (item?.key === "light_logo_ar" && item?.value)
    ) {
      initialValueDynamic[item?.key] = [{ path: item.value, type: "image" }];
    }
  });
  const { mutate: update, isLoading: LoadingUpdateSetting } = useMutate({
    mutationKey: ["settings_updates"],
    endpoint: `dashboard/settings`,
    onSuccess: () => {
      refetch();
      notify("success", "تم التعديل بنجاح");
      setUpdateEndPoint(new Date())
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const onSubmit = (values: InitialValues_TP) => {
    const updatedValues: InitialValues_TP = {};
    Object.keys(values).forEach((key) => {
      const lastCharacter = key.slice(-2);
      const removeLast3Character = key.slice(
        0,
        -lastCharacter.split("").length
      );
      let checkContainWord = removeLast3Character.includes("_")
        ? removeLast3Character.split(" ").join("_")
        : "";
      checkContainWord = checkContainWord.replace(/_+$/, "");
      const modifiedKey = `settings[${checkContainWord}][${lastCharacter}]`;
      updatedValues[modifiedKey] = values[key];
    });
    const finalValues = { ...updatedValues };
    update(finalValues);
    if (typeof finalValues["settings[logo][ar]"][0]?.path == "string") {
      delete finalValues["settings[logo][ar]"][0]?.path;
      delete finalValues["settings[logo][ar]"][0]?.type;
    }
    if (typeof finalValues["settings[light_logo][ar]"][0]?.path == "string") {
      delete finalValues["settings[light_logo][ar]"][0]?.path;
      delete finalValues["settings[light_logo][ar]"][0]?.type;
    }
  };

  {
    isLoading && <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {isSuccess && (
        <Formik initialValues={initialValueDynamic} onSubmit={onSubmit}>
          <Form>
            <HandleBackErrors>
              {settingData?.data?.length ? (
                <OuterFormLayout
                  submitComponent={
                    <Button
                      type="submit"
                      className="mr-auto mt-8"
                      loading={isLoading || LoadingUpdateSetting}
                    >
                      {t("submit")}
                    </Button>
                  }
                >
                  <GeneralSettingMainData
                    settingData={settingData}
                    initialValueDynamic={initialValueDynamic}
                    setDataInputs={setDataInputs}
                    setImgUpload={setImgUpload}
                  />
                </OuterFormLayout>
              ) : (
                <Loading />
              )}
            </HandleBackErrors>
          </Form>
        </Formik>
      )}
    </>
  );
};
