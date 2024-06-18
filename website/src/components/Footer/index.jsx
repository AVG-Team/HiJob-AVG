import Logo from "../../assets/img/HIJOB.png";
export default function Footer() {
    return (
        <footer className="w-full px-4 mx-auto mt-5 max-w-container sm:px-6 lg:px-8">
            <div className="py-10 border-t-2 border-gray-200">
                <img src={Logo} alt="logo-ct" className="w-40 mx-auto text-slate-900" />
                <p className="mt-5 text-sm leading-6 text-center text-slate-500">
                    &copy; AVG TEAM with <span className="text-red-500">&#10084;</span>. All rights reserved.
                </p>
                <div className="flex items-center justify-center mt-10 space-x-4 text-sm font-semibold leading-6 text-slate-700">
                    <a href="#s"> Chính sách bảo mật </a>
                    <div className="w-px h-4 bg-slate-500/20"></div>
                    <a href="#s">Liên hệ chúng tôi</a>
                </div>
            </div>
        </footer>
    );
}
