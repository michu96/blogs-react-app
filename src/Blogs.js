import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'
import BlogsNav from './BlogsNav'
import Modal from './Modal'
import BlogForm from './BlogForm'

function Blogs() {
  const [activeBlog, setActiveBlog] = useState({})
  const [blogs, setBlogs] = useState([])
  const [showNewBlogModal, setShowNewBlogModal] = useState(false)
  const [showEditBlogModal, setShowEditBlogModal] = useState(false)
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
  const toggleEditBlogModal = (blog) => {
    setActiveBlog(blog)
    setShowEditBlogModal(!showEditBlogModal)
  }
  const createNewBlog = async (e, blog) => {
    e.preventDefault()
    const res = await axios.post(
      'https://blogs-api-test.herokuapp.com/api',
      blog
    )
    setShowNewBlogModal(false)
    const blogs = await fetchBlogs()
    setBlogs(blogs)
  }
  const updateBlog = async (e, blog) => {
    e.preventDefault()
    const res = await axios.put(
      `https://blogs-api-test.herokuapp.com/api/${blog._id}`,
      blog
    )
    setShowEditBlogModal(false)
    const blogs = await fetchBlogs()
    setBlogs(blogs)
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
          <BlogForm blog={{}} onSubmitHandler={createNewBlog} />
        </Modal>
      ) : showEditBlogModal ? (
        <Modal header={'Edit blog'} onClose={toggleEditBlogModal}>
          <BlogForm blog={activeBlog} onSubmitHandler={updateBlog} />
        </Modal>
      ) : (
        <></>
      )}
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog._id}
            blog={blog}
            deleteBlog={deleteBlog}
            editBlog={toggleEditBlogModal}
          />
        )
      })}
    </div>
  )
}

export default Blogs
