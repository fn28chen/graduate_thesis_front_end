"use client";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookies } from "typescript-cookie";

function SearchByExtension() {
  const searchParams = useSearchParams().get("query");
  const accessToken = getCookies().accessToken;
  const [data, setData] = useState<{ Key: string; Size: number }[] | null>(
    null
  ); // State to store fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  const fetchData = async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/search/extension?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data); // Update state with fetched data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data"); // Set error message
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    if (searchParams) {
      fetchData(searchParams);
    }
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div>
      <h2>Search Results:</h2>
      {data && data.length > 0 ? (
        <ScrollArea className="h-[200px] w-[350px]">
          {data.map((item, index) => (
            <li key={index}>
              {item.Key} - {item.Size} bytes
            </li> // Adjust based on your data structure
          ))}
        </ScrollArea>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchByExtension;
