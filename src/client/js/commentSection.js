const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");

  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = newCommentId;

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";

  const span = document.createElement("span");
  span.innerText = ` ${text}`;

  const span2 = document.createElement("span");
  span2.innerText = " ❌";
  span2.className = "deleteBtn";
  span2.addEventListener("click", handleDelete);

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  textarea.value = "";
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const deleteComment = event.target.parentElement;
  const deleteCommentId = deleteComment.dataset.id;

  const { status } = await fetch(`/api/videos/${deleteCommentId}/comment/delete`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoId: videoContainer.dataset.id }),
  });

  if (status === 204) {
    deleteComment.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}
