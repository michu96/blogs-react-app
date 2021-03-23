function Blog({ blog, deleteBlog, editBlog }) {
  return (
    <div className="blog-card">
      <h2 className="blog-card__title">{blog.title || ''}</h2>
      <p className="blog-card__date">
        {new Date(blog.createdAt).toLocaleString('pl') || ''}
      </p>
      <p className="blog-card__short">{blog.shortDescription || ''}</p>
      <p className="blog-card__description">{blog.description || ''}</p>
      {blog.updatedAt !== blog.createdAt ? (
        <p className="blog-card__updated">
          {new Date(blog.updatedAt).toLocaleString('pl')}
        </p>
      ) : (
        <></>
      )}
      <p className="blog-card__author">{blog.author || ''}</p>
      <button
        className="blog-card__btn blog-card__btn--edit"
        onClick={() => editBlog(blog)}
      >
        Edit
      </button>
      <button
        className="blog-card__btn blog-card__btn--delete"
        onClick={() => {
          deleteBlog(blog._id)
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default Blog
