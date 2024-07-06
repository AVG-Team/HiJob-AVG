import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";
import Tag from './Tag';

export default function AboutComp() {
    const skills = ['Java', 'Python', '.NET', 'Front-End', 'ReactJS', 'Data Engineer', 'Flutter'];

    return (
        <div className="flex items-center justify-center w-full mt-5">
            <div className="w-full max-w-4xl p-6 text-gray-600 bg-white rounded shadow-lg lg:rounded-lg">
                <h1 className="mb-2 text-xl font-bold">Thông tin chung</h1>
                <hr className="my-4"/>
                <div className="flex flex-col items-center justify-between mb-6 space-y-4 sm:flex-row sm:space-y-0">
                    <div className="text-center">
                        <BusinessIcon className="mx-auto mb-2" fontSize="large"/>
                        <p className="font-semibold">Ngành nghề</p>
                        <p>Bảo Hiểm</p>
                    </div>
                    <div className="text-center">
                        <GroupsIcon className="mx-auto mb-2" fontSize="large"/>
                        <p className="font-semibold">Quy mô công ty</p>
                        <p>100-499</p>
                    </div>
                    <div className="text-center">
                        <FlagIcon className="mx-auto mb-2" fontSize="large"/>
                        <p className="font-semibold">Quốc tịch công ty</p>
                        <p>Vietnam</p>
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold">Kỹ năng</h3>
                    <div className="flex flex-wrap">
                        {skills.map((skill, index) => (
                            <Tag key={index} label={skill}/>
                        ))}
                    </div>
                </div>
                <div className="flex mb-6 space-x-4">
                    {/* <img src="/path/to/image1.jpg" alt="Company Image 1" className="w-1/3 rounded-lg" />
                    <img src="/path/to/image2.jpg" alt="Company Image 2" className="w-1/3 rounded-lg" />
                    <img src="/path/to/image3.jpg" alt="Company Image 3" className="w-1/3 rounded-lg" /> */}
                </div>
            </div>
        </div>
    );
}
