import Lottie from "lottie-react";
import RecruitmentIcon from "../../assets/img/recruitment.json";
import Form from "./components/Form";
import { useState, useEffect } from "react";
import skillApi from "../../services/apis/skillApi";
import typeApi from "../../services/apis/typeApi";
import levelApi from "../../services/apis/levelApi";
import contractApi from "../../services/apis/contractApi";
// import Logo from "../../assets/img/HIJOB-Landscape.png";

export default function Recruitment() {
    const [types, setTypes] = useState([]);
    const [levels, setLevels] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const responseSkill = await skillApi.getAllSkills();
                setSkills(responseSkill.data);
            } catch (error) {
                console.log("Failed to fetch skill: ", error);
            }
        };
        fetchSkill();
    }, []);

    useEffect(() => {
        const fetchType = async () => {
            try {
                const responseType = await typeApi.getAllType();
                setTypes(responseType.data);
            } catch (error) {
                console.log("Failed to fetch type: ", error);
            }
        };

        fetchType();
    }, []);

    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const responseLevel = await levelApi.getAllLevel();
                setLevels(responseLevel.data);
            } catch (error) {
                console.log("Failed to fetch level: ", error);
            }
        };
        fetchLevel();
    }, []);

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const response = await contractApi.getAllContract();
                setContracts(response.data);
            } catch (error) {
                console.log("Failed to fetch contract: ", error);
            }
        };
        fetchContract();
    }, []);
    return (
        <main className="flex items-center justify-center mt-5">
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-center col-span-1">
                    <div className="container">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-bold text-center text-primary">Tuyển Dụng</h1>
                            <Lottie className="w-[80%]" alt="recruitment" animationData={RecruitmentIcon} />
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="flex items-center justify-center">
                        <Form levels={levels} types={types} contracts={contracts} skills={skills} />
                    </div>
                </div>
            </div>
        </main>
    );
}
