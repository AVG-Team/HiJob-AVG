import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import companyApi from "../../../services/apis/companyApi";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Link } from "react-router-dom";

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

export default function FeaturedComp() {
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await companyApi.getTop5Companies();
                console.log(response);
                setCompanies(response.data);
            } catch (error) {
                console.log("Failed to fetch data at: ", error);
            }
        };
        fetchData();
    }, []);
    const settings = {
        className: "p-2",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
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
        <div data-aos="zoom-in" data-aos-duration="2000" className="container px-5 py-20 mx-auto mt-8">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center p-4 mb-4 text-center">
                    <p className="font-bold text-md text-primary">Công Ty Hàng Đầu</p>
                    <h1 className="mt-2 text-3xl font-bold">Được tuyển dụng vào các công ty hàng đầu</h1>
                </div>
                <div className="w-full px-2 md:px-10">
                    <Slider {...settings}>
                        {companies.map((company) => (
                            <div key={company.id} className="p-5">
                                <Link to={`/cong-ty/${company.id}`} className="w-full">
                                    <div className="p-6 px-12 bg-white rounded-lg shadow-lg h-36">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={`https://via.placeholder.com/40?text=${company.name}`}
                                                alt={company.name}
                                                className="h-14 w-14"
                                            />
                                            <p className="mt-2 text-lg font-bold text-primary">{company.name}</p>
                                            {/* <p className="text-sm text-blue-500">{company.about}</p> */}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
