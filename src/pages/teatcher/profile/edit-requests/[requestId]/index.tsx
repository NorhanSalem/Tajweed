import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BaseInputField } from "../../../../../components/molecules";
import { Loading } from "../../../../../components/organisms/Loading/Loading";
import { useFetch, useMutate } from "../../../../../hooks";
import showAlert from "../../../../../components/molecules/ShowAlert";
import { getIDfromURL } from "../../../../../utils/helpers";
import { formatDate } from "../../../../../utils/date";

const EditRequestView = () => {
  let { requestId } = useParams();
  const { t } = useTranslation();
  const { isLoading, data } = useFetch({
    endpoint: `dashboard/editRequests/${requestId}`,
    queryKey: [`dashboard/editRequests/${requestId}`],
  });

  const navigate = useNavigate();
  const { mutate: acceptEditRequest, isLoading: acceptEditRequestLoading } =
    useMutate({
      mutationKey: [`dashboard/editRequests/accept/${requestId}`],
      endpoint: `dashboard/editRequests/accept/${requestId}`,
      onSuccess: () => {
        navigate("/teacher/profile/edit-requests");
      },
      onError: () => {},
    });
  const { mutate: declineEditRequest, isLoading: declineEditRequestLoading } =
    useMutate({
      mutationKey: [`dashboard/editRequests/decline/${requestId}`],
      endpoint: `dashboard/editRequests/decline/${requestId}`,
      onSuccess: () => {
        navigate("/teacher/profile/edit-requests");
      },
      onError: () => {},
    });
  const requestData = data?.data;

  const handleRequestAction = (id: string, action: () => void) => {
    showAlert(
      action === acceptEditRequest
        ? t("Accept Edit Request?")
        : t("Decline Edit Request?"),
      t(""),
      false,
      t("done"),
      true,
      "warning",
      action
    );
  };
  return (
    <div>
      {isLoading && <Loading />}
      {data?.data && (
        <div>
          <Formik
            onSubmit={(values) => console.log(values)}
            initialValues={{ date_rang: "" }}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div className="sm:col-span-2 md:col-span-1 text-center">
                    <h1>{t("New Data")}</h1>
                  </div>
                  <div className="sm:col-span-2 md:col-span-1 text-center">
                    <h1>{t("Old Data")}</h1>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 `}
                  >
                    <img
                      src={requestData?.new?.profile}
                      width={100}
                      className="mx-auto"
                    />
                  </div>

                  <div
                    className={`p-4 rounded-lg  dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.profile == requestData?.old?.profile
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <img
                      src={requestData?.old?.profile}
                      width={100}
                      className="mx-auto "
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="name"
                      label={t("name")}
                      value={requestData?.new?.name}
                      type="text"
                      readOnly
                      id="Name"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.name == requestData?.old?.name
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="name"
                      label={t("name")}
                      value={requestData?.old?.name}
                      type="text"
                      readOnly
                      id="Name"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="email"
                      label={t("email")}
                      value={requestData?.new?.email}
                      type="text"
                      readOnly
                      id="email"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.email == requestData?.old?.email
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="email"
                      label={t("email")}
                      value={requestData?.old?.email}
                      type="text"
                      readOnly
                      id="email"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="spoken_languages"
                      label={t("Spoken Language")}
                      value={requestData?.new?.spoken_languages}
                      type="text"
                      readOnly
                      id="spoken_languages"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.spoken_languages ==
                      requestData?.old?.spoken_languages
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="spoken_languages"
                      label={t("Spoken Language")}
                      value={requestData?.old?.spoken_languages}
                      type="text"
                      readOnly
                      id="email"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="birthday"
                      label={t("Birthday")}
                      value={requestData?.new?.birthday?.slice(0, 10)}
                      type="text"
                      readOnly
                      id="email"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.birthday?.slice(0, 10) ==
                      requestData?.old?.birthday?.slice(0, 10)
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="birthday"
                      label={t("Birthday")}
                      value={requestData?.old?.birthday?.slice(0, 10)}
                      type="text"
                      readOnly
                      id="birthday"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <h3>{t("specializations")}</h3>
                    <p className="bg-white p-2 rounded">
                      {requestData?.new?.specialization}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.specialization ==
                      requestData?.old?.specialization
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <h3>{t("specializations")}</h3>
                    <p className="bg-white p-2 rounded">
                      {requestData?.old?.specialization}
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <h3>{t("Is working online?")}</h3>
                    <p className="bg-white p-2 rounded">
                      {requestData?.new?.is_working_online}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.is_working_online ==
                      requestData?.old?.is_working_online
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <h3>{t("Is working online?")}</h3>
                    <p className="bg-white p-2 rounded">
                      {requestData?.old?.is_working_online}
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <h3>{t("Teaching fields?")}</h3>
                    <div className=" p-2 rounded flex gap-2">
                      {requestData?.new?.teaching_fields?.map((field) => (
                        <span className="bg-white px-2 py-1 rounded">
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.teaching_fields.every((item) => item) ==
                      requestData?.old?.teaching_fields.every((item) => item)
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <h3>{t("Teaching fields?")}</h3>
                    <div className=" p-2 rounded flex gap-2">
                      {requestData?.old?.teaching_fields?.map((field) => (
                        <span className="bg-white px-2 py-1 rounded">
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <h3>{t("Video")}</h3>
                    <iframe
                      loading="lazy"
                      src={`https://www.youtube.com/embed/${getIDfromURL(
                        requestData?.new?.video_file
                      )}`}
                      title={t("Embedded_YouTube_Video")}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-32 rounded-xl"
                    ></iframe>
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.video_file ==
                      requestData?.old?.video_file
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <h3>{t("Video")}</h3>
                    <iframe
                      loading="lazy"
                      src={`https://www.youtube.com/embed/${getIDfromURL(
                        requestData?.old?.video_file
                      )}`}
                      title={t("Embedded_YouTube_Video")}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-32 rounded-xl"
                    ></iframe>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="phone"
                      label={t("Phone")}
                      value={
                        requestData?.old?.phone.startsWith("+")
                          ? requestData?.old?.phone.substring(1)
                          : requestData?.old?.phone
                      }
                      type="text"
                      readOnly
                      id="phone"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.phone.startsWith("+")
                        ? requestData?.new?.phone.substring(1)
                        : requestData?.new?.phone ==
                          requestData?.old?.phone.startsWith("+")
                        ? requestData?.old?.phone.substring(1)
                        : requestData?.old?.phone
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="phone"
                      label={t("Phone")}
                      value={
                        requestData?.new?.phone.startsWith("+")
                          ? requestData?.new?.phone.substring(1)
                          : requestData?.new?.phone
                      }
                      type="text"
                      readOnly
                      id="phone"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="gender"
                      label={t("Gender")}
                      value={requestData?.old?.gender_text}
                      type="text"
                      readOnly
                      id="gender"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.gender == requestData?.old?.gender
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="gender"
                      label={t("Gender")}
                      value={requestData?.old?.gender_text}
                      type="text"
                      readOnly
                      id="gender"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 `}
                  >
                    <BaseInputField
                      name="language"
                      label={t("Language")}
                      value={requestData?.new?.language.toLowerCase()}
                      type="text"
                      readOnly
                      id="language"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg  dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.language?.toLowerCase() ==
                      requestData?.old?.language?.toLowerCase()
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="language"
                      label={t("Language")}
                      value={requestData?.old?.language?.toLowerCase()}
                      type="text"
                      readOnly
                      id="language"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="English_level"
                      label={t("English Level")}
                      value={requestData?.new?.English_level_text}
                      type="text"
                      readOnly
                      id="English_level"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.English_level ==
                      requestData?.old?.English_level
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="English_level"
                      label={t("English Level")}
                      value={requestData?.old?.English_level_text}
                      type="text"
                      readOnly
                      id="English_level"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="is_azhary"
                      label={t("Is Azhari")}
                      value={requestData?.new?.is_azhary}
                      type="text"
                      readOnly
                      id="is_azhary"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.is_azhary == requestData?.old?.is_azhary
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      label={t("Is Azhari")}
                      value={requestData?.old?.is_azhary}
                      type="text"
                      readOnly
                      id="is_azhary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="is_mogaz"
                      label={t("Is Mojaz")}
                      value={requestData?.new?.is_mogaz}
                      type="text"
                      readOnly
                      id="is_mogaz"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.is_mogaz == requestData?.old?.is_mogaz
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      label={t("Is Mojaz")}
                      value={requestData?.old?.is_mogaz}
                      type="text"
                      readOnly
                      id="is_mogaz"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="bio"
                      label={t("Bio")}
                      value={requestData?.new?.bio}
                      type="text"
                      readOnly
                      id="bio"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.bio == requestData?.old?.bio
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      name="bio"
                      label={t("Bio")}
                      value={requestData?.old?.bio}
                      type="text"
                      readOnly
                      id="bio"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 `}
                  >
                    <p>{t("Is Azhari")}</p>
                    <img
                      src={requestData?.new?.azhary}
                      width={100}
                      className="mx-auto"
                    />
                  </div>

                  <div
                    className={`p-4 rounded-lg  dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.azhary == requestData?.old?.azhary
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <p>{t("Is Azhari")}</p>
                    <img
                      src={requestData?.old?.azhary}
                      width={100}
                      className="mx-auto "
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 `}
                  >
                    <p>{t("Is Mojaz")}</p>
                    <img
                      src={requestData?.new?.mogaz}
                      width={100}
                      className="mx-auto"
                    />
                  </div>

                  <div
                    className={`p-4 rounded-lg  dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.mogaz == requestData?.old?.mogaz
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <p>{t("Is Mojaz")}</p>

                    <img
                      src={requestData?.old?.mogaz}
                      width={100}
                      className="mx-auto "
                    />
                  </div>
                </div>
                {/* <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="marital_status"
                      label={t("Marital Status")}
                      value={requestData?.old?.marital_status}
                      type="text"
                      readOnly
                      id="marital_status"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.marital_status ==
                      requestData?.old?.marital_status
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      label={t("Marital Status")}
                      name={t("marital_status")}
                      value={+requestData?.new?.marital_status}
                      type="text"
                      readOnly
                      id="marital_status"
                    />
                  </div>
                </div> */}
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    <BaseInputField
                      name="juz_number"
                      label={t("Number Of Memorized Juz")}
                      value={requestData?.new?.juz_number}
                      type="text"
                      readOnly
                      id="juz_number"
                    />
                  </div>
                  <div
                    className={`p-4 rounded-lg dark:bg-dark-tertiary sm:col-span-2 md:col-span-1 ${
                      requestData?.new?.juz_number ==
                      requestData?.old?.juz_number
                        ? "bg-[lightgreen]"
                        : "bg-red-300"
                    }`}
                  >
                    <BaseInputField
                      label={t("Number Of Memorized Juz")}
                      name={t("juz_number")}
                      value={+requestData?.old?.juz_number}
                      type="text"
                      readOnly
                      id="juz_number"
                    />
                  </div>
                </div>
                {/* Education data */}
                <h2 className="dark:text-white">{t("Education")}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    {requestData?.new?.education_data?.map((item) => (
                      <div className="grid grid-cols-2 gap-3">
                        <BaseInputField
                          // name="juz_number"
                          label={t("school")}
                          value={item.school}
                          type="text"
                          readOnly
                          id="juz_number"
                        />
                        <BaseInputField
                          // name="juz_number"
                          label={t("degree")}
                          value={item.degree}
                          type="text"
                          readOnly
                          id="juz_number"
                        />
                        <BaseInputField
                          name="start_date"
                          label={t("from")}
                          value={item.start_date}
                          type="text"
                          readOnly
                          id="juz_number"
                        />
                        <BaseInputField
                          name="end_date"
                          label={t("to")}
                          value={item.end_date}
                          type="text"
                          readOnly
                          id="end_date"
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    {requestData?.old?.education_data.map((item, index) => (
                      <div className="grid grid-cols-2 gap-3">
                        <BaseInputField
                          className={`${
                            requestData?.new?.education_data[index]?.school ==
                            item.school
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="school"
                          label={t("school")}
                          value={item.school}
                          type="text"
                          readOnly
                          id="school"
                        />
                        <BaseInputField
                          className={`${
                            requestData?.new?.education_data[index]?.degree ==
                            item.degree
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="degree"
                          label={t("degree")}
                          value={item.degree}
                          type="text"
                          readOnly
                          id="degree"
                        />
                        <BaseInputField
                          className={`${
                            requestData?.new?.education_data[index]
                              ?.start_date == item.start_date
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="start_date"
                          label={t("from")}
                          value={item.start_date}
                          type="text"
                          readOnly
                          id="start_date"
                        />
                        <BaseInputField
                          className={`${
                            requestData?.new?.education_data[index]?.end_date ==
                            item.end_date
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="end_date"
                          label={t("to")}
                          value={item.end_date}
                          type="text"
                          readOnly
                          id="end_date"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Experience data */}
                <h2 className="dark:text-white">{t("Experience")}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    {requestData?.new?.experience_data?.map((item) => (
                      <div className="grid grid-cols-2 gap-3">
                        <BaseInputField
                          name="title"
                          label={t("Title")}
                          value={item.title}
                          type="text"
                          readOnly
                          id="title"
                        />
                        <BaseInputField
                          name="company_name"
                          label={t("company_name")}
                          value={item.company_name}
                          type="text"
                          readOnly
                          id="degree"
                        />
                        <BaseInputField
                          name="start_date"
                          label={t("from")}
                          value={item.start_date}
                          type="text"
                          readOnly
                          id="start_date"
                        />
                        <BaseInputField
                          name="end_date"
                          label={t("to")}
                          value={item.end_date}
                          type="text"
                          readOnly
                          id="end_date"
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className={`p-4 rounded-lg bg-[lightgreen] dark:bg-dark-tertiary sm:col-span-2 md:col-span-1`}
                  >
                    {requestData?.old?.experience_data?.map((item, index) => (
                      <div className="grid grid-cols-2 gap-3">
                        <BaseInputField
                          className={`${
                            requestData?.new?.experience_data[index]?.title ==
                            item.title
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="title"
                          label={t("Title")}
                          value={item.title}
                          type="text"
                          readOnly
                          id="juz_number"
                        />
                        <BaseInputField
                          className={`${
                            requestData?.new?.experience_data[index]
                              ?.company_name == item.company_name
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="company_name"
                          label={t("company_name")}
                          value={item.company_name}
                          type="text"
                          readOnly
                          id="company_name"
                        />
                        <BaseInputField
                          className={`${
                            requestData?.new?.experience_data[index]
                              ?.start_date == item.start_date
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="start_date"
                          label={t("from")}
                          value={item.start_date}
                          type="text"
                          readOnly
                          id="start_date"
                        />
                        <BaseInputField
                          className={`${
                            requestData?.new?.experience_data[index]
                              ?.end_date == item.end_date
                              ? "bg-white"
                              : "bg-red-300"
                          }`}
                          name="end_date"
                          label={t("to")}
                          value={item.end_date}
                          type="text"
                          readOnly
                          id="end_date"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {requestData?.status_en == "Pending" && (
            <div className="flex items-center gap-3  my-6">
              <button
                className="bg-[lightgreen] px-3 py-2  rounded-xl "
                onClick={() => {
                  handleRequestAction(requestId, acceptEditRequest);
                }}
              >
                {t("Accept")}
              </button>
              <button
                className="bg-red-300 px-3 py-2 rounded-xl"
                onClick={() => {
                  handleRequestAction(requestId, declineEditRequest);
                }}
              >
                {t("Decline")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditRequestView;
