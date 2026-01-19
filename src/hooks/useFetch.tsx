import { useState, useEffect } from "react";

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface UseFetchResult {  
  loading: boolean;
  data: GitHubUser[];
}

const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

export const useFetch = (): UseFetchResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<GitHubUser[]>([]);

  const getProducts = async (): Promise<void> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: GitHubUser[] = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { loading, data };
};

// console.log("data @@ :", data);
// setData(paginate(data));
