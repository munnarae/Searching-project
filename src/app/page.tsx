'use client'; // 클라이언트 측에 렌더링이 되도록 클라이언트 컴포넌트로 우회.

import SearchBar from "@/app/components/SearchBar";
import SearchResults from "@/app/components/SearchResults";

export default function Home() {
  return (
    <div className="bg-white min-h-screen p-4">
        <SearchBar  />
    </div>
  );
}
