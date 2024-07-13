export default function Card(props){
    return (
        <div className="mt-8">
        
            <ul className="mt-4">
                <li className="mb-4">
                    <div className="relative rounded border border-solid shadow-lg bg-[#FFFFFF]">
                        <div className="flex item-start justify-between gap-6 p-4">
                            {/* LOGO */}
                            <div>
                                <a className="block h-[7.5rem] w-[10rem]"   target="_blank" href="">  
                                    <img src="src/assets/img/LG_Logo.png" style={{objectFit:"contain"}} alt="" loading="lazy" width="160" height="120" decoding="async" className="h-28 w-40 max-w-full rounded-xl bg-white p-2"
                                />  
                                </a>
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1">
                                <h3 className="line-clamp-1">
                                    <a target="_blank" className="text-md text-lg font-bold transistion transition-all text-primary" href="">{props.name}</a>
                                </h3>
                               
                                <div className="mt-2 flex items-center justify-start gap-5">
                                    {/* <div className="text-primary">
                                        <p>
                                            <span className="text-md cursor-pointer transition-all hover:text-primary">{props.salary}</span>
                                        </p>
                                    </div> */}
                                    {/* <div className="text-gray-600">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128Z"></path>
                                        </svg>
                                    </div> */}
                                    {/* <div>
                                        <p className="text-md text-gray-500">{props.require_of_year}</p>
                                    </div> */}
                                </div>
                                <div className="text-md flex flex-wrap items-end gap-2 text-gray-500">
                                    <p>Hồ Chí Minh</p>
                                    <p>
                                        "(In Office )"
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <ul className=" ml-6 list-disc text-gray-600">
                                        <li className="text-md"> {props.responsibilities}</li>
                                        <li className="text-md">Salary: {props.salary}</li>
                                    </ul>
                                </div>
                                <hr className="mt-2 h-px w-full bg-gray-200"/>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="line-clamp-1">
                                        <a className="mr-2 inline-block"  href="">
                                        <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid 
                                            border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">JavaScript</span>
                                        </a>
                                        <a className="mr-2 inline-block"  href="">
                                        <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid 
                                            border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">C++</span>
                                        </a>
                                        <a className="mr-2 inline-block"  href="">
                                        <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid 
                                            border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">Java</span>
                                        </a>
                                    </div>

                                    <p className="whitespace-nowrap text-md text-gray-400">
                                        Posted 1 day ago
                                    </p>
                                </div>
                            </div>
                            <div className="w-fit" data-testid="flowbite-tooltip-target">
                                <button role="button" aria-label="Follow button">
                                    <span className="text-gray cursor-pointer select-none text-xl leading-none">
                                        <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path>
                                            </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </li>
            </ul>


        </div>
    )
}