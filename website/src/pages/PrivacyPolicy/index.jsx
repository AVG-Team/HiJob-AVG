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
                            <h1 className="text-5xl text-red-500">Quy định bảo mật</h1>
                            <hr className="my-5 border-t border-solid border-gray-300"/>
                            <ul className="list-decimal pl-5">
                                <li className="text-xl font-bold"><h2>Thu thập và lưu giữ thông tin</h2>
                                    <div className="mt-3 text-base font-normal"><p>HIJOB thu thập thông tin cá nhân với
                                        sự đồng ý của người dùng trong phạm vi tối thiểu để cung cấp dịch vụ và tất cả
                                        thông tin cá nhân được thu thập chỉ được sử dụng trong phạm vi mục đích đã thông
                                        báo. Tùy thuộc vào loại dịch vụ do HIJOB cung cấp, thông tin cá nhân được thu
                                        thập, sử dụng, lưu giữ như sau.</p>
                                        <table className="mb-3 w-fit">
                                            <tbody>
                                            <tr className="text-center align-baseline">
                                                <th className="w-1/5 border border-black p-2">Phương thức thu thập</th>
                                                <th className="w-1/5 border border-black p-2">Dữ liệu thu thập</th>
                                                <th className="w-3/5 border border-black p-2">Mục đích thu thập</th>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr>
                                                <td colSpan="3" className="border border-black p-2 font-bold">Thành viên
                                                    là ứng viên
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Đăng ký thành viên thông qua tài
                                                    khoản Google / Github / Apple ID
                                                </td>
                                                <td className="border border-black p-2">Tên, Email, Ảnh hồ sơ, ngôn
                                                    ngữ
                                                </td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Tạo hồ sơ người dùng trên HIJOB và định
                                                            danh người dùng.
                                                        </li>
                                                        <li className="pb-2">Quản lý tài khoản: HIJOB cung cấp cho
                                                            người dùng dashboard để quản lý quá trình ứng tuyển và sử
                                                            dụng dịch vụ ở HIJOB
                                                        </li>
                                                        <li className="pb-2">Lưu trữ sơ yếu lý lịch, hồ sơ xin việc khi
                                                            có phát sinh hành động nộp đơn ứng tuyển, nhằm giúp người
                                                            dùng quản lý hồ sơ, lịch sử xin việc và thao tác nhanh chóng
                                                            ở những lần ứng tuyển sau.
                                                        </li>
                                                        <li className="pb-2">Cập nhật và thêm mới sơ yếu lý lịch phục vụ
                                                            cho việc nộp hồ sơ xin việc.
                                                        </li>
                                                        <li className="pb-2">Gửi thông báo cập nhật trạng thái hồ sơ ứng
                                                            tuyển.
                                                        </li>
                                                        <li className="pb-2">Cung cấp thông tin về công việc mới, công
                                                            việc liên quan, cập nhật thị trường và kiến thức IT.
                                                        </li>
                                                        <li className="pb-2">Sử dụng các dịch vụ có sẵn tại HIJOB: Dịch
                                                            vụ tìm kiếm việc làm, tạo CV, đánh giá tính cách làm việc.
                                                        </li>
                                                        <li className="pb-2">Gửi thông báo về thay đổi điều khoản, điều
                                                            kiện, xử lý khiếu nại và yêu cầu.
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Hoạt động trên trang web và ứng
                                                    dụng di động
                                                </td>
                                                <td className="border border-black p-2">Dữ liệu được lưu lại khi bạn
                                                    truy cập, nơi bạn nhấp, cuộn, di chuột qua hoặc tương tác với các
                                                    khu vực của trang web <a className="text-blue-600 underline"
                                                                             href="https://hijob.vn">hijob.vn</a> và
                                                    ứng dụng di động cũng như thời gian, khoảng thời gian các hoạt động
                                                    đó diễn ra.
                                                </td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Cải thiện dịch vụ cung cấp của trang web <a
                                                            className="text-blue-600 underline"
                                                            href="https://hijob.vn">hijob.vn</a> và ứng dụng di động
                                                        </li>
                                                        <li className="pb-2">Phân tích xu hướng và số liệu thống kê về
                                                            việc sử dụng trang web và ứng dụng di động
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Tạo CV</td>
                                                <td className="border border-black p-2">Thông tin cá nhân: Tên, địa chỉ
                                                    email, số điện thoại, tuổi, giới tính, hình ảnh, chức danh công việc
                                                    hiện tại/quá khứ, kinh nghiệm làm việc/học vấn, mạng xã hội, ngôn
                                                    ngữ, tùy chọn liên lạc.
                                                </td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Cung cấp các dịch vụ tìm kiếm việc làm và
                                                            lưu trữ sơ yếu lý lịch
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Ứng tuyển</td>
                                                <td className="border border-black p-2">Họ tên, email, số điện thoại,vị
                                                    trí công việc bạn đã nộp đơn ứng tuyển, sơ yếu lý lịch, và dữ liệu
                                                    khác mà bạn cung cấp trong quá trình nộp đơn.
                                                </td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Cung cấp các dịch vụ tìm kiếm việc làm</li>
                                                        <li className="pb-2">Gửi dữ liệu hồ sơ xin việc, sơ yếu lý lịch
                                                            cho đơn vị tuyển dụng, và cho phép nhà tuyển dụng sử dụng
                                                            thông tin trên để liên lạc đến ứng viên.
                                                        </li>
                                                        <li className="pb-2">Lưu trữ sơ yếu lý lịch, hồ sơ xin việc,
                                                            nhằm giúp người dùng quản lý hồ sơ, lịch sử xin việc và thao
                                                            tác nhanh chóng ở những lần ứng tuyển sau
                                                        </li>
                                                        <li className="pb-2">Gửi thông báo cập nhật trạng thái hồ sơ ứng
                                                            tuyển
                                                        </li>
                                                        <li className="pb-2">Cung cấp thông tin về công việc mới, công
                                                            việc liên quan, cập nhật thị trường và kiến thức IT
                                                        </li>
                                                        <li className="pb-2">HIJOB có thể sẽ liên hệ với bạn qua các
                                                            phương tiện liên lạc mà bạn đã đồng ý chia sẻ với HIJOB
                                                            (bao gồm nhưng không giới hạn: email, ứng dụng nhắn tin,...)
                                                            với mục đích sau: xác nhận thông tin, giới thiệu công việc
                                                            phù hợp. Khi bạn đồng ý và chấp thuận, HIJOB có thể sử dụng
                                                            thông tin này để giới thiệu các công việc phù hợp tiềm năng
                                                            cho bạn và cho các Nhà tuyển dụng tiềm năng. Với hình thức
                                                            liên hệ không qua hệ thống, HIJOB sẽ có hình thức lưu trữ
                                                            thông tin phù hợp để các cơ quan có thẩm quyền thực hiện các
                                                            kiểm chứng liên quan nếu cần thiết
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Trắc nghiệm tính cách làm
                                                    việc/Workspace Personality Test
                                                </td>
                                                <td className="border border-black p-2">Kết quả bài kiểm tra</td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Xử lý và lưu trữ kết quả bài đánh giá tính
                                                            cách làm việc. HIJOB chỉ thực hiện xử lý và lưu trữ phần
                                                            trả lời trong bài kiểm tra và, hoàn toàn không gửi thông tin
                                                            định danh cá nhân cho bên thứ ba
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tr>
                                                <td colSpan="3" className="border border-black p-2 font-bold">Thành viên
                                                    là nhà tuyển dụng
                                                </td>
                                            </tr>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Đăng ký thành viên bằng
                                                    username/email và mật khẩu
                                                </td>
                                                <td className="border border-black p-2">ID, mật khẩu, tên công ty, tên
                                                    người đại diện, email, số điện thoại
                                                </td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Xác nhận danh tính và tư vấn/yêu cầu, dịch
                                                            vụ tuyển dụng theo yêu cầu
                                                        </li>
                                                        <li className="pb-2">Tạo và lưu trữ hồ sơ nhà tuyển dụng bao
                                                            gồm: Thông tin công ty, quản lý đăng tuyển, quản lý ứng viên
                                                        </li>
                                                        <li className="pb-2">Cung cấp thông tin tiếp thị như bản tin
                                                            nhân sự, bản tin tuyển dụng việc làm và sự kiện
                                                        </li>
                                                        <li className="pb-2">Gửi thông báo về thay đổi điều khoản, điều
                                                            kiện, xử lý khiếu nại và yêu cầu
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Quản lý tin đăng</td>
                                                <td className="border border-black p-2">Tên, số điện thoại, email, thông
                                                    tin công ty, nội dung đa phương tiện (hình ảnh, nội dung khác về
                                                    doanh nghiệp)
                                                </td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Cung cấp dịch vụ đăng và quản lý tin tuyển
                                                            dụng
                                                        </li>
                                                        <li className="pb-2">Lưu trữ thông tin của công ty và hiển thị
                                                            nội dung đó trên Trang web của HIJOB
                                                        </li>
                                                        <li className="pb-2">Cập nhật tình trạng tin đăng tuyển</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody>
                                            <tr className="align-baseline">
                                                <td className="border border-black p-2">Quản lý ứng viên</td>
                                                <td className="border border-black p-2">Tên, số điện thoại, email, thông
                                                    tin doanh nghiệp, ghi chú trong đơn ứng tuyển của ứng viên
                                                </td>
                                                <td className="border border-black p-2">
                                                    <ul className="list-none">
                                                        <li className="pb-2">Cập nhật trạng thái ứng viên</li>
                                                        <li className="pb-2">Cung cấp thông tin liên hệ ứng viên</li>
                                                        <li className="pb-2">Được xem thông tin ứng viên khi có người
                                                            dùng ứng tuyển vào vị trí đăng tuyển của nhà tuyển dụng
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <p>Ngoài ra việc thu thập thông tin để phục vụ các mục đích trên HIJOB có trách
                                            nhiệm hợp tác với các cơ quan pháp luật chia sẻ thông tin các nhân của bạn
                                            nhằm mục đích:</p>
                                        <ul className="ml-6">
                                            <li className="flex space-x-3"><span>- </span><span>Tuân thủ các yêu cầu pháp lý, bảo vệ chống gian lận, giao dịch trái phép và các trách nhiệm pháp lý khác, bảo mật trang web và ứng dụng của chúng tôi, và thực hiện các điều khoản và điều kiện của chúng tôi</span>
                                            </li>
                                            <li className="flex space-x-3"><span>- </span><span>Trong trường hợp khẩn cấp, cần xử lý ngay dữ liệu cá nhân có liên quan để bảo vệ tính mạng, sức khỏe của chủ thể dữ liệu hoặc người khác. Bên Kiểm soát dữ liệu cá nhân, Bên Xử lý dữ liệu cá nhân, Bên Kiểm soát và xử lý dữ liệu cá nhân, Bên thứ ba có trách nhiệm chứng minh trường hợp này.</span>
                                            </li>
                                            <li className="flex space-x-3"><span>- </span><span>Việc xử lý dữ liệu của cơ quan nhà nước có thẩm quyền trong trường hợp tình trạng khẩn cấp về quốc phòng, an ninh quốc gia, trật tự an toàn xã hội, thảm họa lớn, dịch bệnh nguy hiểm; khi có nguy cơ đe dọa an ninh, quốc phòng nhưng chưa đến mức ban bố tình trạng khẩn cấp; phòng, chống bạo loạn, khủng bố, phòng, chống tội phạm và vi phạm pháp luật theo quy định của luật</span>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">Thời gian lưu trữ thông tin</h2>
                                    <div className="mt-3 text-base font-normal"><p>Dữ liệu của ứng viên/nhà tuyển dụng
                                        sẽ được lưu trữ cho đến khi có <span
                                            className="font-bold">yêu cầu hủy bỏ hợp lệ</span> được tiến hành. Dữ liệu
                                        được lưu trữ bảo mật trên máy chủ của HIJOB đặt tại Việt Nam.</p></div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">HIJOB chia sẻ dữ liệu như thế
                                    nào và với các bên nào</h2>
                                    <div className="mt-3 text-base font-normal">
                                        <ul className="ml-6">
                                            <li className="font-bold">a. Cách HIJOB chia sẻ thông tin cá nhân của bạn:
                                                <ul className="font-normal">
                                                    <li className="flex space-x-3"><span>- </span><span>Khi bạn đồng ý: Vì thông tin mà chúng tôi thu thập là dữ liệu cá nhân của bạn, HIJOB sẽ không tiết lộ thông tin cá nhân của bạn cho người khác mà không có sự đồng ý từ bạn</span>
                                                    </li>
                                                    <li>
                                                        <div className="flex space-x-3"><span>- </span><span>Khi HIJOB được yêu cầu hợp pháp để chia sẻ thông tin cá nhân trong các trường hợp:</span>
                                                        </div>
                                                        <ul className="ml-6">
                                                            <li className="flex space-x-3"><span>- </span><span>Thực hiện các điều khoản và điều kiện đã đề cập trong Điều khoản sử dụng và Chính sách bảo mật khi bạn đã đồng ý đăng ký tài khoản và sử dụng dịch vụ của HIJOB</span>
                                                            </li>
                                                            <li className="flex space-x-3"><span>- </span><span>Theo yêu cầu của các cơ quan có thẩm quyền, đáp ứng luật, quy định hiện hành, yêu cầu của chính phủ</span>
                                                            </li>
                                                            <li className="flex space-x-3"><span>- </span><span>Bảo vệ quyền của người dùng khác trong quá trình sử dụng trang web</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="font-bold">b. Các bên được HIJOB chia sẻ thông tin cá nhân của
                                                người dùng
                                                <ul>
                                                    <li>
                                                        <div className="flex space-x-3"><span>- </span><span>Nơi nhận: Ứng viên</span>
                                                        </div>
                                                        <ul className="ml-6 font-normal">
                                                            <li className="flex space-x-3"><span>- </span><span>Mục đích cung cấp: Phục vụ quá trình tìm kiếm việc làm và ứng tuyển của ứng viên </span>
                                                            </li>
                                                            <li className="flex space-x-3"><span>- </span><span>Dữ liệu cung cấp: HIJOB cung cấp thông tin của nhà tuyển dụng trên Trang web bao gồm: Tên công ty, thông tin hoạt động của công ty, website công ty, hình ảnh, bài đăng tuyển</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <div className="flex space-x-3"><span>- </span><span>Nơi nhận: Nhà tuyển dụng</span>
                                                        </div>
                                                        <ul className="ml-6 font-normal">
                                                            <li className="flex space-x-3"><span>- </span><span>Mục đích cung cấp: Phục vụ quá trình tuyển dụng, cung cấp thông tin và hồ sơ ứng viên giúp nhà tuyển dụng đánh giá và chọn lọc ứng viên.</span>
                                                            </li>
                                                            <li className="flex space-x-3"><span>- </span><span>Dữ liệu cung cấp: Thông tin ứng viên bao gồm thông tin cá nhân, sơ yếu lý lịch, đơn ứng tuyển, cover letter của ứng viên</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <div className="flex space-x-3"><span>- </span><span>Nơi nhận: Nhà cung cấp dịch vụ</span>
                                                        </div>
                                                        <ul className="ml-6 font-normal">
                                                            <li className="flex space-x-3"><span>- </span><span>Mục đích cung cấp: thực hiện các dịch vụ liên quan đến hoạt động cải thiện trang web, cũng như các dịch vụ, sản phẩm, tính năng để bảo vệ người dùng và tối ưu hóa các dịch vụ và trải nghiệm người dùng.</span>
                                                            </li>
                                                            <li className="flex space-x-3"><span>- </span><span>Chúng tôi cũng có thể chia sẻ thông tin của bạn với các công ty liên kết, các nhà cung cấp hoặc các bên cung cấp dịch vụ khác để thực hiện các chức năng thay mặt cho chúng tôi như: dịch vụ phân tích (ví dụ: Google, Saramin hoặc các công ty liên kết của nó, v.v.), dịch vụ tiếp thị và quảng cáo (ví dụ: Meta Platforms, Google, VNG Corporation, CocCoc, Propeller Ads hoặc các công ty liên kết của nó, v.v.), dịch vụ cổng đăng nhập/đăng ký (ví dụ: Google, Github, Apple ID), công cụ AI (ví dụ: Open AI hoặc các công ty liên kết của nó, v.v.), dịch vụ email (ví dụ: Google, Sendgrid, Netpion hoặc các công ty liên kết của nó, v.v.), dịch vụ viễn thông (Viettel, Mobifone, Vinaphone). Những cá nhân và tổ chức này sẽ xử lý dữ liệu cá nhân được chia sẻ bởi chúng tôi. Trường hợp nhà cung cấp ở nước ngoài, việc xử lý dữ liệu sẽ diễn ra bên ngoài lãnh thổ Việt Nam. Khi một bên thứ ba thay mặt cho chúng tôi thực hiện hành động xử lý dữ liệu, chúng tôi sẽ sử dụng các nỗ lực thương mại hợp lý để yêu cầu bên thứ ba tuân theo các quy định trong Chính sách bảo mật này hoặc có các biện pháp bảo mật bổ sung để bảo vệ thông tin của bạn.</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">Địa chỉ của đơn vị thu thập và
                                    quản lý thông tin cá nhân</h2>
                                    <div className="mt-3 text-base font-normal"><p>Đối với ứng viên và nhà tuyển dụng:
                                        HIJOB là đơn vị kiểm soát dữ liệu mà bạn cung cấp trong quá trình sử dụng trang
                                        web, ứng dụng và dịch vụ của HIJOB</p>
                                        <ul className="ml-6 list-none">
                                            <li>Thông tin đơn vị:</li>
                                            <li>Công Ty Cổ Phần Applancer</li>
                                            <li>Địa chỉ: Tầng 12A, Tòa nhà AP Tower, 518B Điện Biên Phủ, Phường 21, Quận
                                                Bình Thạnh, Thành phố Hồ Chí Minh
                                            </li>
                                            <li>Điện thoại: 028 62733496</li>
                                            <li>Email: <a className="text-blue-600 underline"
                                                          href="mailto:privacy@HIJOB.vn">privacy@HIJOB.vn</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">Phương tiện và công cụ để người
                                    dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</h2>
                                    <div className="mt-3 text-base font-normal"><p className="mt-3">Là ứng viên, người
                                        dùng có thể thực hiện các quyền sau đây bất kỳ lúc nào:</p>
                                        <ul className="ml-6 mt-3">
                                            <li className="mb-3">a. Quyền truy cập: Bạn có quyền biết về các hoạt động
                                                thông tin của chúng tôi. bạn cũng có quyền truy cập các danh mục dữ liệu
                                                chúng tôi thu thập, và được biết chúng tôi chia sẻ dữ liệu thu thập từ
                                                bạn với ai
                                            </li>
                                            <li className="mb-3">b. Quyền chỉnh sửa: Bạn có thể chỉnh sửa một số dữ liệu cá
                                                nhân của mình thông qua tài khoản của mình. Bạn cũng có thể yêu cầu
                                                chúng tôi thay đổi, cập nhật hoặc sửa dữ liệu của bạn trong một số
                                                trường hợp nhất định bằng cách gửi email đến <a
                                                    className="text-blue-600 underline"
                                                    href="mailto:privacy@HIJOB.vn">privacy@HIJOB.vn</a></li>
                                            <li className="mb-3">c. Quyền xóa: Bạn có quyền yêu cầu chúng tôi xóa Dữ liệu
                                                Cá nhân của bạn bằng việc yêu cầu chúng tôi xóa Dữ liệu Cá nhân của bạn
                                                bằng cách gửi email đến <a className="text-blue-600 underline"
                                                                           href="mailto:privacy@HIJOB.vn">privacy@HIJOB.vn</a> từ
                                                địa chỉ email được liên kết với tài khoản của bạn và thực hiện theo
                                                “Hướng dẫn quản lý hồ sơ”<p className="mt-3">Quy trình xử lý và phương
                                                    pháp xóa dữ liệu</p>
                                                <ul className="ml-6">
                                                    <li className="flex space-x-3"><span>- </span><span>Chúng tôi sẽ thực hiện xác nhận yêu cầu của bạn là hợp lệ: đầy đủ các bước và thông tin theo yêu cầu</span>
                                                    </li>
                                                    <li className="flex space-x-3"><span>- </span><span>Dữ liệu cá nhân của bạn sẽ ngừng hiển thị cho các bên thứ ba của chúng tôi và thông tin sẽ bị xóa hoàn toàn trong vòng trong vòng 72 giờ kể từ khi có yêu cầu</span>
                                                    </li>
                                                    <li className="flex space-x-3"><span>- </span><span>Dữ liệu cá nhân sẽ bị xóa hoàn toàn và không thể khôi phục. Một danh sách người dùng đã yêu cầu xóa dữ liệu sẽ được thiết lập, danh sách này nhằm ngăn chặn việc dữ liệu cá nhân bị khôi phục từ các bản backup server.</span>
                                                    </li>
                                                    <li className="flex space-x-3"><span>- </span><span>Một số thông tin của bạn có thể được bên thứ ba lưu giữ trước khi bạn thực hiện yêu cầu do việc bạn đồng ý chia sẻ dữ liệu cá nhân trước đó. Lưu ý rằng, HIJOB sẽ thông báo đến nhà tuyển dụng yêu cầu xóa dữ liệu khi có yêu cầu, tuy nhiên, ngay cả trong trường hợp xóa tài khoản thành công trong hệ thống của HIJOB, nhà tuyển dụng hay bên thứ ba đã truy cập thông tin cá nhân của bạn, chúng tôi không thể kiểm soát việc lưu giữ, sử dụng thông tin từ các bên này.</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mb-3">
                                                <ul>
                                                    <li className="mb-3">d. Quyền rút lại sự đồng ý: Khi chúng tôi dựa vào
                                                        sự đồng ý của bạn để xử lý Dữ liệu Cá nhân của bạn, bạn có quyền
                                                        rút lại sự đồng ý của mình bất cứ lúc nào.
                                                    </li>
                                                    <li className="mb-3">Bạn có thể tham khảo cách rút lại quyền đồng ý
                                                        trong trang “Quản lý hồ sơ” của bạn
                                                    </li>
                                                    <li className="mb-3">Đối với trường hợp, rút lại việc ứng tuyển,
                                                        HIJOB sẽ thông báo đến nhà tuyển dụng mà bạn đã ứng tuyển và
                                                        yêu cầu nhà tuyển dụng ngừng việc tiếp cận đến ứng viên. Thông
                                                        tin ứng tuyển của bạn vẫn sẽ được lưu trữ cho mục đích ghi nhận
                                                        lịch sử giao dịch giữa ứng viên và nhà tuyển dụng.
                                                    </li>
                                                    <li className="mb-3">Ngoài ra, Bạn cũng có thể liên hệ với <a
                                                        className="text-blue-600 underline"
                                                        href="mailto:privacy@HIJOB.vn">privacy@HIJOB.vn</a> để thông
                                                        báo cho chúng tôi rằng bạn đang rút lại sự đồng ý của mình.
                                                    </li>
                                                    <li className="mb-3">Xin lưu ý rằng bất kỳ quá trình xử lý nào mà
                                                        chúng tôi đã thực hiện trước khi bạn rút lại sự đồng ý của bạn
                                                        vẫn hợp pháp. Việc rút lại sự đồng ý không ảnh hưởng đến tính
                                                        hợp pháp của việc xử lý dữ liệu đã được đồng ý trước khi rút lại
                                                        sự đồng ý. (Khoản 1, Điều 12, Nghị định 13 Bảo vệ dữ liệu cá
                                                        nhân)
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mb-3">
                                                <ul>
                                                    <li className="mb-3">e. Quyền từ chối: Nếu bạn muốn từ chối nhận một
                                                        email tiếp thị cụ thể, bạn có thể nhấp vào “Click vào đây để từ
                                                        chối nhận email từ HIJOB” dưới mỗi email tiếp thị để hủy đăng
                                                        ký nhận thông tin từ HIJOB
                                                    </li>
                                                    <li className="mb-3">Ngoài ra, bạn có thể từ chối tất cả các thông
                                                        báo tiếp thị bằng cách gửi email đến <a
                                                            className="text-blue-600 underline"
                                                            href="mailto:privacy@HIJOB.vn">privacy@HIJOB.vn</a>. Chúng
                                                        tôi sẽ tuân thủ yêu cầu của bạn ngay khi có thể thực hiện được
                                                        và tuân thủ với luật hiện hành.
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p className="mt-3">Là nhà tuyển dụng, người dùng có thể thực hiện các quyền sau
                                            đây bất kỳ lúc nào:</p>
                                        <ul className="ml-6 mt-3">
                                            <li className="mb-3">a. Quyền được xem thông tin ứng viên: Nhà tuyển dụng được
                                                xem thông tin ứng viên khi có người dùng ứng tuyển vào vị trí đăng tuyển
                                                của nhà tuyển dụng
                                            </li>
                                            <li className="mb-3">b. Quyền gửi khiếu nại về việc lộ thông tin cá nhân cho
                                                bên thứ ba: Nhà tuyển dụng gửi khiếu nại đến Ban quản trị của <a
                                                    className="text-blue-600 underline"
                                                    href="https://hijob.vn">hijob.vn</a>. Khi tiếp nhận những phản hồi
                                                này, <a className="text-blue-600 underline"
                                                        href="https://hijob.vn">hijob.vn</a> sẽ xác nhận lại thông
                                                tin, phải có trách nhiệm trả lời lý do và hướng dẫn thành viên khôi phục
                                                và bảo mật lại thông tin.
                                            </li>
                                            <li className="mb-3">c. Xử lý khi có yêu cầu rút đơn ứng tuyển, xóa CV hoặc xóa
                                                tài khoản từ phía ứng viên. Để đảm bảo tuân thủ pháp luật về bảo vệ dữ
                                                liệu người dùng, nhà tuyển dụng vui lòng thực hiện đầy đủ các quy trình
                                                sau:
                                                <ul className="ml-6 mt-3">
                                                    <li className="flex space-x-3"><span>- </span><span>Rút đơn ứng tuyển: HIJOB sẽ thông báo qua email của nhà tuyển dụng về việc ứng viên rút đơn ứng tuyển. Yêu cầu phía nhà tuyển dụng ngừng việc tiếp cận ứng viên bằng bất cứ phương tiện nào</span>
                                                    </li>
                                                    <li className="flex space-x-3"><span>- </span><span>Xóa CV: HIJOB sẽ thông báo qua email của nhà tuyển dụng về việc ứng viên xóa CV. Khi ứng viên xóa CV đồng nghĩa với việc rút đơn ứng tuyển đã sử dụng cùng CV đó. Tất cả dữ liệu cá nhân của ứng viên sẽ bị xóa trên trang quản lý ứng viên. Yêu cầu nhà tuyển dụng thực hiện xóa toàn bộ thông tin cá nhân của ứng viên và ngừng việc tiếp cận ứng viên bằng bất cứ phương tiện nào. Nếu không tuân thủ và để xảy ra khiếu nại từ phía ứng viên, HIJOB hoàn toàn không chịu trách nhiệm.</span>
                                                    </li>
                                                    <li className="flex space-x-3"><span>- </span><span>Xóa tài khoản: HIJOB sẽ thông báo qua email của nhà tuyển dụng về việc ứng viên xóa tài khoản. Khi ứng viên xóa tài khoản đồng nghĩa với việc rút tất cả đơn ứng tuyển của ứng viên đó. Tất cả dữ liệu cá nhân của ứng viên sẽ bị xóa trên trang quản lý ứng viên. Yêu cầu nhà tuyển dụng thực hiện xóa toàn bộ thông tin cá nhân của ứng viên và ngừng việc tiếp cận ứng viên bằng bất cứ phương tiện nào. Nếu không tuân thủ và để xảy ra khiếu nại từ phía ứng viên, HIJOB hoàn toàn không chịu trách nhiệm.</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">Cam kết bảo mật thông tin cá nhân
                                    khách hàng</h2>
                                    <div className="mt-3 text-base font-normal">
                                        <ul>
                                            <li className="mt-3">Thông tin Ứng viên/ nhà tuyển dụng trên <a
                                                className="text-blue-600 underline"
                                                href="https://hijob.vn">hijob.vn</a> được <a
                                                className="text-blue-600 underline"
                                                href="https://hijob.vn">hijob.vn</a> cam kết bảo mật tuyệt đối theo
                                                chính sách bảo vệ thông tin cá nhân của <a
                                                    className="text-blue-600 underline"
                                                    href="https://hijob.vn">hijob.vn</a>. Việc thu thập và sử dụng
                                                thông tin của Ứng viên/ nhà tuyển dụng chỉ được thực hiện khi có sự đồng
                                                ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
                                            </li>
                                            <li className="mt-3">hijob.vn sử dụng phần mềm Secure Sockets Layer (SSL)
                                                để bảo vệ thông tin của Ứng viên/ nhà tuyển dụng trong quá trình chuyển
                                                dữ liệu bằng cách mã hóa thông tin bạn nhập vào.
                                            </li>
                                            <li className="mt-3">Ứng viên/ nhà tuyển dụng có trách nhiệm tự bảo vệ mình
                                                trước sự tiếp cận thông tin về password khi dùng chung máy tính với
                                                nhiều người. Khi đó, Ứng viên/ nhà tuyển dụng phải chắc chắn đã thoát
                                                khỏi tài khoản sau khi sử dụng dịch vụ của <a
                                                    className="text-blue-600 underline"
                                                    href="https://hijob.vn">hijob.vn</a>.
                                            </li>
                                            <li className="mt-3">hijob.vn cam kết không cố ý tiết lộ hoặc chia sẻ thông
                                                tin ứng viên/ nhà tuyển dụng, khi không có sự đồng ý từ ứng viên/nhà
                                                tuyển dụng.
                                            </li>
                                            <li className="mt-3">Chính sách bảo mật thông tin khách hàng của <a
                                                className="text-blue-600 underline"
                                                href="https://hijob.vn">hijob.vn</a> chỉ được áp dụng tại <a
                                                className="text-blue-600 underline"
                                                href="https://hijob.vn">hijob.vn</a>. Nó không bao gồm hoặc liên quan
                                                đến các bên thứ ba khác đặt quảng cáo hoặc có liên kết tại <a
                                                    className="text-blue-600 underline"
                                                    href="https://hijob.vn">hijob.vn</a>. Ứng viên/ nhà tuyển dụng nên
                                                tham khảo và phân biệt rõ sự khác biệt trong chính sách bảo mật thông
                                                tin khách hàng của những website này
                                            </li>
                                            <li className="mt-3">Trong trường hợp máy chủ lưu trữ thông tin bị hacker
                                                tấn công dẫn đến mất mát dữ liệu Ứng viên/ nhà tuyển dụng , <a
                                                    className="text-blue-600 underline"
                                                    href="https://hijob.vn">hijob.vn</a> sẽ có trách nhiệm thông báo
                                                vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho
                                                Ứng viên/ nhà tuyển dụng được biết.
                                            </li>
                                            <li className="mt-3">Ban quản lý <a className="text-blue-600 underline"
                                                                                href="https://hijob.vn">hijob.vn</a> yêu
                                                cầu các cá nhân khi đăng ký là thành viên, phải cung cấp đầy đủ thông
                                                tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email và chịu
                                                trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý <a
                                                    className="text-blue-600 underline"
                                                    href="https://hijob.vn">hijob.vn</a> không chịu trách nhiệm cũng
                                                như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Ứng
                                                viên/ nhà tuyển dụng đó nếu xét thấy tất cả thông tin Ứng viên/ nhà
                                                tuyển dụng cung cấp khi đăng ký ban đầu là không chính xác.
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">Cập nhật Chính sách bảo mật của
                                    chúng tôi</h2>
                                    <div className="mt-3 text-base font-normal"><p>Chúng tôi có thể điều chỉnh Chính
                                        sách này theo thời gian bằng cách phát hành phiên bản cập nhật. Trong trường hợp
                                        chúng tôi thực hiện các thay đổi mà chúng tôi tin rằng sẽ có tác động đáng kể
                                        đến quyền của bạn, chúng tôi sẽ thông báo cho bạn thông qua email đăng ký tài
                                        khoản HIJOB và thông qua thông báo được hiển thị trên trang web của chúng tôi
                                        trước khi áp dụng các thay đổi. Chúng tôi cũng có thể cung cấp thông báo về các
                                        thay đổi trong các trường hợp khác. Chúng tôi khuyến khích bạn kiểm tra thường
                                        xuyên trang này để cập nhật thông tin mới nhất về các biện pháp bảo mật của
                                        chúng tôi. Việc bạn tiếp tục sử dụng dịch vụ của chúng tôi sẽ được coi là đồng ý
                                        tuân thủ Chính sách mới nhất. Nếu bạn không đồng ý với Chính sách sau khi nó có
                                        hiệu lực đối với bạn, bạn sẽ không thể tiếp tục sử dụng dịch vụ của chúng
                                        tôi.</p></div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">Cơ chế tiếp nhận và giải quyết
                                    khiếu nại liên quan đến việc thông tin cá nhân</h2>
                                    <div className="mt-3 text-base font-normal">
                                        <ul>
                                            <li className="mt-3">Khi khách hàng gửi thông tin cá nhân của khách hàng cho
                                                chúng tôi, khách hàng đã đồng ý với các điều khoản mà chúng tôi đã nêu ở
                                                trên, <a className="text-blue-600 underline"
                                                         href="https://hijob.vn">hijob.vn</a> cam kết bảo mật thông
                                                tin cá nhân của các khách hàng bằng mọi cách thức có thể. Chúng tôi sử
                                                dụng các hệ thống mã hóa nhằm bảo vệ thông tin này không bị truy lục, sử
                                                dụng hoặc tiết lộ ngoài ý muốn.
                                            </li>
                                            <li className="mt-3">hijob.vn cũng khuyến cáo các khách hàng nên bảo mật
                                                các thông tin liên quan đến mật khẩu truy xuất của các khách hàng và
                                                không nên chia sẻ với bất kỳ người nào khác.
                                            </li>
                                            <li className="mt-3">Trong trường hợp có phản ánh của khách hàng về việc sử
                                                dụng thông tin trái với mục đích đã nêu, <a
                                                    className="text-blue-600 underline"
                                                    href="https://hijob.vn">hijob.vn</a> sẽ tiến hành giải quyết theo
                                                các bước sau:
                                            </li>
                                        </ul>
                                        <ul className="ml-6">
                                            <li><span className="font-bold">Bước 1: </span>Khách hàng gửi thông tin phản
                                                hồi về việc thông tin cá nhân thu thập trái với mục đích đã nêu.
                                            </li>
                                            <li><span className="font-bold">Bước 2: </span>Bộ phận Chăm sóc Khách hàng
                                                của <a className="text-blue-600 underline"
                                                       href="https://hijob.vn">hijob.vn</a> tiếp nhận và giải quyết
                                                với các bên có liên quan.
                                            </li>
                                            <li><span className="font-bold">Bước 3: </span>Trong trường hợp vượt ra khỏi
                                                tầm kiểm soát của hijob.vn, chúng tôi sẽ đưa ra các cơ quan có thẩm
                                                quyền để yêu cầu giải quyết
                                            </li>
                                        </ul>
                                        <p>Chúng tôi luôn hoan nghênh các ý kiến đóng góp, liên hệ và phản hồi thông tin
                                            từ khách hàng về “Chính sách bảo mật” này. Nếu khách hàng có những thắc mắc
                                            liên quan xin vui lòng liên hệ theo địa chỉ Email: <a
                                                className="text-blue-600 underline"
                                                href="mailto:privacy@hijob.vn">privacy@hijob.vn</a></p></div>
                                </li>
                                <li className="text-xl font-bold"><h2 className="mt-3">Cách chúng tôi sử dụng
                                    cookies</h2>
                                    <div className="mt-3 text-base font-normal"><p>Chúng tôi sử dụng cookies để cung cấp
                                        và cải thiện dịch vụ của chúng tôi. Chính sách này giải thích cách chúng tôi sử
                                        dụng cookies trên trang web của mình.</p>
                                        <ul className="ml-6">
                                            <li className="mt-3">a. Cookies là gì?<p>Cookies là các tệp tin nhỏ chứa thông
                                                tin được lưu trữ trên trình duyệt của bạn khi bạn truy cập vào trang
                                                web. Chúng giúp cung cấp cho bạn trải nghiệm tốt hơn trên trang web của
                                                chúng tôi.</p></li>
                                            <li className="mt-3">b. Các loại cookies chúng tôi sử dụng
                                                <ul className="ml-6">
                                                    <li className="flex space-x-3"><span>- </span><span>Cookies cần thiết: Đây là các cookies cần thiết để chúng tôi cung cấp cho bạn các dịch vụ yêu cầu, bao gồm việc truy cập vào tài khoản và quản lý phiên làm việc của bạn trên trang web.</span>
                                                    </li>
                                                    <li className="flex space-x-3"><span>- </span><span>Cookies phân tích: Chúng tôi sử dụng các cookies phân tích để hiểu cách bạn sử dụng trang web của chúng tôi, từ đó cải thiện trải nghiệm của bạn. Chúng tôi thu thập thông tin như trang web bạn đã truy cập, thời gian bạn đã dành trên trang web và các liên kết bạn đã nhấp chuột. Thông tin này giúp chúng tôi tối ưu hóa trang web và cung cấp cho bạn nội dung phù hợp hơn.</span>
                                                    </li>
                                                    <li className="flex space-x-3"><span>- </span><span>Cookies bên thứ ba: Trang web của chúng tôi có thể sử dụng các dịch vụ của bên thứ ba, như các công cụ phân tích từ Google Analytics. Các bên thứ ba này có thể đặt cookies trên trình duyệt của bạn khi bạn truy cập vào trang web của chúng tôi.</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mt-3">c. Quản lý cookies<p>Bạn có thể tùy chỉnh cài đặt cookie
                                                trên trình duyệt của mình. Bạn có thể chặn hoặc xóa cookies bất kỳ lúc
                                                nào. Tuy nhiên, việc làm này có thể ảnh hưởng đến trải nghiệm của bạn
                                                trên trang web và bạn có thể mất quyền truy cập vào một số tính
                                                năng.</p></li>
                                            <li className="mt-3">d. Sự đồng ý<p>Khi bạn tiếp tục sử dụng trang web của
                                                chúng tôi, bạn đồng ý chúng tôi sử dụng cookies theo chính sách này.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
