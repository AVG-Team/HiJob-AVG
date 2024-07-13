import Lottie from "lottie-react";
import Form from "./components/Form";
import RecruitmentIcon from "../../assets/img/recruitment.json";

export default function RegisterCompany() {
    return (
        <main className="flex items-center justify-center mt-5">
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-center col-span-1">
                    <div className="container">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-bold text-center text-primary">Đăng ký</h1>
                            <Lottie className="w-[80%]" alt="recruitment" animationData={RecruitmentIcon} />
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="flex items-center justify-center">
                        <Form />
                    </div>
                </div>
            </div>
        </main>
    );
}
