/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMutate } from "../../../hooks";
import { requiredTranslation } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors";
import { Button } from "../../atoms";
import { OuterFormLayout } from "../../molecules";
import { SponsorMainData } from "./SponsorMainData";
import { useState } from "react";
///
/////////// Types
///
type AddSponsor_props = {
    title?: string;
    dataSource?: any;
    updateData?: any;
    setModel?: any;
    resetForm?: any;
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddSponsor = ({
    title,
    dataSource,
    setModel,
    resetForm,
    updateData,
}: AddSponsor_props) => {
    console.log("🚀 ~ file: AddSponsor.tsx:36 ~ updateData:", updateData);
    /////////// VARIABLES
    ///
    type InitialValues_TP = {
        name: string;
        email: string;
        phone: string;
        birthday: Date;
        password?: string;
        password_confirmation: string;
        specialization?: string;
        gender?: string;
        state_id?: string;
        phone_country?: string;
        language?: string;
        marital_status?: string;
        nationality_id?: string;
    };

    const SponserValidatingSchema = () =>
        Yup.object({
            responsable_name: Yup.string().trim().required(requiredTranslation),
            phone: Yup.string().trim().required(requiredTranslation),
            coupon_code: Yup.string().trim().required(requiredTranslation),
            title_ar: Yup.string().trim().required(requiredTranslation),
            title_en: Yup.string().trim().required(requiredTranslation),
            // phone: Yup.string().trim().required(requiredTranslation),
        });

    const initialValues: InitialValues_TP = {
        responsable_name: !resetForm ? updateData?.responsable_name : "",
        phone: !resetForm ? updateData?.phone : "",
        // phone: !resetForm ? updateData?.phone_all : "",
        coupon_code: !resetForm ? updateData?.coupon_code : "",
        title_ar: !resetForm ? updateData?.title_ar : "",
        title_en: !resetForm ? updateData?.title_en : "",

        logo: !resetForm
            ? !!updateData?.logo
                ? [
                      {
                          path: updateData?.logo,
                          type: "image",
                      },
                  ]
                : []
            : [],

        //   : [],
    };
    ///
    /////////// CUSTOM HOOKS
    ///

    ///
    /////////// STATES
    const [phone_country, setPhone_country] = useState(
        !resetForm ? updateData?.phone_country : ""
    );
  const [phoneCode, setPhoneCode] = useState();

    ///
    /////////// SIDE EFFECTS
    ///
    const queryClient = useQueryClient();
    // all student
    const { mutate, isLoading } = useMutate({
        mutationKey: ["dashboard/advertisement/sponsors"],
        endpoint: `dashboard/advertisement/sponsors`,
        onSuccess: (data: InitialValues_TP) => {
            queryClient.refetchQueries(["All-Sponsors"]);
            setModel(false);
            notify("success");
        },
        onError: (err) => {
            console.log("err", err);
            notify("error", err.response.data.message);
        },
        formData: true,
    });

    // update student

    const { mutate: update, isLoading: LoadingUpdateSponsor } = useMutate({
        mutationKey: ["dashboard/advertisement/sponsors"],
        endpoint: `dashboard/advertisement/sponsors/${updateData?.id}`,
        onSuccess: (data: InitialValues_TP) => {
            queryClient.refetchQueries(["All-Sponsors"]);
            notify("success");
            setModel(false);
        },
        onError: (err) => {
            console.log("err", err);
            notify("error", err?.response?.data.message);
        },

        formData: true,
    });

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={SponserValidatingSchema}
                onSubmit={(values: InitialValues_TP) => {
                    console.log("Hhhhhhhhhhhhh", values);
                    // let logo =
                    //     !resetForm && values?.logo?.length > 0
                    //         ? values.logo[0]
                    //         : undefined;
                    const modifiedPhone = values.phone
                        .slice(phoneCode?.length + 1)
                        .trim();

                    let logoImage =
                        !resetForm &&
                        //@ts-ignore
                        values?.logo?.length > 0 &&
                        //@ts-ignore
                        values?.logo[0]?.path !== updateData?.logo
                            ? //@ts-ignore
                              values.logo[0]
                            : undefined;

                    if (!resetForm) {
                        if (!logoImage) {
                            delete values?.logo;
                        }
                    }

                    resetForm
                        ? mutate({
                              ...values,
                              logo: logoImage,
                              phone: +modifiedPhone.split(" ").join(""),
                              phone_country,
                          })
                        : update({
                              ...values,
                              logo: logoImage,
                              phone: +modifiedPhone.split(" ").join(""),
                              phone_country,
                              _method: "put",
                          });
                }}
            >
                <Form>
                    <HandleBackErrors>
                        <OuterFormLayout
                            header={title}
                            submitComponent={
                                <Button
                                    type="submit"
                                    className="mr-auto mt-8"
                                    loading={isLoading || LoadingUpdateSponsor}
                                >
                                    {t("submit")}
                                </Button>
                            }
                        >
                            <SponsorMainData
                                updateData={updateData}
                                resetForm={resetForm}
                                setPhone_country={setPhone_country}
                                setPhoneCode={setPhoneCode}
                            />
                        </OuterFormLayout>
                    </HandleBackErrors>
                </Form>
            </Formik>
                
        </>
    );
};
