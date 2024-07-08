import Slider from "react-slick";
import { useState, useEffect } from "react";
import skillApi from "../../../services/apis/skillApi";

export default function JobByCategory() {
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await skillApi.getAllSkills();
                console.log(response);
                setSkills(response.data);
            } catch (error) {
                console.log("Failed to fetch data at: ", error);
            }
        };
        fetchData();
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="flex justify-center w-full pb-10 mx-auto mt-8 bg-gradient-to-b from-white to-primary-50">
            <div className="container px-4 md:px-10 lg:px-20 xl:px-44">
                <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2">
                    <div className="flex flex-col justify-start col-span-1">
                        <p className="mb-2 font-bold text-md text-primary">Công Việc Theo Kĩ Năng</p>
                        <p className="text-xl font-bold md:text-2xl">Chọn Công Việc Theo Kĩ Năng Của Bạn</p>
                    </div>
                    <div className="col-span-1">
                        <p className="mt-4 text-sm text-gray-400 md:mt-7">
                            Tìm kiếm tất cả các vị trí đang mở trên web. Nhận ước tính lương cá nhân của riêng bạn. Đọc
                            đánh giá về hơn 600.000 công ty trên toàn thế giới.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center px-2 md:px-10">
                    <div className="w-full">
                        <Slider {...settings}>
                            {skills.map((skill) => (
                                <div key={skill.id} className="px-2">
                                    <div className="p-4 bg-white rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <div className="p-4 bg-blue-100 rounded-full">
                                                <img
                                                    src={`https://via.placeholder.com/40?text=${skill.skillName}`}
                                                    alt={skill.skillName}
                                                    className="w-10 h-10"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-bold lowercase text-primary md:text-xl ">
                                                    {skill.skillName}
                                                </h3>
                                                {/* <p className="text-blue-500">{category.jobs} Jobs</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-8">
                    <button className="py-3 font-bold text-white uppercase rounded-lg shadow-lg px-9 bg-primary lg:mx-0 hover:bg-primary-600 hover:shadow-lg">
                        tìm việc
                    </button>
                </div>
            </div>
        </div>
    );
}
