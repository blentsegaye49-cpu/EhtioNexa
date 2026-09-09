import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      <table>
         <thead>
            <tr>
            <th> First Name
          </th>
          <th>Last Name
         </th>
         <th> Id
         </th>
          <th>Section
         </th>
          <th> Course
         </th>
          </tr>
          </thead>
      </table>
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
         <table>
         <tr>
          <li>
            <td>{ blog.FirstName } </td>
          <td>{ blog.LastName }</td>
          <td>{blog.Id}</td>
           <td>{blog.Section}</td>
            <td>{blog.Course}</td>
          </li>
         </tr>
          
         </table>
           
             
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;