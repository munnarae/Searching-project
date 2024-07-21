import Image from "next/image";
import SearchBar from "@/app/components/SearchBar";
import SearchResults from "@/app/components/SearchResults";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <SearchResults />
    </div>
  );
}
