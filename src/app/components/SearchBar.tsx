import React, { useState, useEffect } from 'react';
import {IoIosArrowBack} from "react-icons/io";
import {CiCircleRemove} from "react-icons/ci";

const SearchBar = () => {
    return (
        <div className="p-4">
            <div className="flex items-center space-x-2">
                <IoIosArrowBack className="cursor-pointer" size={24} />
                <div className="relative flex-1">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 placeholder-black focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-500"
                        placeholder="검색어를 입력해 주세요"
                    />
                    <CiCircleRemove
                        className="absolute right-2 top-3 cursor-pointer"
                        size={20}
                    />
                </div>
            </div>
                <>
                    <div className="mt-4">
                        <h2 className="text-xl mb-2 font-bold">요즘 많이 찾는 검색어</h2>
                        <div className="flex overflow-x-scroll space-x-2 max-w-full">
                            <div className="flex space-x-2" style={{ minWidth: 'fit-content' }}>
                            </div>
                        </div>
                    </div>
                </>
        </div>
    )
}

export default SearchBar;