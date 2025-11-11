const paginate = (followers, itemsPerPage) => {
  
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);
  console.log("numberOfPages @@ :", numberOfPages);

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;

    console.log("start $$$$$ :", start);
    console.log("start + itemsPerPage $$$$$ :", start + itemsPerPage);

    return followers.slice(start, start + itemsPerPage);
  });

  console.log("newFollowers ### : ", newFollowers);
  return newFollowers;
};

export default paginate;

// console.log("start $$$$$ :", start);
// console.log("itemsPerPage $$$$$ :", itemsPerPage);
