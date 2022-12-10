import React, { useState, useEffect } from 'react'
import Card from '../components/Card.jsx'
import InfiniteScroll from 'react-infinite-scroll-component'
export default function Home() {
  const [items, setItems] = useState([])
  const [hasMore, sethasMore] = useState(true)
  const [page, setpage] = useState(2)
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`,
      )
      const data = await res.json()
      setItems(data)
    }

    getComments()
  }, [])

  const fetchComments = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`,
    )
    const data = await res.json()
    return data
  }

  const fetchData = async () => {
    const commentsFormServer = await fetchComments()
    setItems([...items, ...commentsFormServer])
    if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
      sethasMore(false)
    }
    setpage(page + 1)
  }
  return (
    <div className="flex justify-center flex-col mx-10 py-3">
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl my-4">
          Next Js Infinite Scrolling with Search Filter
        </h1>
        <form onSubmit={handleFormSubmit}>
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900  border rounded-lg bg-gray-50 outline-none"
              placeholder="Search Mockups, Logos..."
              required
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        className="grid gap-4 my-4 sm:grid-cols-3"
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {!!items &&
          items
            .filter((data) => {
              if (data.email.toLowerCase().includes(inputValue.toLowerCase())) {
                return data
              }
            })
            .map((data) => {
              return <Card data={data} key={data.id} />
            })}
      </InfiniteScroll>
    </div>
  )
}
