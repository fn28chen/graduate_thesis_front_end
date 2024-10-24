"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { getCookies } from 'typescript-cookie';

function SearchByExtension() {
  const searchParams = useSearchParams().get('query');
  const accessToken = getCookies().accessToken;
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
      // Handle the response data as needed
      console.log("Response Data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      {searchParams}
      {searchParams && fetchData(searchParams)}
    </div>
  )
}

export default SearchByExtension