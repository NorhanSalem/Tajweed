import { isValidPhoneNumber } from "react-phone-number-input";
import { requiredTranslation } from "../../../utils/helpers";
import * as Yup from "yup";
import { t } from "i18next";

export type InitialValues_TP = {
    name: string;
    email: string;
    phone_country?: string;
    order: string;
    birthday: Date | null;
    password?: string;
    password_confirmation: string;
    gender?: string;
    nationality_id?: string;
    language?: string;
    specialization?: [string];
    phone: string;
    marital_status?: string;
    is_mogaz?: boolean;
    is_azhary?: boolean;
    mogaz_image?: File | null;
    azhary_image?: File | null;
    hourly_rate: string;
    juz_number?: number;
    is_mogaz_media: any;
    is_azhary_media: any;
    identity: any;
    bio: string;
    education_data: [
        {
            id: string;
            school: string;
            degree: string;
            start_date: Date;
            end_date: Date;
        }
    ];
    experience_data: [
        {
            id: string;
            school: string;
            company_name: string;
            start_date: Date;
            end_date: Date;
        }
    ];
    English_level: string;
    spoken_languages: string[];
    teaching_fields: string[];
    video_file: string;
    interview_status: string;
    identity_image?: File;
    country_id: string;
    working_online?: string;
};

export type AddTeacher_props = {
    title?: string;
    dataSource?: any;
    updateData?: any;
    setModel?: any;
    resetForm?: any;
    refetch: () => void;
};
export const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const TeacherValidation = (resetForm: boolean) =>
    Yup.object({
        name: Yup.string().trim().required(requiredTranslation),
        email: Yup.string().required(t("email is required")).matches(isEmail, t("Please enter a valid email address")),
        phone: Yup.string().trim().required(requiredTranslation),
        birthday: Yup.date().required(requiredTranslation),
        password: resetForm ? Yup.string().trim().required(requiredTranslation) : Yup.string().trim(),
        gender: Yup.string().trim().required(requiredTranslation),
        language: Yup.string().trim().required(requiredTranslation),
        identity: resetForm ? Yup.array().required().min(1, requiredTranslation) : Yup.array(),
        bio: Yup.string().required(requiredTranslation),
    });
