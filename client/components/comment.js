import React from "react";
import styles from "../styles/comment.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Comment = ({ comment, currentUser }) => {
  //   comment = { content, animeId, userId, malId, username };

  return (
    <>
      <div className="app container py-4 text-light">
        <div className="col-md-10 col-lg-8 m-auto">
          <div className="bg-dark rounded-3 shadow-sm p-4">
            <div className="py-3">
              <div className={`d-flex ${styles.comment}`}>
                <img
                  className={`rounded-circle ${styles.commentimg}`}
                  src="https://i.pinimg.com/236x/28/2f/81/282f81f5de984104a9227583b39df527.jpg"
                />
                <div className="flex-grow-1 ms-3">
                  <div className="mb-1">
                    <span className="fw-bold text-dark bg-primary py-1 px-2 rounded-pill me-1">
                      {/* Comment the line below and uncomment the line next */}
                      Kamisato Mugi
                      {/* comment.username || Kamisato Mugi */}
                    </span>
                    <span className="text-muted text-nowrap">10 hours ago</span>
                  </div>

                  {/* todo: Comment the line below and uncomment the line next */}
                  <div className="mb-2">
                    Aenean non tellus sed erat ultrices rutrum. Sed ac dolor
                    tempus, efficitur diam vitae, sagittis nisi. Morbi bibendum
                    congue nisl eu congue. Mauris eu eros bibendum, pretium ex
                    ac, aliquam lorem.
                  </div>
                  {/* <div className="mb-2">{commment.content}</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
