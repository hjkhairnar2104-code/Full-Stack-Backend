import { Button, Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddress } from '../../store/action';
import toast from 'react-hot-toast';

const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);

    const { isLoading, errorMessage } = useSelector((state) => state.errors);

    const paymentMethod = false;

    const { address, selectUserCheckoutAddress } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch();

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1)
    }
    const handleNext = () => {
        if (activeStep === 0 && !selectUserCheckoutAddress) {
            toast.error("Please select any one address to work it correctly");
            return;
        }
        setActiveStep((prevStep) => prevStep + 1)
    }

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment",
    ]

    useEffect(() => {
        dispatch(getUserAddress());
    }, [dispatch])

    return (
        <div className='py-14 min-h-[calc(100vh-100px)]'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>

                ))}
            </Stepper>

            <div className='mt-5'>
                {activeStep === 0 && <AddressInfo address={address} />}
            </div>


            <div className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white w-full py-4 border-slate-700'>
                <Button variant='outlined' disabled={activeStep === 0} onClick={handleBack}
                    className={`px-6 h-11 rounded-lg border font-semibold transition-all
                       ${activeStep === 0
                            ? "border-gray-300 text-gray-400 cursor-not-allowed"
                            : "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                        }
                   `}>
                    Back
                </Button>

                {activeStep !== steps.length - 1 && (
                    <button disabled={
                        errorMessage || (
                            (activeStep === 0 ? !selectUserCheckoutAddress
                                : activeStep === 1 ? !paymentMethod
                                    : false
                            )
                        )
                    } className={`bg-custom-blue font-bold cursor-pointer  px-8 h-10 rounded-md text-white
                    ${errorMessage ||
                            (activeStep === 0 && !selectUserCheckoutAddress) ||
                            (activeStep === 1 && !paymentMethod)
                            ? "opacity-60"
                            : ""
                        }
              
              `} onClick={handleNext}>
                        Next

                    </button>
                )}

            </div>


        </div>
    )
}

export default Checkout
