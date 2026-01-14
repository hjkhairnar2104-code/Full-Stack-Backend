import HeroBaner from "./HeroBaner";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProduct } from "../../store/action";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);
    const { isLoading, errorMessage } = useSelector((state) => state.errors)

    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])

    //     if (isLoading) {
    //     return (
    //         <div>
    //             <Loader text={"Product Loading"} />
    //         </div>
    //     );
    // }

    // // ---- ERROR UI ----
    // if (errorMessage) {
    //     return (
    //         <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto flex justify-center items-center h-[300px]">
    //             <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
    //             <span className="text-slate-800 text-lg font-medium">
    //                 {errorMessage}
    //             </span>
    //         </div>
    //     );
    // }

    return (
        <div className="lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBaner />
            </div>

            <div className="py-4">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-800 text-4xl font-bold">Products</h1>
                    <span className="text-slate-700">
                        Discover our handpicked selection of top rated items just for you.
                    </span>
                </div>
            </div>

            {isLoading? (
                <Loader text={"Product Loading"} />
            ) : errorMessage ? (
                <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto flex justify-center items-center h-[300px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {
                        products &&
                        products.slice(0, 4).map((item) => (
                            <ProductCard key={item.productId} {...item} />
                        ))
                    }
                </div>
            )}

        </div>


    )
}

export default Home;