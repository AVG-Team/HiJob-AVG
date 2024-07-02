import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Contact() {
    return (
        <div className="flex items-center justify-center w-full mt-5">
            <div className="w-full max-w-4xl p-6 text-gray-600 bg-white rounded shadow-lg lg:rounded-lg">
                <h1 className="mb-2 text-xl font-bold">Thông tin liên hệ</h1>
                <hr className="my-4"/>
                <div className="flex mb-6 space-x-4">
                    <div>
                        <p className="font-semibold">Website</p>
                        <a href="https://career.fpt-software.com/" className="text-blue-500 hover:underline">
                            https://career.fpt-software.com/
                        </a>
                    </div>
                </div>
                <div className="flex mb-6 space-x-4">
                    <div>
                        <p className="font-semibold">Địa chỉ công ty</p>
                        <div>
                            <LocationOnIcon className="mx-2 mb-auto" fontSize="medium"/> FPT Building Cầu Giấy, 17 phố Duy Tân, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội
                        </div>
                        <div>
                            <LocationOnIcon className="mx-2 mb-auto" fontSize="medium"/>Tòa nhà FTown - Lô T2, đường D1, khu CNC, Phường Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
