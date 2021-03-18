import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'
import BlogsNav from './BlogsNav'

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const fetchBlogs = async () => {
    const res = await axios.get('https://blogs-api-test.herokuapp.com/api')
    return res.data
  }
  const deleteBlog = async (id) => {
    await axios.delete(`https://blogs-api-test.herokuapp.com/api/${id}`)
    setBlogs(
      blogs.filter((blog) => {
        return id !== blog._id
      })
    )
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
      <BlogsNav />
      {blogs.map((blog) => {
        return <Blog key={blog._id} blog={blog} deleteBlog={deleteBlog} />
      })}
    </div>
  )
}

export default Blogs
