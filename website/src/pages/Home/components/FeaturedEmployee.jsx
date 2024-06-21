import Slider from "react-slick";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import PropTypes from "prop-types";

const categories = [
    { id: 1, name: "Java", jobs: 2 },
    { id: 2, name: "C#", jobs: 4 },
    { id: 3, name: "Spring Boot", jobs: 3 },
    { id: 4, name: "Reactjs", jobs: 2 },
    { id: 5, name: "Php", jobs: 3 },
];
function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style,
                cursor: "pointer",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={onClick}
            tabIndex={0}
        >
            <ArrowCircleRightIcon fontSize="large" className="z-10 mr-2 text-primary" />
        </button>
    );
}
function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style,
                cursor: "pointer",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                left: "-30px",
            }}
            onClick={onClick}
            tabIndex={0}
        >
            <ArrowCircleLeftIcon fontSize="large" className="text-primary" />
        </button>
    );
}

CustomNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};
CustomPrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};
export default function FeaturedEmployee() {
    const settings = {
        className: "p-2",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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
        <div className="container px-5 pb-10 mx-auto mt-8 mb-10">
            <div className="items-center justify-center flex-1">
                <div className="items-center justify-center flex-1 p-4 mb-4 text-center ">
                    <p className="font-bold text-center text-md text-primary">Nhà Tuyển Dụng</p>
                    <div className="flex items-center justify-center mt-2">
                        <h1 className="text-3xl font-bold text-center">Làm Việc Tại Các Công Ty Hàng Đầu</h1>
                    </div>
                </div>
                <div className="flex items-center justify-center px-10">
                    <div className="container">
                        <Slider {...settings}>
                            {categories.map((category) => (
                                <div key={category.id} className="p-5 px-2">
                                    <div className="p-6 bg-white rounded-lg shadow-lg">
                                        <div className="items-center justify-center flex-1">
                                            <div className="flex items-center justify-center">
                                                <img
                                                    src={`https://via.placeholder.com/40?text=${category.name}`}
                                                    alt={category.name}
                                                    className="w-10 h-10"
                                                />
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <p className="text-xl font-bold">{category.name}</p>
                                                <p className="text-blue-500">{category.jobs} Jobs</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}
