export default function Banner() {
    return (
        <div className="px-4 pt-12 pb-20 bg-orange-50">
            <div className="container px-4 mx-auto sm:px-6 lg:px-24">
                <h2 className="text-2xl font-bold">
                    Tìm kiếm <span className="p-2 text-white bg-primary">Tester</span>
                </h2>
                <div className="flex flex-col mt-4 sm:flex-row">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo các Kỹ năng, Vị trí, Công ty,..."
                        className="w-full lg:w-[90%] p-4 border border-primary focus:border-primary-500  lg:rounded-l-md  focus:outline-none focus:shadow-lg"
                    />
                    <button className="p-2 text-white lg:p-4 bg-primary rounded-b-md sm:rounded-r-md sm:rounded-b-none hover:bg-primary-600 hover:shadow-lg">
                        Tìm kiếm
                    </button>
                </div>
                <div className="flex flex-wrap items-center justify-start mt-4 space-x-2">
                    <p className="text-sm">Từ khoá đề xuất :</p>
                    {["Java", "C++", "JavaScript", "UI/UX", "C#"].map((keyword) => (
                        <button
                            key={keyword}
                            className="px-3 py-1 m-1 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 hover:shadow-md "
                        >
                            {keyword}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
