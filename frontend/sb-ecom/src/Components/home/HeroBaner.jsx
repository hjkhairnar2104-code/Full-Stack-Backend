// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
  import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { BannerLists } from '../../utils';
import { Link } from "react-router-dom";


const colors = ["bg-blue-600", "bg-purple-600", "bg-rose-600"];

const HeroBaner = () => {

    return (
    

        <Swiper grabCursor={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            navigation
            modules={[Pagination, EffectFade, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            slidesPerView={1}
        >
            {BannerLists.map((item, i) => (
                <SwiperSlide key={item.id}>
                    <div className={`carousel-item rounded-md w-full sm:h-[500px] ${colors[i]}`}>
                        <div className="flex justify-center items-center h-full">
                            <div className="hidden lg:flex justify-center w-1/2 p-8">
                                <div className="text-center">
                                    <h3 className="text-3xl text-white font-bold">
                                        {item.title}
                                    </h3>

                                    <h1 className="text-5xl text-white font-bold mt-3">
                                        {item.subtitle}
                                    </h1>

                                    <p className="text-white font-bold mt-4">
                                        {item.description}
                                    </p>

                                    <Link className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 "
                                        to="/product">
                                        SHOP
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center w-full lg:w-1/2 p-4">
                                <img src={item?.image} />
        
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
            ))}




        </Swiper>

    );

}

export default HeroBaner;