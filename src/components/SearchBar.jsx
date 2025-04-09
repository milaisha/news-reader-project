// SearchBar.jsx
import React from "react";

export default function SearchBar({ searchQuery, setSearchQuery, category, setCategory }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mt-2 p-2 border rounded"
      >
        <option value="">All Categories</option>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="health">Health</option>
        <option value="sports">Sports</option>
        
      </select>
    </div>
  );
}

