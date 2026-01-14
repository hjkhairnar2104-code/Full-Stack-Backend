
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./setQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity } from "../../store/action";
import { removeItemFromCart } from "../../store/action";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";


const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
}) => {

    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const handleQtyIncrease = (cartItems) => {
        dispatch(increaseCartQuantity(
            cartItems,
            toast,
            currentQuantity,
            setCurrentQuantity
        ));
    }

    const handleQtyDecrease = (cartItems) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItems, newQuantity));
        }
    };

    const removeItemsFromCart = (cartItems) => {
        dispatch(removeItemFromCart(cartItems,toast));
    }



    return (
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border border-slate-200  rounded-md  lg:px-4  py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex  flex-col gap-2  ">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
                    <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">{productName}</h3>
                </div>
                <div className="md:w-36 sm:w-24 w-12">
                    <img src={image} alt={productName} className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md" />


                    <div className="flex items-end gap-5 mt-3">
                        <button onClick={() => removeItemsFromCart(
                            {
                                productId,
                                productName,
                                image,
                                description,
                                quantity,
                                price,
                                discount,
                                specialPrice,
                            }
                        )} className="font-semibold  py-2 px-4 rounded-md bg-red-700 text-white flex items-center justify-center  hover:text-gray-300 transition duration-300">
                            <HiOutlineTrash size={16} />
                            Remove
                        </button>
                    </div>
                </div>

            </div>

            <div className="justify-self-center">
                {formatPrice(Number(specialPrice))}
            </div>


            <div className="justify-self-center">
                <SetQuantity quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={() => handleQtyIncrease(
                        {
                            productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        })}
                    handleQtyDecrease={() => handleQtyDecrease(
                        {
                            productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        }
                    )} />
            </div>




            <div className="justify-self-center lg:text-[22px] ">
                {Number(currentQuantity) * Number(specialPrice)}
            </div>



        </div>

    );

}

export default ItemContent;