const paginate = (followers) => {
  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);
  // console.log("numberOfPages @@ :", numberOfPages);

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });

  console.log("newFollowers ### : ", newFollowers);
  return newFollowers;
};

export default paginate;
