import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import { selectPostById } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article>
      <h3>{post?.title}</h3>
      <p className="exrept">{post?.body?.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`posts/${post.id}`}>View full post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
