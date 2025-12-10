export const paginate = (followers, itemsPerPage) => {
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;

    return followers.slice(start, start + itemsPerPage);
  });

  return newFollowers;
};

export const matched = (data, input) => {
  if (!Array.isArray(data)) return [];

  const q = (input || "").trim().toLowerCase();
  if (q.length === 0) return data;

  return data.filter(({ login }) => {
    const loginLower = login.toLowerCase();

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
