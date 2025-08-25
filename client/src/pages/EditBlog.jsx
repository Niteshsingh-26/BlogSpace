import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import { useAppContext } from '../context/UseAppContext';
import toast from 'react-hot-toast';
import 'quill/dist/quill.snow.css';
import upload_area from '../assets/upload_area.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function EditBlog() {
    const blogCategories = ['All', 'Technology', 'Startup', 'Lifestyle', 'Finance'];
    const { id } = useParams();
    const navigate = useNavigate();
    const { axios, fetchBlogs } = useAppContext();

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [isUpdating, setIsUpdating] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('All');
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`/api/blog/${id}`);
                if (data.success) {
                    const blog = data.blog;
                    setTitle(blog.title);
                    setSubTitle(blog.subTitle);
                    setCategory(blog.category);
                    setCurrentImageUrl(blog.imageUrl);
                    quillRef.current.root.innerHTML = blog.description;
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Failed to fetch blog");
            }
        };

        fetchBlog();
    }, []);

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            });
        }
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
            };

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog));
            if (image) formData.append('image', image);

            const { data } = await axios.put(`/api/admin/updateBlog/${id}`, formData);
            if (data.success) {
                toast.success(data.message);
                navigate('/');
                fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <form
                    onSubmit={onSubmitHandler}
                    className="mx-auto bg-white p-4 p-md-5 rounded shadow"
                    style={{ maxWidth: '800px' }}
                >
                    {/* Upload Thumbnail */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Upload thumbnail</label>
                        <div className="mb-2">
                            <label htmlFor="image">
                                <img
                                    src={image ? URL.createObjectURL(image) : currentImageUrl || upload_area}
                                    alt="thumbnail"
                                    className="img-thumbnail"
                                    style={{
                                        height: '100px',
                                        width: '180px',
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                    }}
                                />
                                <input
                                    type="file"
                                    id="image"
                                    hidden
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Blog Title */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Blog title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type here"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Blog Subtitle */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Blog subtitle</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type here"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Blog Description */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Blog description</label>
                        <div
                            className="border rounded p-2"
                            ref={editorRef}
                            style={{ minHeight: '400px' }}
                        />
                    </div>

                    {/* Blog Category */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Blog category</label>
                        <select
                            className="form-select"
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="">Select category</option>
                            {blogCategories.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Blog"}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default EditBlog;
