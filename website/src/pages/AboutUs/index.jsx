import { useEffect } from "react";
import PropTypes from "prop-types";



export default function AboutUs(props) {
    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);
    AboutUs.propTypes = {
        title: PropTypes.string,
    };
    return (
        <main className="flex items-center justify-center bg-primary-50 main-content">
            <div className="w-full lg:px-20">
                    <div className="py-2 lg:col-span-2 mb-6">
                        <div className="flex items-center justify-center mt-5 sm:px-6 lg:px-8">
                            <div className="w-full max-w-6xl p-6 bg-white rounded shadow-lg lg:rounded-lg">
                                <h1 className="mb-5 text-3xl font-bold text-red-500 lg:mb-8 lg:text-5xl">Về HIJOB</h1>
                                <p className="text-xl font-bold">Việc làm IT hàng đầu</p>
                                <a href="https://topdev.vn">https://hijob.vn</a>
                                <hr className="my-4 border-t border-solid border-gray-300"/>
                                <p className="mb-4">Được thành lập vào năm 2024 bởi AVG-TEAM
                                    , <strong>HIJOB</strong> đã trở thành <strong>nền tảng Tuyển dụng IT hàng đầu
                                        tại Việt Nam</strong> với trang web có hàng triệu lượt truy cập hàng tháng tập
                                    trung vào IT <a href="https://hijob.vn">https://hijob.vn</a> &amp; Ứng dụng tìm
                                    kiếm việc làm IT trên thiết bị di động, hơn 380.000 hồ sơ Lập trình viên &amp; quản
                                    lý Cộng đồng Lập trình viên lớn nhất Việt Nam với hơn 550.000 người theo dõi trên
                                    mạng xã hội. Từ năm 2020, HIJOB nhận đầu tư
                                    từ <strong>Saramin</strong> (https://saramin.co.kr - KOSDAQ 143240) - Nền tảng tuyển
                                    dụng số 1 tại Hàn Quốc.</p>
                                <p className="mb-4">HIJOB là đơn vị tổ chức 02 sự kiện Công nghệ thường niên lớn nhất
                                    Việt Nam: <strong>Vietnam Mobile Day &amp; Vietnam Web Summit</strong> với quy mô
                                    hàng nghìn người tham dự tại TP.HCM &amp; Hà Nội. Với chuyên môn và hiểu biết sâu
                                    sắc trong việc thu hút và gắn kết với cộng đồng Công nghệ &amp; Lập trình viên thông
                                    qua các hoạt động trực tuyến và ngoại tuyến, mạng xã hội/blog/trang web..., HIJOB
                                    đã trở thành đơn vị hàng đầu tại Việt Nam giúp xây dựng Thương hiệu Nhà tuyển dụng
                                    cho hàng trăm công ty CNTT và Công nghệ tại Việt Nam. Hơn nữa, để hỗ trợ &amp; định
                                    hướng thị trường Tuyển dụng CNTT tại Việt Nam, từ năm 2016 HIJOB đã công bố <a
                                        href="https://hijob.vn/page/bao-cao-it-viet-nam"><strong>Báo cáo Thị trường
                                        CNTT Việt Nam</strong></a> thường niên với sự tin tưởng &amp; kiểm chứng của
                                    nhiều doanh nghiệp, tổ chức &amp; chính phủ.</p>
                                <hr className="my-4"/>
                                <p>Sứ mệnh</p>
                                <h2 className="text-3xl font-bold">MAKE IT VIETNAM BETTER</h2>
                                <ul className="list-disc pl-4">
                                    <li><strong>Kết nối</strong> các Lập trình viên với các vị trí tuyển dụng tốt nhất
                                        từ các công ty IT đã được xác minh
                                    </li>
                                    <li><strong>Cung cấp</strong> cho các công ty IT nguồn lập trình viên tốt nhất và
                                        xây dựng thương hiệu nhà tuyển dụng lâu dài
                                    </li>
                                    <li><strong>Thúc đẩy</strong> nguồn nhân lực IT Việt Nam cả về chất lượng và số
                                        lượng thông qua cộng đồng, sự kiện / hoạt động và giáo dục
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
        </main>
    );
}
