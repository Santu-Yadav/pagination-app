interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export const paginate = (
  followers: GitHubUser[],
  itemsPerPage: number,
): GitHubUser[][] => {
  const numberOfPages: number = Math.ceil(followers.length / itemsPerPage);

  const newFollowers: GitHubUser[][] = Array.from(
    { length: numberOfPages },
    (_, index) => {
      const start: number = index * itemsPerPage;

      return followers.slice(start, start + itemsPerPage);
    },
  );

  return newFollowers;
};

export const matched = (data: GitHubUser[], input: string): GitHubUser[] => {
  if (!Array.isArray(data)) return [];

  const q: string = (input || "").trim().toLowerCase();
  if (q.length === 0) return data;

  return data.filter(({ login }) => {
    const loginLower: string = login.toLowerCase();

    if (q.length > loginLower.length) return false;

    for (let i = 0; i < q.length; i++) {
      if (q[i] !== loginLower[i]) return false;
    }

    return true;
  });
};

//console.log("newFollowers ### : ", newFollowers);
// console.log("start $$$$$ :", start);
// console.log("itemsPerPage $$$$$ :", itemsPerPage);
