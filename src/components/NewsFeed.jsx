// src/components/NewsFeed.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchArticles = async (pageNumber) => {
    try {
      const response = await axios.get("https://api.thenewsapi.com/v1/news/all", {
        params: {
          api_token: "YOUR_API_KEY", // replace with your actual key
          language: "en",
          page: pageNumber,
          page_size: 10,
        },
      });

      setArticles(response.data.data);
      setTotalResults(response.data.meta.found);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>

      {articles.map((article) => (
        <div key={article.uuid} className="mb-6 p-4 border rounded shadow-sm bg-white">
          <h2 className="text-lg font-semibold">{article.title}</h2>
          <p className="text-sm text-gray-600">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 inline-block">
            Read More
          </a>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
