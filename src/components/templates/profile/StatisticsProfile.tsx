import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormikContext } from "formik";
import defaultImage from "../../../assets/global/default.png";
import emailIcon from "../../../assets/global/icons/black_email.png";
import flagIcon from "../../../assets/global/icons/flag.svg";
import phoneIcon from "../../../assets/global/icons/phone.svg";
import CardProfile from "../../organisms/card/CardProfile";
import JoinToProfileTeacher from "./JoinToProfileTeacher";
import { useFetch, useIsRTL, useMutate } from "../../../hooks";
import axios from "axios";
import Cookies from "js-cookie";
const user_token = Cookies.get("token");

const api = axios.create({
  // baseURL: "https://backend.qurancourses.cam/api",
  baseURL: "https://backend.tajweedly.com/api",
});
const StatisticsProfile = ({ data }: any) => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [removed, setRemoved] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImage);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext<any>();
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const [isEditVisible, setIsEditVisible] = useState<boolean>(true); // Initial visibility set to true
  const isRTL = useIsRTL();

  const { data: EditingData, isLoading: loadingData } = useFetch<any>({
    endpoint: teacherId ? `dashboard/teachers/${teacherId}` : "",
    queryKey: [`dashboard/teachers/${teacherId}`],
  });

  const { mutate: update } = useMutate({
    mutationKey: ["dashboard/teachers"],
    endpoint: teacherId ? `dashboard/teachers/${teacherId}` : "",
    onSuccess: (data: any) => {
      console.log("Update success", data);
    },
    formData: true,
  });

  useEffect(() => {
    if (EditingData?.data?.model?.profile) {
      setPreviewUrl(EditingData.data.model.profile);
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
  }, [EditingData?.data?.model?.profile]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type and size
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a PNG or JPG image.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }

      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setFieldValue("profile", file);
      setPreviewUrl(objectUrl);

      const formData = new FormData();
      formData.append("profile", file);
      try {
        setLoading(true);
        const authorizationHeader = `Bearer ${user_token}`;
        await api.post(
          `dashboard/change-image-teacher/${teacherId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the correct content type
              Authorization: authorizationHeader,
              "Accept-Language": isRTL ? "ar" : "en",
            },
          }
        );

        console.log("Profile updated successfully");
      } catch (error) {
        setLoading(false);
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
        URL.revokeObjectURL(objectUrl);
      }
    }
  };

  const handleEditImageClick = () => {
    document.getElementById("image-input")?.click();
  };

  return (
    <>
      <div className="card xl:mb-6">
        <div className="card-body pt-9 pb-0 profile-cover">
          <div>
            <div className="flex flex-wrap justify-center sm:justify-start text-center text-sm-start">
              <div className="px-0 mb-3 relative">
                <div
                  className="edit-image-profile cursor-pointer absolute top-0 left-0 z-50"
                  onClick={handleEditImageClick}
                >
                  {loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#888888"
                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                        opacity=".25"
                      />
                      <path
                        fill="#888888"
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="0.75s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        />
                      </path>
                    </svg>
                  ) : (
                    isEditVisible && (
                      <div className="edit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
                          />
                        </svg>
                      </div>
                    )
                  )}
                </div>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  name="profile"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <img
                  className="text-center text-sm-start rounded-full w-[75px] h-[75px]"
                  width="75px"
                  height="75px"
                  src={previewUrl}
                  alt={imageLoaded ? "Profile" : "Default"}
                />
              </div>

              <div className="px-0 mb-3 statistics-profile">
                <h2 className="title-contain text-start mx-2 text-sm-start">
                  {data?.model?.name}
                </h2>

                <ul className="data-list data-list-center">
                  <li>
                    <a href="#">
                      <img src={flagIcon} alt="" className="w-6 h-6" />
                      <span>{data?.model?.id}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={phoneIcon} alt="" className="w-6 h-6" />
                      <span>{data?.model?.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={emailIcon} alt="" className="w-6 h-6" />
                      <span>{data?.model?.email}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>{data?.model?.timezone}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="text-white ms-auto flex gap-3">
                <JoinToProfileTeacher userID={data?.model?.id} />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-[1.2rem] gap-y-6">
            <CardProfile data={data?.teacher_profile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsProfile;
