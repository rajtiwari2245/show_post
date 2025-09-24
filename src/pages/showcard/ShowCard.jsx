import React from 'react';
import { usePostsContext } from '../../context/postContext';
import Pagination from '../../components/pagination';
import PostCard from '../../components/postCard';

const PER_PAGE = 6;

function ShowCard() {
  const { state, dispatch } = usePostsContext();
  const { allPosts, removedIds, status, error, currentPage } = state;

  if (status === 'loading') {
    return <div>Loading .....</div>;
  }

  if (status === 'failed') {
    return <div>Error .....</div>;
  }

 
  const filtered = allPosts.filter(p => !removedIds.has(p.id));
  const total = filtered.length;

  const startIndex = (currentPage - 1) * PER_PAGE;
  const pageslice = filtered.slice(startIndex, startIndex + PER_PAGE);

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_POST', payload: id });
  };

  const handlePageChange = (pageNum) => {
    dispatch({ type: 'SET_PAGE', payload: pageNum });
  };

  return (
    <div className="">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {pageslice.map((post) => (
          <PostCard key={post.id} post={post} onRemove={handleRemove} />
        ))}

        {pageslice.length === 0 && <div className='text-center col-span-full'>No posts available</div>}
      </div>

      <Pagination
        totalItem={total}
        perPage={PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ShowCard;
