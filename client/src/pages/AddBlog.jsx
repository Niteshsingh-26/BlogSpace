import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { useAppContext } from '../context/UseAppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import upload_area from '../assets/upload_area.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AddBlog() {

    const blogCategories = [
        "All",
        "Technology",
        "Startup",
        "Lifestyle",
        "Finance",
    ];

    const { axios, fetchBlogs } = useAppContext();
    const [isAdding, setIsAdding] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('all');

    const [loading, setLoading] = useState(false);

    const generateContent = async () => {
        if (!title) {
            toast.error('Please enter a title');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('/api/admin/generateContent', { prompt: title });

            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsAdding(true);

            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
            };

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog));
            formData.append('image', image);

            const { data } = await axios.post('/api/admin/add', formData);
            if (data.success) {
                toast.success(data.message);
                setImage(false);
                setTitle('');
                setSubTitle('');
                quillRef.current.root.innerHTML = '';
                setCategory('all');
                fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
    }, []);

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
                                    src={!image ? upload_area : URL.createObjectURL(image)}
                                    alt=""
                                    className="img-thumbnail"
                                    style={{ height: '100px', width: '180px', objectFit: 'cover', cursor: 'pointer' }}
                                />
                                <input
                                    type="file"
                                    id="image"
                                    hidden
                                    onChange={e => setImage(e.target.files[0])}
                                    required
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
                            onChange={e => setTitle(e.target.value)}
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
                            onChange={e => setSubTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Blog Description */}
                    <div className="mb-4 position-relative">
                        <label className="form-label fw-bold">Blog Description</label>
                        <div
                            className="border rounded p-2"
                            ref={editorRef}
                            style={{ minHeight: '400px' }}
                        ></div>
                        {loading && (
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-50">
                                <div className="spinner-border text-dark" role="status"></div>
                            </div>
                        )}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={generateContent}
                            className="btn btn-sm btn-dark position-absolute bottom-0 end-0 m-2"
                        >
                            Generate with AI
                        </button>
                    </div>

                    {/* Blog Category */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Blog category</label>
                        <select
                            className="form-select"
                            name="category"
                            onChange={e => setCategory(e.target.value)}
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
                            disabled={isAdding}
                        >
                            {isAdding ? "Adding..." : "Add Blog"}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default AddBlog;
