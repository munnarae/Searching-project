import { useState, useEffect, useRef } from 'react';
import { companyData } from '@/app/data/companyData';

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<any[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef<HTMLDivElement | null>(null);

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        const results = companyData.filter(result => result.name.includes(term));
        setFilteredResults(results.slice(0, 3));
        setHasMore(results.length > 3);
    };


    useEffect(() => {
        if (!showMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
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
        handleReset,
    };
};
