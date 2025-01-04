/////////// IMPORTS
///
import { t } from "i18next";
import { BaseInputField, InnerFormLayout } from "../../molecules";
import { DropFile } from "../../molecules/files/DropFile";
import PhoneInput2 from "../../molecules/phone-input/PhoneInput2";
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SponsorMainData = ({
    setGender,
    setState_id,
    setSpecialization,
    setNationality_id,
    setMarital_status,
    setLanguage,
    updateData,
    setPhone_country,
    setPhoneCode,
    setCountry,
    resetForm,
}: any) => {
    console.log("🚀 ~ file: SponsorMainData.tsx:36 ~ updateData:", updateData);
    /////////// VARIABLES
    ///

    ///
    /////////// CUSTOM HOOKS
    ///

    ///
    /////////// STATES
    ///

    ///
    /////////// SIDE EFFECTS
    ///

    ///
    /////////// IF CASES
    ///

    ///
    /////////// FUNCTIONS & EVENTS
    ///

    ///
    return (
        <>
            <InnerFormLayout title={`${t("Edit Add Sponsor")}`} showpopuptitle={true}>
                <BaseInputField
                    id="title_ar"
                    label={`${t("Title Arabic")}`}
                    name="title_ar"
                    type="text"
                    placeholder={`${t("Title Arabic")}`}
                    labelProps={{ className: "mb-1" }}
                    className="mb-3"
                    required
                />
                <BaseInputField
                    id="title_en"
                    label={`${t("Title English")}`}
                    name="title_en"
                    type="text"
                    placeholder={`${t("Title English")}`}
                    labelProps={{ className: "mb-1" }}
                    className="mb-3"
                    required
                />

                <BaseInputField
                    id="name"
                    label={`${t("Responsible Name")}`}
                    name="responsable_name"
                    type="text"
                    placeholder={`${t("Responsible Name")}`}
                    labelProps={{ className: "mb-1" }}
                    className="mb-3"
                    required
                />
                <PhoneInput2
                    label={`${t("Responsible phone")}`}
                    name="phone"
                    setPhone_country={setPhone_country}
                    updateData={updateData}
                    resetForm={resetForm}
                    setPhoneCode={setPhoneCode}
                />
                {/* <BaseInputField
                    id="name"
                    label={`${t("Responsible phone")}`}
                    name="phone"
                    type="text"
                    placeholder={`${t("Responsible phone")}`}
                    labelProps={{ className: "mb-1" }}
                    className="mb-3"
                    required
                /> */}
                <BaseInputField
                    id="name"
                    label={`${t("Coupon Name")}`}
                    name="coupon_code"
                    type="text"
                    placeholder={`${t("Coupon Name")}`}
                    labelProps={{ className: "mb-1" }}
                    className="mb-3"
                    required
                />

                <div className=" col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                    <>
                        <h2 className="dark:text-white"> {`${t("Logo")}`}</h2>

                        <DropFile name="logo" />
                    </>
                </div>
            </InnerFormLayout>
        </>
    );
};
