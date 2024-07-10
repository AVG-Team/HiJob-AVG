import React, {useEffect, useState} from 'react';
import ChartOne from "./Component/Charts/ChartOne.jsx";
import ChartTwo from "./Component/Charts/ChartTwo.jsx";
import ChartThree from "./Component/Charts/ChartThree.jsx";
import CardDataStats from "./Component/cardDataStats.jsx";
import { WorkOutlineOutlined, ApartmentOutlined, PeopleAltOutlined, ManageAccountsOutlined } from '@mui/icons-material';
import BasicTable from "./Component/table.jsx";
import {
    getTop5CompaniesFollow,
    getCardDataStats,
    getUserCountsByRoleAndType, getSkillPercent, getLevelPercent
} from "../../../services/apis/admin/dashboard.js";
import {toast} from "react-toastify";

export default function Dashboard(props) {
    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
        getDataCompany().then()
        getDataCard().then();
        getUserCounts().then();
        getSkillPer().then();
        getLevelPer().then();
    }, [title]);

    const [dataCompany, setDataCompany] = useState([]);
    const [dataCard, setDataCard] = useState([]);
    const [userCounts, setUserCounts] = useState([]);
    const [typeParams, setTypeParams] = useState("");
    const [skills, setSkills] = useState();
    const [levels, setLevels] = useState();

    const getDataCompany = async () => {
        try {
            const response = await getTop5CompaniesFollow();
            setDataCompany(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const getDataCard = async () => {
        try {
            const response = await getCardDataStats();
            setDataCard(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const getUserCounts = async () => {
        try {
            const response = await getUserCountsByRoleAndType();
            setUserCounts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const getSkillPer = async () => {
        try {
            const response = await getSkillPercent();
            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const getLevelPer = async () => {
        try {
            const response = await getLevelPercent();
            setLevels(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Tổng Số Công Việc" total={dataCard.totalJob}>
                    <WorkOutlineOutlined className="text-primary"/>
                </CardDataStats>
                <CardDataStats title="Tổng Số Công Ty" total={dataCard.totalCompany}>
                    <ApartmentOutlined className="text-primary"/>
                </CardDataStats>
                <CardDataStats title="Tổng Số Người Tuyển Dụng" total={dataCard.totalEmployee}>
                    <ManageAccountsOutlined className="text-primary"/>
                </CardDataStats>
                <CardDataStats title="Tổng Số Người Dùng" total={dataCard.totalUser}>
                    <PeopleAltOutlined className="text-primary"/>
                </CardDataStats>
            </div>
            <span className="bg-[#224F5A] opacity-0">
            </span>
            <div className="mt-4 ">
                {userCounts && (
                    <ChartOne data={userCounts} max={dataCard.totalUser} typeParams={typeParams} setTypeParams={setTypeParams}/>
                )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                {skills && (<ChartThree data={skills} title="Kĩ Năng Nhiều Người Tuyển Nhất"/>)}
                {levels && (<ChartThree data={levels} title="Trình Độ Nhiều Người Tuyển Nhất"/>)}
                {/*<ChartThree/>*/}
            </div>
            <div className="mt-4 md:mt-6 2xl:mt-7.5">
                {dataCompany !== undefined && dataCompany.length > 0 && (<BasicTable data={dataCompany}/>) }
            </div>
        </>
    );
}
