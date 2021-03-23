import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'
import BlogsNav from './BlogsNav'
import Modal from './Modal'
import BlogForm from './BlogForm'

// const url = 'https://blogs-api-test.herokuapp.com/api'
// const url = 'http://localhost:5000/api'
const url = 'http://192.168.0.103:5000/api'

function Blogs() {
  const [activeBlog, setActiveBlog] = useState({})
  const [blogs, setBlogs] = useState([])
  const [showNewBlogModal, setShowNewBlogModal] = useState(false)
  const [showEditBlogModal, setShowEditBlogModal] = useState(false)
  const [errors, setErrors] = useState({})
  const fetchBlogs = async () => {
    const res = await axios.get(url)
    return res.data
  }
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${url}/${id}`)
      setBlogs(
        blogs.filter((blog) => {
          return id !== blog._id
        })
      )
    } catch (err) {
      setBlogs(await fetchBlogs())
    }
  }
  const toggleNewBlogModal = () => {
    if (showNewBlogModal) {
      setErrors({})
    }
    setShowNewBlogModal(!showNewBlogModal)
  }
  const toggleEditBlogModal = (blog) => {
    setActiveBlog(blog)
    setShowEditBlogModal(!showEditBlogModal)
  }
  const createNewBlog = async (e, blog) => {
    e.preventDefault()
    try {
      await axios.post(url, blog)
    } catch (err) {
      setErrors(err.response.data.errors)
      return
    }
    setErrors({})
    setShowNewBlogModal(false)
    const blogs = await fetchBlogs()
    setBlogs(blogs)
  }
  const updateBlog = async (e, blog) => {
    e.preventDefault()
    const res = await axios.put(`${url}/${blog._id}`, blog)
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
          <BlogForm blog={{}} onSubmitHandler={createNewBlog} errors={errors} />
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
