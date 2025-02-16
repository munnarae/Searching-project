import React, { useState } from 'react';

const SearchResults: React.FC<{ searchTerm: string, results: any[], showMore: boolean, hasMore: boolean, handleShowMore: () => void, loader: React.RefObject<HTMLDivElement> }> = ({ searchTerm, results, showMore, hasMore, handleShowMore, loader }) => {
    const [selectedTab, setSelectedTab] = useState<string>('전체');

    const renderResults = () => {
        return (
            <div className="space-y-4">
                {results.map((result, index) => (
                    <div key={index} className="flex items-center p-4 border border-gray-300 rounded">
                        <img src={result.imageUrl} alt={result.name} className="w-12 h-12 mr-4" />
                        <div>
                            <h3 className="text-lg">{result.name}</h3>
                            <p>{result.description}</p>
                        </div>
                    </div>
                ))}
                {showMore && hasMore && <div ref={loader} className="h-5 bg-transparent"></div>}
            </div>
        );
    };

    return (
        <div className="p-4">
            <div className="flex justify-around mb-4 border-b border-gray-300">
                {['전체', '업체', '업체소식'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`p-2 ${selectedTab === tab ? 'border-b-2 border-black w-36' : 'border-b-2 border-transparent w-36'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <h2 className="text-xl font-bold mb-4">{selectedTab}</h2>
            {renderResults()}
            {!showMore && hasMore && (
                <button
                    onClick={handleShowMore}
                    className="mt-4 w-full p-2 bg-gray-500 text-white rounded"
                >
                    업체 더보기
                </button>
            )}
        </div>
    );
};

export default SearchResults;
