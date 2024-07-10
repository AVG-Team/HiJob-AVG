import PropTypes from "prop-types";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";

AboutComp.propTypes = {
    company: PropTypes.object,
};
export default function AboutComp({ company }) {
    return (
        <div className="flex items-center justify-center w-full mt-5">
            <div className="w-full max-w-4xl p-6 text-gray-600 bg-white rounded shadow-lg lg:rounded-lg">
                <h1 className="mb-2 text-xl font-bold">Thông tin chung</h1>
                <hr className="my-4" />
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1 text-center">
                        <BusinessIcon className="mx-auto mb-2" fontSize="large" />
                        <p className="font-semibold text-md">Ngành nghề</p>
                        <p>{company.field}</p>
                    </div>
                    <div className="col-span-1 text-center">
                        <GroupsIcon className="mx-auto mb-2" fontSize="large" />
                        <p className="font-semibold text-md">Quy mô </p>
                        <p>100-499</p>
                    </div>
                    <div className="col-span-1 text-center ">
                        <FlagIcon className="mx-auto mb-2" fontSize="large" />
                        <p className="font-semibold text-md">Quốc tịch công ty</p>
                        <p>{company.province}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
