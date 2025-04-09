import React from "react";

export default function NewsCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border p-4 mb-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
    >
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}
      <h2 className="text-xl font-semibold">{article.title}</h2>
      <p className="text-sm text-gray-600">
        {new Date(article.published_at).toLocaleString()}
      </p>
      <p className="mt-2 text-gray-700">{article.description || "No summary available."}</p>
    </div>
  );
}
