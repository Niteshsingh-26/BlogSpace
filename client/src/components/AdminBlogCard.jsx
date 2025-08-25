import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/UseAppContext';
import toast from 'react-hot-toast';

const AdminBlogCard = ({ blog }) => {
    const { axios, fetchBlogs } = useAppContext();
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editBlog/${_id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const { data } = await axios.post(`/api/admin/deleteBlog/${_id}`);
            if (data.success) {
                fetchBlogs(); // Refresh blog list after deletion
                toast.success("Blog deleted successfully");
                navigate(`/myBlog`);
            } else {
                console.error(data.message);
                toast.error(`Failed to delete blog: ${data.message}`);
            }
        }
    };

    return (
        <div className="card w-100 h-100 border shadow-sm d-flex flex-column">
            <img
                onClick={() => navigate(`/blog/${_id}`)}
                src={image}
                alt="Blog cover"
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover', cursor: 'pointer' }}
            />

            <div className="card-body d-flex flex-column">
                <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">
                    {category}
                </span>

                <h5 className="card-title text-truncate" title={title}>
                    {title.length > 60 ? title.slice(0, 60) + '...' : title}
                </h5>

                <p
                    className="card-text small text-muted"
                    dangerouslySetInnerHTML={{
                        __html:
                            description.length > 100
                                ? description.slice(0, 100) + '...'
                                : description,
                    }}
                ></p>

                <div className="mt-auto d-flex justify-content-between gap-2">
                    <button
                        onClick={handleEdit}
                        className="btn btn-sm btn-primary w-50"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-sm btn-danger w-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogCard;
