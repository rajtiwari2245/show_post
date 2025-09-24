import React from "react";

function postCard({ post, onRemove }) {
  return (
    <div className=" relative bg-white p-4 rounded-lg shadow ">
      <button
        className="absolute top-2  right-2 text-red-500 text-xl hover:text-red-700 cursor-pointer"
        onClick={() => onRemove(post.id)}
      >
        &times;
      </button>
      <h2 className="text-lg font -semibold mb-2"> {post.tiite}</h2>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}

export default postCard;
