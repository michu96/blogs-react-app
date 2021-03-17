function Blog({ blog }) {
  return (
    <div className="blog-card">
      <h2 className="blog-card__title">{blog.title || ''}</h2>
      <p className="blog-card__date">{blog.createdAt || ''}</p>
      <p className="blog-card__short">{blog.shortDescription || ''}</p>
      <p className="blog-card__description">{blog.description || ''}</p>
      <p className="blog-card__author">{blog.author || ''}</p>
    </div>
  )
}

export default Blog
