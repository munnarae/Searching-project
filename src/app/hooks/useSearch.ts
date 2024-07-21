// hooks/useSearch.ts
import { useState, useEffect, useRef } from 'react';
import { companyData } from '@/app/data/companyData';

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
    const [filteredResults, setFilteredResults] = useState<any[]>([]); // 필터링된 검색 결과 상태
    const [showMore, setShowMore] = useState(false); // 더보기 버튼 클릭 여부 상태
    const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부 상태
    const loader = useRef<HTMLDivElement | null>(null); // 무한 스크롤 로더 Ref

    // 검색어가 변경되면 해당 검색어에 맞는 결과를 필터링합니다.
    const handleSearch = (term: string) => {
        setSearchTerm(term);

        // 검색어에 맞는 결과를 필터링합니다.
        const results = companyData.filter(result => result.name.includes(term));
        setFilteredResults(results.slice(0, 3)); // 처음 3개의 결과만 보여줍니다.
        setHasMore(results.length > 3); // 결과가 3개 이상 있는지 여부를 설정합니다.
        setShowMore(false); // 더보기 버튼을 초기화합니다.
    };

    // 더보기 버튼을 클릭하면 추가 결과를 로드합니다.
    const loadMore = () => {
        setFilteredResults(prevResults => {
            const newResults = companyData.filter(result => result.name.includes(searchTerm)).slice(prevResults.length, prevResults.length + 5);
            if (newResults.length === 0) {
                setHasMore(false); // 더 로드할 결과가 없으면 상태를 업데이트합니다.
            }
            return [...prevResults, ...newResults]; // 기존 결과에 새 결과를 추가합니다.
        });
    };

    // 무한 스크롤을 처리하는 useEffect
    useEffect(() => {
        if (!showMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore(); // 로더가 화면에 보이면 추가 결과를 로드합니다.
                }
            },
            { threshold: 1 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [showMore, hasMore]);

    // 더보기 버튼을 클릭하면 showMore 상태를 true로 설정하고 추가 결과를 로드합니다.
    const handleShowMore = () => {
        setShowMore(true);
        loadMore(); // Load the next set of results immediately
    };

    // 검색을 리셋하는 함수입니다.
    const handleReset = () => {
        setSearchTerm('');
        setFilteredResults([]);
    };

    return {
        searchTerm,
        filteredResults,
        showMore,
        hasMore,
        loader,
        handleSearch,
        handleShowMore,
        handleReset,
    };
};
