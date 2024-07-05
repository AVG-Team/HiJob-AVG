import StatusProfile from "./StatusProfile.jsx";
export default function RightProfile({userInfo}) {
    return (
        <div className="md:py-4 mb-5 px-2 lg:px-0">
            <StatusProfile status={userInfo ? userInfo.jobStatus : false}/>
        </div>
    )
}