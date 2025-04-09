import React from "react";

export default function ArticleDetails({ article, onBack }) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        ← Back
      </button>
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-60 object-cover rounded mb-3"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {article.source} • {new Date(article.published_at).toLocaleString()}
      </p>
      <p className="mb-4">{article.snippet || article.description}</p>
      <p className="text-gray-700">{article.author && <>By {article.author}</>}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-2 inline-block"
      >
        Read full article ↗
      </a>
    </div>
  );
}
