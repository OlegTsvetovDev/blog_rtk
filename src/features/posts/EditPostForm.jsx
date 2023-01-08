import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { deletePost, selectPostById, updatePost } from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  if (!post)
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAuthorChange = (e) => setUserId(Number(e.target.value));

  const canUpdate =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    addRequestStatus === "idle";

  const handleUpdatePost = (e) => {
    if (!canUpdate) return;

    try {
      setAddRequestStatus("pending");
      dispatch(
        updatePost({
          postId,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        })
      ).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.log("Failed to update the post: ", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const handleDeletePost = (e) => {
    try {
      setAddRequestStatus("pending");
      dispatch(
        deletePost({
          postId,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        })
      ).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.log("Failed to update the post: ", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <select
          name="postAuthor"
          id="postAuthor"
          defaultValue={userId}
          onChange={handleAuthorChange}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button onClick={handleUpdatePost} disabled={!canUpdate}>
          Update post
        </button>
        <button onClick={handleDeletePost}>Delete post</button>
      </form>
    </section>
  );
};

export default EditPostForm;
