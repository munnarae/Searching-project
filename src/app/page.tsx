// pages/index.tsx
'use client'; // 클라이언트 측에 렌더링이 되도록 클라이언트 컴포넌트로 우회.
import React from 'react';
import SearchBar from "@/app/components/SearchBar";
import SearchResults from "@/app/components/SearchResults";
import { useSearch } from '@/app/hooks/useSearch';

const Home: React.FC = () => {
    const {
        searchTerm,
        filteredResults,
        showMore,
        hasMore,
        loader,
        handleSearch,
        handleShowMore,
        handleReset,
    } = useSearch();

    return (
        <div className="bg-white min-h-screen p-4">
            <SearchBar onSearch={handleSearch} onReset={handleReset} />
            {filteredResults.length > 0 && (
                <SearchResults
                    searchTerm={searchTerm}
                    results={filteredResults}
                    showMore={showMore}
                    hasMore={hasMore}
                    handleShowMore={handleShowMore}
                    loader={loader}
                />
            )}
        </div>
    );
};

export default Home;
