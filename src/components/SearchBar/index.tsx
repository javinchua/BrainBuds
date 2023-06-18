import React, { useState } from 'react'
interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleSearch} className="px-4 py-2 ml-2 rounded-md bg-blue text-green">
        Search
      </button>
    </div>
  )
}

export default SearchBar
