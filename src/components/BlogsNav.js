function BlogsNav({ newBlogOnClick }) {
  return (
    <div className="blogs-nav">
      <button
        className="blogs-nav__btn blogs-nav__btn--new"
        onClick={newBlogOnClick}
      >
        New blog
      </button>
    </div>
  )
}

export default BlogsNav
