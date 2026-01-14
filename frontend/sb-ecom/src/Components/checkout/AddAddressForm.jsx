import React, { useEffect } from 'react'
import { Form } from 'react-hook-form'
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from 'react-icons/ai'
import InputField from '../shared/InputField'
import { RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/action';

const AddAddressForm = ({address,setOpenAddressModal}) => {

    const dispatch=useDispatch();

    const {btnLLoader}=useSelector((state)=>state.errors);

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        mode: "onTouched",
    })

    const setAddressHandler = async (data) => {
       dispatch(
        addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        )
    )
    }

    useEffect(()=>{
        if(address?.addressId){
            setValue("buildingName",address?.buildingName)
            setValue("city",address?.city)
            setValue("state",address?.state)
            setValue("zip",address?.zip)
            setValue("street",address?.street)
            setValue("country",address?.country)
        }

    },[address])

    return (
        <div className="">
            <form
                onSubmit={handleSubmit(setAddressHandler)}
                className=""
            >
                <div className="flex justify-center items-center mb-4 font-semibold text-slate-800 text-2xl py-2 px-4">
                    <FaAddressCard className="text-2xl mr-2" />
                    {!address?.addressId
                    ?" Add Address"
                    : "Update Address" }
                </div>
                <hr className="mt-2 mb-2 text-black" />

                <div className="flex flex-col gap-4">
                    <InputField
                        label="Building Name"
                        required={true}
                        id="buildingName"
                        type="text"
                        message="Building name is required"
                        placeholder="Enter Building name"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="City"
                        required={true}
                        id="city"
                        type="text"
                        message="City name is required"
                        placeholder="Enter city name"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="State"
                        required={true}
                        id="state"
                        type="text"
                        message="State name is required"
                        placeholder="Enter State name"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="Pincode"
                        required={true}
                        id="zip"
                        type="text"
                        message="Pincode name is required"
                        placeholder="Enter Pincode"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="Street"
                        required={true}
                        id="street"
                        type="text"
                        message="Street name is required"
                        placeholder="Enter Street name"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="Country"
                        required={true}
                        id="country"
                        type="text"
                        message="Country name is required"
                        placeholder="Enter Country name"
                        register={register}
                        errors={errors}
                    />




                </div>

                <button
                    disabled={btnLLoader}
                    className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
                    type="submit">
                    {btnLLoader ? (
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
                        <>Save Address</>
                    )}
                </button>

            </form>
        </div>
    )
}

export default AddAddressForm

