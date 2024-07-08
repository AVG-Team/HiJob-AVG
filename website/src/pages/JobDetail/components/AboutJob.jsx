import PropTypes from "prop-types";

export default function AboutJob({ job, skill, level, type, contractType }) {
    AboutJob.propTypes = {
        job: PropTypes.object.isRequired,
        skill: PropTypes.array.isRequired,
        level: PropTypes.array.isRequired,
        type: PropTypes.array.isRequired,
        contractType: PropTypes.array.isRequired,
    };
    return (
        <div className="flex items-center justify-center w-full mt-5">
            <div className="w-full p-6 overflow-hidden bg-white rounded shadow-lg lg:rounded-lg">
                <div className="ml-4 leading-8">
                    <div className="w-full border-b">
                        <h2 className="pb-2 text-xl font-bold text-gray-600 ">Thông tin chung</h2>
                    </div>
                    <div>
                        <p className="mt-2 mb-1 font-bold text-gray-500">Năm kinh nghiệm tối thiểu</p>
                        <p className="ml-1 text-md">{job.requireOfYear}</p>
                    </div>
                    <div>
                        <p className="mt-2 mb-1 font-bold text-gray-500">Cấp bậc</p>
                        {level.map((item) => (
                            <p key={item.id} className="ml-1 text-md">
                                {item.name}
                            </p>
                        ))}
                    </div>
                    <div>
                        <p className="mt-2 mb-1 font-bold text-gray-500">Loại hình</p>
                        {type.map((item) => (
                            <p key={item.id} className="ml-1 text-md">
                                {item.name}
                            </p>
                        ))}
                    </div>
                    <div>
                        <p className="mt-2 mb-1 font-bold text-gray-500">Loại hợp đồng</p>
                        {contractType.map((item) => (
                            <p key={item.id} className="ml-1 text-md">
                                {item.name}
                            </p>
                        ))}
                    </div>
                    <div>
                        <p className="mt-2 mb-1 font-bold text-gray-500">Các công nghệ sử dụng</p>
                        {skill.map((item) => (
                            <span
                                key={item.id}
                                className="px-2 py-1 mt-1 ml-2 text-sm text-white rounded-md bg-primary hover:bg-primary-600 hover:shadow-lg"
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                    <div>
                        <p className="mt-2 mb-1 font-bold text-gray-500">Quy trình phỏng vấn</p>
                        <ul className="list-disc list-inside">
                            <li className="mb-2 ml-5">Phỏng vấn cơ bản</li>
                            <li className="mb-2 ml-5">Phỏng vấn kỹ thuật</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
