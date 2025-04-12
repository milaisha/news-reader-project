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
          api_token: "YOUR_API_KEY",
          language: "en",
          page: pageNumber,
          page_size: 10,
        },
      });

      setArticles(response.data.data);
      setTotalResults(response.data.meta.found);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        🗞️ Top Stories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div
            key={article.uuid}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {article.description ? article.description : "No description available."}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-full transition duration-200"
            >
              Read More
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition"
        >
          ⬅️ Previous
        </button>

        <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
          Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;


