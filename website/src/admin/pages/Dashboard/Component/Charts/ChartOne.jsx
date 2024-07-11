import React, {useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ChartOne({data, max, typeParams, setTypeParams}) {
    const [state, setState] = useState({
        series: [
            {
                name: 'Người Dùng',
                data: [],
            },
            {
                name: 'Nhà Tuyền Dụng',
                data: [],
            },
        ],
    });

    useEffect(() => {
        // Cập nhật series với dữ liệu mới khi props data thay đổi
        if (data && data.role1 && data.role2) {
            setState({
                series: [
                    {
                        name: 'Người Dùng',
                        data: data.role1,
                    },
                    {
                        name: 'Nhà Tuyền Dụng',
                        data: data.role2,
                    },
                ],
            });
        }
    }, [data]);

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = currentDate.getFullYear();
        const formattedDateTmp = `${month.toString().padStart(2, '0')}-${year}`;
        setFormattedDate(formattedDateTmp);
    }, []);

    const options = {
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'left',
        },
        colors: ['#3C50E0', '#80CAEE'],
        chart: {
            fontFamily: 'NotoSans-Regular',
            height: 335,
            type: 'area',
            dropShadow: {
                enabled: true,
                color: '#623CEA14',
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },
            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: 'straight',
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 4,
            colors: '#fff',
            strokeColors: ['#3056D3', '#80CAEE'],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: 'category',
            categories: [
                'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: '0px',
                },
            },
            min: 0,
            max: max,
        },
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#3C50E0]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#3C50E0]"></span>
            </span>
                        <div className="w-full">
                            <p className="font-semibold text-[#3C50E0]">Người Dùng</p>
                            <p className="text-sm font-medium">01-2024 - {formattedDate}</p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#80CAEE]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#80CAEE]"></span>
            </span>
                        <div className="w-full">
                            <p className="font-semibold text-[#80CAEE]">Nhà Tuyển Dụng</p>
                            <p className="text-sm font-medium">01-2024 - {formattedDate}</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5">
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card">
                            Tháng
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
}
