import React from "react";
import styles from "../styles/comment.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import useRequest from "../hooks/use-request";

const AddComment = ({ currentUser, malId, animeId, comments, setComments }) => {
  const [content, setContent] = useState("");

  const { doRequest, errors } = useRequest({
    url: `/api/comments/add`,
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

  return (
    <>
      <div class="app container py-4">
        <div class="col-md-10 col-lg-8 m-auto">
          <div class="bg-dark text-white rounded-3 shadow-sm p-4 mb-4">
            <div class="d-flex">
              <img
                class={`rounded-circle me-3 ${styles.img}`}
                src="https://i.pinimg.com/236x/28/2f/81/282f81f5de984104a9227583b39df527.jpg"
                // src={currentUser.profilepic}
              />
              <div class="flex-grow-1 text-white">
                <div class="hstack gap-2 mb-1 text-white">
                  <span href="#" class="fw-bold link-white">
                    Studio KonKon
                    {/* {currentUser.username} */}
                  </span>
                </div>
                <div class="form-floating mb-3 text-white">
                  <textarea
                    class={`${styles.formcontrol} w-100`}
                    placeholder="Leave a comment here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    id="my-comment"
                  ></textarea>
                </div>
                <div class="hstack justify-content-end gap-2">
                  <button
                    class={`btn ${styles.btn}  btn-sm btn-primary text-uppercase`}
                  >
                    comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddComment;
