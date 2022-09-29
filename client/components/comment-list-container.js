import React from "react";
import styles from "../styles/comment-list-container.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Comment from "./comment";

const CommentListContainer = ({ comments, currentUser }) => {
  const renderComments = () => {
    return comments.map((comment) => {
      return <Comment comment={comment} currentUser={currentUser} />;
    });
  };

  //   const AllComments = renderComments();

  return (
    <>
      <div className="app container py-4 text-light">Container</div>
      {/* AllComments */}
    </>
  );
};

export default CommentListContainer;
