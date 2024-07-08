import React from 'react';
import ChartOne from "./Component/Charts/ChartOne.jsx";
import ChartTwo from "./Component/Charts/ChartTwo.jsx";
import ChartThree from "./Component/Charts/ChartThree.jsx";
import CardDataStats from "./Component/cardDataStats.jsx";
import { WorkOutlineOutlined, ApartmentOutlined, PeopleAltOutlined, ManageAccountsOutlined } from '@mui/icons-material';
import BasicTable from "./Component/table.jsx";

export default function Dashboard() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Tổng số công việc" total="$3.456K" rate="0.43%" levelUp>
                    <WorkOutlineOutlined className="text-primary"/>
                </CardDataStats>
                <CardDataStats title="Tổng Số Công Ty" total="$45,2K" rate="4.35%" levelUp>
                    <ApartmentOutlined className="text-primary"/>
                </CardDataStats>
                <CardDataStats title="Tổng Số Người Tuyển Dụng" total="2.450" rate="2.59%" levelUp>
                    <ManageAccountsOutlined className="text-primary"/>
                </CardDataStats>
                <CardDataStats title="Tổng Số Người Dùng" total="3.456" rate="0.95%" levelDown>
                    <PeopleAltOutlined className="text-primary"/>
                </CardDataStats>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne/>
                <ChartTwo/>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartThree/>
                <ChartThree/>
            </div>
            <div className="mt-4 md:mt-6 2xl:mt-7.5">
                <BasicTable/>
            </div>
        </>
    );
}
