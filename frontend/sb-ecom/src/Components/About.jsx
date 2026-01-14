import ProductCard from "./shared/ProductCard";

const products = [
    {
        image: "https://th.bing.com/th/id/OIP.QCthueGFvSDjIH9k4mPXlQHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
        productName: "iPhone 17 Pro Max",
        description:
            "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
        specialPrice: 720,
        price: 780,
        
    },
    {
        image: "https://th.bing.com/th/id/OIP.1_gP8YjuvOTcoualeUO7tAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
        productName: "Samsung Galaxy S21",
        description:
            "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
        specialPrice: 699,
        price: 799,
        
    },
    {
        image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/69d6984c-f687-4dc4-ba00-292c9ce2828b.jpg",
        productName: "Google Pixel 9",
        description:
            "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
        price: 599,
        specialPrice: 400,

        
    }
]

const About = () => {

    return (

        <div className="max-w-7xl mx-auto px-4 py-4 ">
            <h1 className="text-slate-800 font-bold text-4xl text-center mb-12">
                About
            </h1>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-12 lg:gap-24">

                <div className="w-full md:w-1/2 text-center md:text-left ">
                    <p className="text-lg">
                        Welcome to our E-COMMERCE! We are dedicated to providing best products and service to our customer.
                        Our Mission is to offer a seamless shopping experience while ensuring highest quality of offering
                    </p>
                </div>

                <div className="w-full md:w-1/2 mb-6">
                    <img src="https://cdn.dribbble.com/users/2948332/screenshots/5926397/media/97472cb011b51f566f0ab93c11d967d1.jpg?resize=400x300&vertical=center"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105" />
                </div>

            </div>

            <div className="py-7 space-y-8">
                <h1 className="text-slate-800 font-bold text-4xl text-center mb-12">
                    Our Products
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            image={product.image}
                            productName={product.productName}
                            description={product.description}
                            specialPrice={product.specialPrice}
                            price={product.price}
                            about
                        />
                    ))}



                </div>
            </div>






        </div>
    );

}


export default About;