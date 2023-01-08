import React from "react";
import { useSelector } from "react-redux";

import {
  selectPostIds,
  selectPostsError,
  selectPostsStatus,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const orderedPostsIds = useSelector(selectPostIds);
  const postsError = useSelector(selectPostsError);
  const postsStatus = useSelector(selectPostsStatus);

  let content;
  switch (postsStatus) {
    case "loading": {
      content = <p>Loading</p>;
      break;
    }
    case "failed": {
      content = <p>{postsError}</p>;
      break;
    }
    default: {
      // const ordredPosts = posts.slice().sort(
      //     (a, b) => b.date.localeCompare(a.date)
      // )

      content = orderedPostsIds.map((id) => (
        <PostsExcerpt key={id} postId={id} />
      ));
    }
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
