import TabForm from "../../components/TabForm";
import TableForm from "./components/TableForm";

export default function JobApplied() {
    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container px-4 py-5 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <TabForm id={4} />
                        <div className="flex justify-start py-4 text-primary">
                            <h1 className="text-lg font-bold text-start">Việc Đã Ứng Tuyển</h1>
                        </div>
                        <TableForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
