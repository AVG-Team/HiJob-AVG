import PropTypes from "prop-types";
import LocationOnIcon from "@mui/icons-material/LocationOn";

Contact.propTypes = {
    company: PropTypes.object,
};
export default function Contact({ company }) {
    return (
        <div className="flex items-center justify-center w-full mt-5">
            <div className="w-full max-w-4xl p-6 text-gray-600 bg-white rounded shadow-lg lg:rounded-lg">
                <h1 className="mb-2 text-xl font-bold">Thông tin liên hệ</h1>
                <hr className="my-4"/>
                <div className="flex mb-6 space-x-4">
                    <div>
                        <p className="font-semibold">Website</p>
                        <a href="https://career.fpt-software.com/" className="text-blue-500 hover:underline">
                            {company.name}.com
                        </a>
                    </div>
                </div>
                <div className="flex mb-6 space-x-4">
                    <div>
                        <p className="font-semibold">Địa chỉ công ty</p>
                        <div>
                            <LocationOnIcon className="mx-2 mb-auto" fontSize="medium" /> {company.address}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
