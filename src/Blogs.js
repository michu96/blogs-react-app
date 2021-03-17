import { useState, useEffect } from 'react'
import Blog from './Blog'

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const fetchBlogs = async () => {
    const res = await fetch('https://blogs-api-test.herokuapp.com/api')
    const blogs = await res.json()
    return blogs
  }
  useEffect(() => {
    async function getBlogs() {
      const blogs = await fetchBlogs()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])
  return (
    <div className="blogs-container">
      {blogs.map((blog) => {
        return <Blog key={blog._id} blog={blog} />
      })}
    </div>
  )
}

export default Blogs
