import React, { useEffect } from 'react';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/css/jsvectormap.css';
import '../../js/us-aea-en';

export default function MapOne() {
    useEffect(() => {
        const mapOne = new jsVectorMap({
            selector: '#mapOne',
            map: 'us_aea_en',
            zoomButtons: true,
            regionStyle: {
                initial: {
                    fill: '#C8D0D8',
                },
                hover: {
                    fillOpacity: 1,
                    fill: '#3056D3',
                },
            },
            regionLabelStyle: {
                initial: {
                    fontFamily: 'Satoshi',
                    fontWeight: 'semibold',
                    fill: '#fff',
                },
                hover: {
                    cursor: 'pointer',
                },
            },
            labels: {
                regions: {
                    render(code) {
                        return code.split('-')[1];
                    },
                },
            },
        });
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default xl:col-span-7">
            <h4 className="mb-2 text-xl font-semibold text-black">
                Region labels
            </h4>
            <div id="mapOne" className="mapOne map-btn h-90"></div>
        </div>
    );
}
