import { useState } from 'react'
import SearchBar from './SearchBar.jsx'
import SelectMenu from './SelectMenu.jsx'
import CountriesList from './CountriesList.jsx'
import { useOutletContext } from 'react-router-dom'

export default function Home() {
  const [query, setQuery] = useState('')
  const [isDark] = useOutletContext()
  return (
    <main className={`${isDark? 'dark': ''}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      {query === 'unmount' ? '' : <CountriesList query={query} />}
    </main>
  )
}