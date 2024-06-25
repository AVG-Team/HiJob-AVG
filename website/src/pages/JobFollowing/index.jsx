import { useState, useEffect } from "react";
import TabForm from "../../components/TabForm";
import JobFollowCard from "./components/JobFollowCard";
import Pagination from "@mui/material/Pagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const jobItems = [
    {
        id: 1,
        title: "Fresher/Junior - Senior C++ Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        id: 2,
        title: "Fresher/Junior - Senior Java Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        id: 3,
        title: "Fresher/Junior - Senior Reactjs Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        id: 4,
        title: "Fresher/Junior - Senior Software Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        id: 5,
        title: "Fresher/Junior - Senior Software Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        id: 6,
        title: "Fresher/Junior - Senior Software Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
];

export default function JobFollowing() {
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        if (isLg) {
            setItemsPerPage(6);
        } else {
            setItemsPerPage(3); // Default value for other screen sizes
        }
    }, [isLg]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const displayedItems = jobItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container px-4 py-5 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <TabForm id={5} />
                        <div className="mt-2">
                            <div className="flex justify-start py-4 text-primary">
                                <h1 className="text-lg font-bold text-start">Việc Đã Theo Dõi</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                {displayedItems.map((item) => (
                                    <JobFollowCard key={item.id} job={item} />
                                ))}
                            </div>
                            <Pagination
                                count={Math.ceil(jobItems.length / itemsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                variant="outlined"
                                shape="rounded"
                                sx={{ marginTop: 5, display: "flex", justifyContent: "end" }}
                            />
                        </div>
                        <div className="mt-14">
                            <div className="flex justify-start py-4 mb-5 text-primary">
                                <h1 className="text-lg font-bold text-start">Việc Đã Xem</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                {displayedItems.map((item) => (
                                    <JobFollowCard key={item.id} job={item} />
                                ))}
                            </div>
                            <Pagination
                                count={Math.ceil(jobItems.length / itemsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                variant="outlined"
                                shape="rounded"
                                sx={{ marginTop: 5, display: "flex", justifyContent: "end" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
