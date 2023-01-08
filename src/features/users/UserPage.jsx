import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {
  selectAllPosts,
  selectPostsByUser,
  selectUserById,
} from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));

  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  if (!user)
    return (
      <section>
        <h2>User not found</h2>
      </section>
    );

  const postsTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Posts of user {user?.name}</h2>
      <ol>{postsTitles}</ol>
    </section>
  );
};

export default UserPage;
