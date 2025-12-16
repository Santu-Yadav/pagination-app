const HeaderTitle = ({ loading, eachPageDataLength }) => {
  let title;
  if (loading) {
    title = "loading...";
  } else if (eachPageDataLength > 0) {
    title = "Followers";
  } else {
    title = "Please try again";
  }
  return <h1>{title}</h1>;
};

export default HeaderTitle;
