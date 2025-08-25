import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate();

    return (
        <div
            className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden cursor-pointer"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/blog/${_id}`)}
        >
            {/* Blog Image */}
            <img
                src={image}
                alt={title}
                className="card-img-top object-fit-cover"
                style={{ aspectRatio: '16/9', objectFit: 'cover' }}
            />

            {/* Category Label */}
            <div className="px-4 pt-3">
                <span className="badge bg-primary-subtle text-primary fw-medium rounded-pill px-3 py-1">
                    {category}
                </span>
            </div>

            {/* Blog Content */}
            <div className="card-body" style={{ minHeight: '200px' }}>
                <h5 className="card-title fw-semibold text-dark">{title}</h5>
                <p
                    className="card-text text-muted small"
                    dangerouslySetInnerHTML={{
                        __html:
                            description.length > 160
                                ? description.slice(0, 160) + '...'
                                : description,
                    }}
                />
            </div>
        </div>
    );
};

export default BlogCard;
