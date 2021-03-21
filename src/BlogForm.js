import { useState } from 'react'

function BlogForm({ blog, onSubmitHandler }) {
  const [formBlog, setFormBlog] = useState(blog)
  return (
    <form className="blog-form" onSubmit={(e) => onSubmitHandler(e, formBlog)}>
      <div className="blog-form__form-group">
        <label htmlFor="blog-form-title" className="blog-form__label">
          Title
        </label>
        <input
          id="blog-form-title"
          type="text"
          name="title"
          defaultValue={blog.title || ''}
          required
          autoComplete="off"
          onChange={(e) => setFormBlog({ ...formBlog, title: e.target.value })}
        />
      </div>
      <div className="blog-form__form-group">
        <label htmlFor="blog-form-subtitle" className="blog-form__label">
          Subtitle
        </label>
        <input
          id="blog-form-subtitle"
          type="text"
          name="subtitle"
          defaultValue={blog.shortDescription || ''}
          autoComplete="off"
          onChange={(e) =>
            setFormBlog({ ...formBlog, shortDescription: e.target.value })
          }
        />
      </div>
      <div className="blog-form__form-group">
        <label htmlFor="blog-form-description" className="blog-form__label">
          Description
        </label>
        <textarea
          id="blog-form-description"
          name="description"
          cols="30"
          rows="10"
          defaultValue={blog.description || ''}
          required
          autoComplete="off"
          onChange={(e) =>
            setFormBlog({ ...formBlog, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className="blog-form__form-group">
        <label htmlFor="blog-form-author" className="blog-form__label">
          Author
        </label>
        <input
          id="blog-form-author"
          type="text"
          name="author"
          defaultValue={blog.author || ''}
          placeholder="Leave empty to be Anonymous"
          autoComplete="off"
          onChange={(e) => setFormBlog({ ...formBlog, author: e.target.value })}
        />
      </div>
      <button type="submit" className="blog-form__btn">
        Submit
      </button>
    </form>
  )
}

export default BlogForm
