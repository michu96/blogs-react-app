import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'
import BlogsNav from './BlogsNav'
import Modal from './Modal'

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [showNewBlogModal, setShowNewBlogModal] = useState(false)
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
  const toggleNewBlogModal = () => {
    setShowNewBlogModal(!showNewBlogModal)
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
      <BlogsNav newBlogOnClick={toggleNewBlogModal} />

      {showNewBlogModal ? (
        <Modal header={'Create new blog'} onClose={toggleNewBlogModal}>
          Modal test
        </Modal>
      ) : (
        <></>
      )}
      {blogs.map((blog) => {
        return <Blog key={blog._id} blog={blog} deleteBlog={deleteBlog} />
      })}
    </div>
  )
}

export default Blogs
