import {Form, Formik} from "formik";
import {t} from "i18next";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useAuth} from "../../../../context/auth-and-perm/AuthProvider";
import {useFetch, useMutate} from "../../../../hooks";
import {notify} from "../../../../utils/toast";
import {Button} from "../../../atoms";
import {requestForToken} from '../../../../utils/firebase';
import LoginMainData from "./LoginMainData";
import {useEffect} from "react";

const loginSchema = Yup.object().shape({
    password: Yup.string().trim().required(),
});

export const LoginForm = () => {
    const navigate = useNavigate();
    const {login} = useAuth();

    const {isLoading, mutate} = useMutate({
        endpoint: "dashboard/auth/login",
        formData: true,
        mutationKey: ["login"],
        onSuccess: (data: any) => {
            const token = data.data.token;
            Cookies.set("token", token, {expires: 7});
            notify("success", "_", data?.data?.message);
            login(data);
            navigate("/");
        },
        onError: (err) => {
            notify("error", `${err.response.data.message}`);
        },
    });

    const {data: logo} = useFetch<any>({
        queryKey: ["/get-logo-url"],
        endpoint: "dashboard/get-logo-url",
    });

    const initialValues = {
        phone: "",
        password: "",
        device_token: "",
    };

    // @ts-ignore
    useEffect(() => {
        // Call the fetchToken inside Formik's context
        return async (setFieldValue: (arg0: string, arg1: string) => void) => {
            const token = await requestForToken();
            if (token) {
                Cookies.set("fcm_token", token, {expires: 7});
                setFieldValue('device_token', token);
            }
        };
    }, []);

    return (
        <>
            <div className="login-page flex flex-col items-center justify-center h-screen gap-3">
                <div className="cust-padding">
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 login-box relative">
                            <div className="content">
                                <div className="logo-in-top">
                                    <img
                                        alt='logo'
                                        src={logo?.data?.light_logo}
                                        style={{height: "130px", width: "100px"}}
                                    />
                                </div>
                                <p className="text-base">{t("Welcome to Tajweedly")}</p>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={loginSchema}
                                    onSubmit={(values) => {
                                        mutate(values);
                                    }}
                                >
                                    {({setFieldValue}) => {
                                        useEffect(() => {
                                            const fetchToken = async () => {
                                                const token = await requestForToken();
                                                if (token) {
                                                    Cookies.set("fcm_token", token, {expires: 7});
                                                    await setFieldValue('device_token', token); // Set device_token in Formik
                                                }
                                            };
                                            fetchToken().then(r => r);
                                        }, [setFieldValue]);

                                        return (
                                            <Form>
                                                <LoginMainData/>
                                                <div className="text-center pb-7">
                                                    <Button
                                                        className="mt-3 w-full sign_in_submit_login "
                                                        type="submit"
                                                        variant="primary"
                                                        loading={isLoading}
                                                    >
                                                        {t("Login")}
                                                    </Button>

                                                    {/* <div className="flex justify-end">
                                                        <a
                                                            className="text-dark flex flex-row items-center text-[12px]"
                                                            target="_blank"
                                                            href="https://technoraft.com/"
                                                        >
                                                            {t("Developed by")}
                                                            <img
                                                                src={`/images/technoraft-logofooter.png`}
                                                                alt=""
                                                                width={100}
                                                                height={100}
                                                            />
                                                            © 2023
                                                        </a>
                                                    </div> */}
                                                </div>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
