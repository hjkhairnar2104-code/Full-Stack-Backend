import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Filter from "./Filter";
import { fetchCategories, fetchProduct } from "../../store/action";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";




const Products = () => {

    const { products, categories ,pagination} = useSelector((state) => state.product);

    const { isLoading, errorMessage } = useSelector((state) => state.errors)

    const dispatch = useDispatch();

    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // ---- LOADING UI ----
    if (isLoading) {
        return (
            <div>
                <Loader text={"Product Loading"} />
            </div>
        );
    }

    // ---- ERROR UI ----
    if (errorMessage) {
        return (
            <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto flex justify-center items-center h-[300px]">
                <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
                <span className="text-slate-800 text-lg font-medium">
                    {errorMessage}
                </span>
            </div>
        );
    }

    return (

        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter categories={categories ? categories : []} />
            <div className="min-h-[700px]">
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {
                        products && products.length > 0 ?
                            products.map((item) => (
                                <ProductCard key={item.productId} {...item} />
                            )) :
                            <p>No Products Found</p>
                    }
                </div>
                <div className="flex justify-center pt-10">
                    <Paginations numberOfPage={pagination?.totalpages}
                                totalProducts={pagination?.totalElements}
                    />
                </div>
            </div>

        </div>
    );
};

export default Products;
