const NewsItem=(props)=> {
    let { title, description, imageUrl, newsUrl, publishedAt, author,source } =
      props;
    return (
      <div>
        <div className="card">
          <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}><span className="badge rounded-pill bg-danger">{source}</span></div>
          <img
            src={
              !imageUrl
                ? "https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                by {author ? author : "Unknown"} Last updated{" "}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sn btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
