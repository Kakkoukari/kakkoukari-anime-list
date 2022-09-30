import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Comment from "./comment";
import AddComment from "./add-comment";
import useRequest from "../hooks/use-request";
const CommentListContainer = ({ currentUser, animeId, malId }) => {
  const { comments, setComments } = useState([]);

  /*The Route to show the Comments associated with an anime*/
  const { doRequest, errors } = useRequest({
    url: `/api/comments/show/${malId}`,
    method: "post",
    body: {
      animeId: animeId,
      conent: content,
      malId: malId,
    },
    onSuccess: (data) => {
      console.log(data);
      let newComments = comments;
      newComments.push(data);
      setComments(newComments);
    },
  });

  const RenderComments = () => {
    return comments.map((comment) => {
      return <Comment comment={comment} currentUser={currentUser} />;
    });
  };

  useEffect(async () => {
    await doRequest();
  });

  return (
    <>
      <AddComment
        currentUser={currentUser}
        malId={malId}
        animeId={animeId}
        comments={comments}
        setComments={setComments}
      />
      <RenderComments />
    </>
  );
};

export default CommentListContainer;
