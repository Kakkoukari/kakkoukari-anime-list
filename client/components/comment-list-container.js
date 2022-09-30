import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Comment from "./comment";
import AddComment from "./add-comment";
import useRequest from "../hooks/use-request";
const CommentListContainer = ({ currentUser, animeId, malId }) => {
  const { comments, setComments } = useState([]);
  /*The Route To Add a New Comment*/
  // const { doRequest, errors } = useRequest({
  //   url: "/api/comments/add",
  //   method: "post",
  //   body: {
  //     animeId: animeId,
  //     conent: content,
  //     malId: malId,
  //   },
  //   onSuccess: (data) => {
  //     console.log(data);
  //     let newComments = comments;
  //     newComments.push(data);
  //     setComments(newComments);
  //   },
  // });
  useEffect();
  const renderComments = () => {
    return comments.map((comment) => {
      return <Comment comment={comment} currentUser={currentUser} />;
    });
  };

  //   const AllComments = renderComments();

  return (
    <>
      <AddComment />
      <Comment />
      <Comment />
      <Comment />
      {/* AllComments */}
    </>
  );
};

export default CommentListContainer;
