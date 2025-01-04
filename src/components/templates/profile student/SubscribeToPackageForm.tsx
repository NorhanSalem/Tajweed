import { useState } from "react";
import { useFetch, useMutate } from "../../../hooks";
import { InnerFormLayout } from "../../molecules";
import { useTranslation } from "react-i18next";
import { notify } from "../../../utils/toast";
import { Form, Formik } from "formik";
import { Button, Label } from "../../atoms";
import * as Yup from "yup";
import { request } from "../../../utils/axios-util";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { queryClient } from "../../../main";
import { Loader } from "@mantine/core";

type BookSessionFormProps = {
  studentId: string;
  closeModal: () => void;
};

function SubscribeToPackageForm({
  studentId,
  closeModal,
}: BookSessionFormProps) {
  const { t } = useTranslation();

  const [teacherId, setTeacherId] = useState("");
  async function loadTeacherOptions(search, loadedOptions, { page }) {
    const response = await request({
      url: `dashboard/teachers?pagenate=100&search=${search}&page=${
        page ? page : "1"
      }`,
    });
    const teacherOptions = await response?.teachers.map((teacher: any) => ({
      label: teacher?.name,
      value: teacher?.id,
    }));
    return {
      options: teacherOptions,
      hasMore:
        response?.paginate?.total_pages > response?.paginate?.current_page
          ? true
          : false,
      additional: {
        page: page + 1,
      },
    };
  }

  const { data: packagesResponse, isLoading: isPackagesLoading } = useFetch({
    endpoint: `dashboard/teachers/${teacherId}/packages`,
    queryKey: [`dashboard/teachers/${teacherId}/packages`],
    enabled: !!teacherId,
  });
  console.log(
    "🚀 ~ file: SubscribeToPackageForm.tsx:51 ~ packagesResponse:",
    packagesResponse
  );
  const packages =
    packagesResponse?.data?.packages.map((pack: any) => ({
      label: pack?.package_title,
      value: pack?.id,
    })) || [];
  console.log("🚀 ~ file: SubscribeToPackageForm.tsx:52 ~ packages:", packages);

  const { mutate, isLoading: submitFormLoading } = useMutate({
    endpoint: `dashboard/students/${studentId}/subscribe`,
    mutationKey: [`dashboard/students/${studentId}/subscribe`],
    onSuccess: (data) => {
      closeModal();
      queryClient.invalidateQueries([`dashboard/students/${studentId}`]);
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  return (
    <Formik
      initialValues={{
        teacher_id: "",
        package_id: "",
      }}
      // validationSchema={{
      //     package_id: Yup.string().required(),
      //     teacher_id: Yup.string().required()
      // }}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      {(formik) => {
        const { setFieldValue, values } = formik;
        return (
          <Form className="dark:bg-[#1E1E2D] rtl:text-right">
            <div className="flex flex-col gap-5">
              <Label
                htmlFor="teacher"
                className="mb-2 hidden md:block text-center"
              >
                {t("Pick a Package")}
              </Label>
              <div>
                <AsyncPaginate
                  loadingMessage={() => (
                    <Loader size="sm" className="mx-auto" />
                  )}
                  className="dark:bg-[red]"
                  noOptionsMessage={() => <span>{t("No options")}</span>}
                  id="teacher"
                  placeholder={`${t("Teacher")}`}
                  loadOptions={loadTeacherOptions}
                  onChange={(option) => {
                    setFieldValue("teacher_id", option.value);
                    setTeacherId(option.value);
                  }}
                  additional={{
                    page: 1,
                  }}
                  debounceTimeout={300}
                />
              </div>
              <div>
                <Label
                  children={`(${t("Choose a teacher first")})`}
                  htmlFor="package"
                />
                <Select
                  loadingMessage={() => (
                    <Loader size="sm" className="mx-auto" />
                  )}
                  noOptionsMessage={() => <span>{t("No options")}</span>}
                  placeholder={`${t("Package")}`}
                  isLoading={isPackagesLoading}
                  isSearchable
                  isDisabled={!teacherId}
                  options={packages}
                  onChange={(option) =>
                    setFieldValue("package_id", option?.value as string)
                  }
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitFormLoading}
              className="mx-auto mt-5 block"
            >
              {t("Confirm")}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SubscribeToPackageForm;
