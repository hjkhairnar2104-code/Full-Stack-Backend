import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import ProductView from "./ProductView";
import Truncate from "../../utils/Truncate";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";


const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about = false,
}

) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnloader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();


    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);

        }
    }

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1,toast));
    }


    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView(
                    {
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice
                    }
                )
            }} className="w-full aspect-[3/2] overflow-hidden ">
                <img className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    src={image} alt={productName}>
                </img>
            </div>

            <div className="p-4">
                <h2 onClick={() => {
                    handleProductView(
                        {
                            id: productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice
                        }
                    )
                }} className="text-lg font-semibold mb-2 cursor-pointer">
                    {Truncate(productName, 50)}
                </h2>
                <div className="min-h-20">
                    <p className="text-sm text-gray-600"> {Truncate(description, 60)}</p>
                </div>
                {!about && (
                    <div className="flex justify-between">{
                        specialPrice ? (
                            <div className="flex flex-col">
                                <span className="text-gray-800 line-through" >
                                    ${Number(price).toFixed(2)}
                                </span>
                                <span className="text-xl font-bold text-slate-700">
                                    ${Number(specialPrice).toFixed(2)}
                                </span>

                            </div>
                        ) : (
                            <div>
                                <span className="text-xl font-bold text-slate-700">
                                    {"  "}
                                    ${Number(price).toFixed(2)}
                                </span>
                            </div>
                        )
                    }
                        <button
                            disabled={!isAvailable || btnloader}
                            onClick={() => addToCartHandler({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            className={`bg-blue-700 flex items-center gap-1 py-2 px-3 ${isAvailable ? "opacity-100 hover:bg-red-700" : "opacity-70"} rounded-lg `}>
                            <FaShoppingCart className="mr-2" />
                            {isAvailable ? "Add to Cart" : "Stock out"}
                        </button>
                    </div>
                )}


            </div>
            <ProductView
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable} />
        </div>
    )
}

export default ProductCard;