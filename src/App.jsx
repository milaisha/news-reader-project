import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import NewsCard from "./components/NewsCard";
import ArticleDetails from "./components/ArticleDetails";
import NewsFeed from './components/NewsFeed';
import Footer from "./components/Footer"; 

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&locale=us&limit=10`;
        if (searchQuery) url += `&search=${searchQuery}`;
        if (category) url += `&categories=${category}`;

        const res = await fetch(url);
        const data = await res.json();
        if (data.data) {
          setArticles(data.data);
          setError(null);
        } else {
          throw new Error("No articles found");
        }
      } catch (err) {
        setError(err.message);
        setArticles([]);
      }
    };
    fetchNews();
  }, [searchQuery, category]);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">📰 News Reader</h1>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
      />

      {error && <p className="text-red-600 text-center">⚠️ {error}</p>}

      {!selectedArticle ? (
        <div className="h-[70vh] overflow-y-auto border p-4 rounded">
          {/* Check if articles are available */}
          {articles.length > 0 ? (
            articles.map((article) => (
              <NewsCard
                key={article.uuid}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No articles found. Try adjusting your search or category.</p>
          )}
        </div>
      ) : (
        <ArticleDetails
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
        />
      )}

      <NewsFeed />
      <Footer />
    </div>
  );
}

