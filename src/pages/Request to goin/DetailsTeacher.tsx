import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { BaseInputField } from "../../components/molecules";
import { t } from "i18next";
import { Loading } from "../../components/organisms/Loading/Loading";

function DetailsTeacher() {
  const { Id } = useParams();

  const {
    data: DetailsTeacher,
    isLoading,
    isRefetching,
  } = useFetch({
    endpoint: `dashboard/teachers/${Id}`,
    queryKey: ["dashboard/teachers/${Id}"],
    onError: (error) => {},
  });
  const data = DetailsTeacher?.data?.model;
  console.log("🚀 ~ DetailsTeacher ~ data:", data);
  if (isRefetching || isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-12 md:grid-cols-3 gap-2">
      <div className="flex flex-col gap-2 w-full">
        <label>{t("name")}</label>
        <input
          id=""
          name="name"
          value={data?.name}
          disabled
          type="text"
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("email")}</label>

        <input
          id=""
          name="email"
          value={data?.email}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("Phone")}</label>

        <input
          id=""
          name="phone"
          value={data?.phone}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("country")}</label>

        <input
          id=""
          name="country"
          value={data?.country?.name}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("Birthday")}</label>

        <input
          id=""
          name="birthday"
          value={data?.birthday}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("Gender")}</label>

        <input
          id=""
          name="gender"
          value={data?.gender}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("Language")}</label>

        <input
          id=""
          name="language_text"
          value={data?.language_text}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("English Level")}</label>

        <input
          id=""
          name="English_level"
          value={data?.English_level}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="">
        <label>{t("specializations")}</label>

        <ul className="list-disc border border-black py-3 px-7 rounded-xl text-black bg-white   ">
          {data?.specialization?.map((item: any) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
      <div className="">
        <label>{t("I Can Speak")}</label>

        <ul className="list-disc border border-black py-3 px-7 rounded-xl text-black bg-white   ">
          {data?.spoken_languages?.map((item: any) => (
            <li>{item?.label}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("order")}</label>

        <input
          id=""
          name="order"
          value={data?.order}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("interview status")}</label>

        <input
          id=""
          name="interview_status_text"
          value={data?.interview_status_text}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="">
        <label>{t("Education")}</label>

        <ul className="list-disc border border-black py-3 px-2 rounded-xl text-black bg-white  flex flex-wrap gap-4 ">
          {data?.education_data?.map((item: any) => (
            <div
              key={item?.id}
              className="border rounded-md px-8 border-black border-dashed"
            >
              <li>
                {t("education")} :{item?.school}
              </li>
              <li>
                {t("degree")}:{item?.degree}
              </li>
              <li>
                {t("start date")}:{item?.start_date}
              </li>
              <li>
                {t("end date")}:{item?.end_date}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="">
        <label>{t("Experience")}</label>

        <ul className="list-disc border border-black py-3 px-2 rounded-xl text-black bg-white  flex flex-wrap gap-4 ">
          {data?.experience_data?.map((item: any) => (
            <div
              key={item?.id}
              className="border rounded-md px-8 border-black border-dashed"
            >
              <li>
                {t("company_name")} :{item?.company_name}
              </li>
              <li>
                {t("title")}:{item?.title}
              </li>
              <li>
                {t("start date")}:{item?.start_date}
              </li>
              <li>
                {t("end date")}:{item?.end_date}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="">
        <label>{t("Teaching Fields")}</label>

        <ul className="list-disc border border-black py-3 px-2 rounded-xl text-black bg-white  flex flex-wrap gap-4 ">
          {data?.teachingFields?.map((item: any) => (
            <div
              key={item?.id}
              className="border rounded-md px-8 border-black border-dashed"
            >
              <li>{item}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>{t("Is working online?")}</label>

        <input
          id=""
          name="is_working_online"
          value={data?.is_working_online == 1 ? t("Yes") : t("No")}
          type="text"
          disabled
          className="border rounded-xl text-black"
        />
      </div>
      <div className="flex flex-col col-span-2 w-full">
        <label>{t("Bio")}</label>

        <textarea
          id=""
          name="bio"
          value={data?.bio}
          className="border rounded-xl text-black "
          rows={6}
        />
      </div>

      <div className="flex flex-col  w-full">
        <label>{t("identity image")}</label>
        <img
          src={data?.identity_image}
          alt=""
          className="h-[400px] w-[400px] rounded-xl"
        />
      </div>
      <div className="flex flex-col  w-full">
        <label>{t("is_azher")}</label>
        <img
          src={data?.azher_image}
          alt=""
          className="h-[400px] w-[400px] rounded-xl"
        />
      </div>
      <div className="flex flex-col  w-full">
        <label>{t("is_mogaz")}</label>
        <img
          src={data?.mogaz_image}
          alt=""
          className="h-[400px] w-[400px] rounded-xl"
        />
      </div>
    </div>
  );
}

export default DetailsTeacher;
