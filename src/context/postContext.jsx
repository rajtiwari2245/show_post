import React, { createContext, useEffect, useReducer, useContext } from "react";

const postaContext = createContext();

const PER_PAGE = 6;

const initialstate = {
  allPosts: [],
  removedIds: new Set(), 
  currentPage: 1,
  status: "idle",
  error: null,
};

function postsReducer(state, action) {
  switch (action.type) {
    case "FETCH-START":
      return { ...state, status: "loading", error: null };

    case "FETCH-SUCCESS":
      return { ...state, status: "success", allPosts: action.payload };

    case "FETCH-FAILURE":
      return { ...state, status: "error", error: action.payload };

    case "FETCH-REMOVE_POST": {
      const id = action.payload;
      const newRemoved = new Set(state.removedIds);
      newRemoved.add(id);

      const filtered = state.allPosts.filter((p) => !newRemoved.has(p.id));
      const maxPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
      const newCurrent = Math.min(state.currentPage, maxPage);

      return {
        ...state,
        removedIds: newRemoved,
        allPosts: filtered,
        currentPage: newCurrent,
      };
    }

    case "SET_PAGE":
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
}


export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, initialstate);

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "FETCH-START" });

      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!resp.ok) {
          throw new Error(`HTTP error ${resp.status}`);
        }
        const data = await resp.json();

        
        await new Promise((resolve) => setTimeout(resolve, 500));

        dispatch({ type: "FETCH-SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH-FAILURE", payload: err.message });
      }
    }
    fetchPosts();
  }, []);

  return (
    <postaContext.Provider value={{ state, dispatch }}>
      {children}
    </postaContext.Provider>
  );
}

export function usePostsContext() {
  const ctx = useContext(postaContext);
  if (!ctx) {
    throw new Error("usePostsContext must be used within the PostProvider");
  }
  return ctx;
}
