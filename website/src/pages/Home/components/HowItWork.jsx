import Lottie from "lottie-react";
import Assignment from "../../../assets/img/assignment.json";
import Apply from "../../../assets/img/apply.json";
import Upload from "../../../assets/img/upload.json";
export default function HowItWork() {
    return (
        <div data-aos="fade-up" className="container px-5 py-20 mx-auto mt-8">
            <div className="grid grid-flow-row">
                <div className="items-center justify-center flex-1 p-4 mb-2 text-center">
                    <p className="mb-2 font-bold text-center text-md text-primary">Quá trình làm việc</p>
                    <p className="text-3xl font-extrabold text-center">Cách Hoạt Động</p>
                </div>
                <div className="flex items-center justify-center px-2 md:px-10">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="max-w-sm p-6 overflow-hidden text-white bg-blue-400 shadow-lg rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="p-2 bg-white rounded-full">
                                        <Lottie animationData={Assignment} className="w-20" />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-xl font-bold">Đăng ký</h2>
                                        <p className="mt-2 text-sm">
                                            Bạn cần tạo tài khoản để tìm được công việc tốt nhất và ưa thích.
                                        </p>
                                    </div>
                                </div>
                                <div className="ml-3 text-6xl font-semibold text-whit opacity-80">01</div>
                            </div>
                        </div>
                        <div className="max-w-sm p-6 overflow-hidden text-white bg-purple-400 shadow-lg rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="p-2 bg-white rounded-full">
                                        <div className="flex justify-center w-20 h-20">
                                            <Lottie animationData={Apply} className="w-20" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-xl font-bold">Ứng tuyển</h2>
                                        <p className="mt-2 text-sm">
                                            Bạn cần tạo tài khoản để tìm được công việc tốt nhất và ưa thích.
                                        </p>
                                    </div>
                                </div>
                                <div className="ml-3 text-6xl font-semibold text-whit opacity-80">02</div>
                            </div>
                        </div>
                        <div className="max-w-sm p-6 overflow-hidden text-white bg-green-400 shadow-lg rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="p-2 bg-white rounded-full">
                                        <Lottie animationData={Upload} className="w-20" />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-xl font-bold">Cập nhật CV</h2>
                                        <p className="mt-2 text-sm">
                                            Bạn cần tạo tài khoản để tìm được công việc tốt nhất và ưa thích.
                                        </p>
                                    </div>
                                </div>
                                <div className="ml-3 text-6xl font-semibold text-whit opacity-80">03</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
