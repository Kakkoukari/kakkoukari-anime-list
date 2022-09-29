import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Comment from "./comment";
import AddComment from "./add-comment";

const CommentListContainer = ({ comments, currentUser }) => {
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
