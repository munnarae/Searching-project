import React, { useState, useEffect } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { MdOutlineClear } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { useDebounce } from '@/app/hooks/useDebounce';
import { suggestionsList } from '@/app/data/companyData';

const SearchBar: React.FC<{ onSearch: (term: string) => void, onReset: () => void }> = ({ onSearch, onReset }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>(suggestionsList);
    const [hideSuggestions, setHideSuggestions] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 최근 검색어를 가져옵니다.
    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(storedSearches);
    }, []);

    // 검색어가 디바운스된 후 onSearch 콜백을 호출합니다.
    useEffect(() => {
        if (debouncedSearchTerm) {
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    // 최근 검색어를 업데이트하고 로컬 스토리지에 저장합니다.
    const addRecentSearch = (term: string) => {
        const updatedSearches = [term, ...recentSearches.filter(search => search !== term)].slice(0, 10);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    // 검색어를 처리하고 최근 검색어에 추가하며 검색 제안을 숨깁니다.
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        addRecentSearch(term);
        onSearch(term);
        setHideSuggestions(true);
    };

    // 특정 최근 검색어를 삭제합니다.
    const handleDeleteRecent = (term: string) => {
        const updatedSearches = recentSearches.filter(search => search !== term);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    // 검색어 입력란을 초기화합니다.
    const clearSearchTerm = () => setSearchTerm('');

    // 엔터 키를 눌렀을 때 검색어를 처리합니다.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            handleSearch(searchTerm);
            setSearchTerm('');
        }
    };

    // 뒤로가기 아이콘 클릭 시 검색 제안과 최근 검색어를 다시 표시합니다.
    const showSuggestions = () => {
        setHideSuggestions(false);
        onReset();
    };

    return (
        <div className="p-4">
            <div className="flex items-center space-x-2">
                <IoIosArrowBack className="cursor-pointer" size={24} onClick={showSuggestions} />
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 placeholder-black focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-500"
                        placeholder="검색어를 입력해 주세요"
                    />
                    {searchTerm && (
                        <CiCircleRemove
                            className="absolute right-2 top-3 cursor-pointer"
                            onClick={clearSearchTerm}
                            size={20}
                        />
                    )}
                </div>
            </div>
            {!hideSuggestions && (
                <>
                    <div className="mt-4">
                        <h2 className="text-xl mb-2 font-bold">요즘 많이 찾는 검색어</h2>
                        <div className="flex overflow-x-scroll space-x-2 max-w-full">
                            <div className="flex space-x-2" style={{ minWidth: 'fit-content' }}>
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearch(suggestion)}
                                        className="p-1 bg-white rounded-full w-20 border border-black text-sm"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {recentSearches.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-xl mb-2 font-bold">최근 검색한</h2>
                            <div>
                                {recentSearches.map((search, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className='mt-2'>{search}</span>
                                        <button onClick={() => handleDeleteRecent(search)}><MdOutlineClear /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchBar;
