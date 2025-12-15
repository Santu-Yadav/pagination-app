const Follower = (props) => {
  const { avatar_url, html_url, login } = props.follower;
  const index = props.index;

  return (
    <article
      className="card"
      ref={props.array.length === index + 1 ? props.refFunction : null}
    >
      <img src={avatar_url} alt={login} />
      <h4>{login}</h4>
      <a href={html_url} className="btn">
        view profile
      </a>
    </article>
  );
};

export default Follower;

// console.log("index--01 @@ :", index);
