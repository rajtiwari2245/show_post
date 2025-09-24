import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePostsContext } from "../../context/postContext";
import Pagination from "../../components/pagination";
import PostCard from "../../components/postCard";

const PER_PAGE = 6;

function ShowCard() {
  const { state, dispatch } = usePostsContext();
  const { allPosts, removedIds, status, error, currentPage } = state;

  // --- Loading State ---
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600">
        Loading posts...
      </div>
    );
  }

  // --- Error State ---
  if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-40 text-red-500 font-medium">
        Something went wrong: {error || "Unable to fetch posts."}
      </div>
    );
  }

  
  const filteredPosts = allPosts.filter((post) => !removedIds.has(post.id));
  const totalPosts = filteredPosts.length;

  const startIndex = (currentPage - 1) * PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + PER_PAGE);

  
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_POST", payload: id });
  };

  const handlePageChange = (pageNum) => {
    dispatch({ type: "SET_PAGE", payload: pageNum });
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <PostCard post={post} onRemove={handleRemove} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center col-span-full text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No posts available
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
      {totalPosts > PER_PAGE && (
        <Pagination
          totalItem={totalPosts}
          perPage={PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default ShowCard;
