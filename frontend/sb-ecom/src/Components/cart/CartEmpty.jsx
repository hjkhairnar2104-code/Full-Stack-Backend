import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {

    return (
        <div className="min-h-[800px] flex flex-col items-center justify-center ">
            <div className="flex flex-col items-center">
                <MdShoppingCart size={70} className="text-slate-500 mb-4" />
                <div className=" font-bold text-3xl text-slate-700">
                    <h1>Your Cart is Empty</h1>
                </div>
                <div className=" mt-2 text-lg text-slate-500">
                    <h1>Add some products to get started</h1>
                </div>
            </div>
            <div className="mt-6">
                <Link to="/" className="flex gap-2 items-center text-blue-600 hover:text-red-500">
                    <MdArrowBack size={24} />
                    <span className="font-medium">Start Shopping</span>
                </Link>

            </div>

        </div>

    );


}

export default CartEmpty;