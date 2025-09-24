import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react"; 

function PostCard({ post, onRemove }) {
  return (
    <motion.div
      className="relative bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      
      <button
        onClick={() => onRemove(post.id)}
        className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition-colors"
        aria-label="Remove Post"
      >
        <X size={20} />
      </button>

      
      <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
        {post.title}
      </h2>

     
      <p className="text-gray-600 text-sm leading-relaxed">
        {post.body}
      </p>
    </motion.div>
  );
}

export default PostCard;
