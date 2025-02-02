import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import classes from "../styles/Videos.module.css";
import Video from "./Video";
import useVideoList from "./hooks/useVideoList";

const Videos = () => {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <div className={classes.videos}>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          next={() => setPage(page + 8)}
        >
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link
                state={{ title: video.title }}
                to={`/quiz/${video.youtubeID}`}
                key={video.youtubeID + Math.random()}
              >
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                key={video.youtubeID + Math.random()}
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <p>No videos found</p>}
      {error && <p>There was an Error</p>}
      {loading && <div>Loading...</div>}
      {/* <Link to="/quiz">
        <Video />
      </Link> */}
    </div>
  );
};

export default Videos;
