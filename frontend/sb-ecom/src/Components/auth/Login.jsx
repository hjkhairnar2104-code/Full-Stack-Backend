import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateSignUser } from "../../store/action";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";
import { RotatingLines } from "react-loader-spinner";

const LogIn = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onTouched",
    })

    const loginHandler = async (data) => {
        dispatch(authenticateSignUser(data, toast, reset, navigate, setLoader));
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
            >
                <div className="flex flex-col items-center justify-center">
                    <AiOutlineLogin className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Login Here
                    </h1>

                </div>
                <hr className="mt-2 mb-2 text-black" />

                <div className="flex flex-col gap-4">
                    <InputField
                        label="UserName"
                        required={true}
                        id="username"
                        type="text"
                        message="Username is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="Password"
                        required={true}
                        id="password"
                        type="password"
                        message="* Password is required"
                        placeholder="Enter your Password"
                        register={register}
                        errors={errors}
                    />


                </div>

                <button
                    disabled={loader}
                    className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3 mt-8"
                    type="submit">
                    {loader ? (
                        <>
                            <RotatingLines
                                visible={true}
                                height="18"
                                width="18"
                                strokeWidth="5"
                                animationDuration="0.75"
                            />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>Login</>
                    )}
                </button>

                <p className="text-center text-sm text-slate-700 mt-6">
                    Don't have an account?
                    <Link
                        className="font-semibold underline hover:text-black"
                        to="/register">
                        <span> SignUp</span></Link>
                </p>



            </form>
        </div>
    )

}

export default LogIn;

