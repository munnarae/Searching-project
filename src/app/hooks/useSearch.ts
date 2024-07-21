// hooks/useSearch.ts
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
        setHasMore(results.length > 3); //
        setShowMore(false);
    };

    const loadMore = () => {
        setFilteredResults(prevResults => {
            const newResults = companyData.filter(result => result.name.includes(searchTerm)).slice(prevResults.length, prevResults.length + 5);
            if (newResults.length === 0) {
                setHasMore(false);
            }
            return [...prevResults, ...newResults];
        });
    };

    // 무한 스크롤을 처리하는 useEffect
    useEffect(() => {
        if (!showMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
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

    const handleShowMore = () => {
        setShowMore(true);
        loadMore(); // Load the next set of results immediately
    };

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
