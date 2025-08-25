import Navbar from '../components/Navbar';
import { useAppContext } from '../context/UseAppContext';
import AdminBlogCard from '../components/AdminBlogCard';
import Footer from '../components/Footer';

function MyBlog() {
    const { blogs, user } = useAppContext();
    const userId = user?.userId;

    const myBlogs = blogs.filter(blog => blog.author === userId);

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <main className="flex-grow-1 py-5 bg-secondary bg-opacity-10">
                <div className="container py-3">
                    <div className="row g-4">
                        {myBlogs.length > 0 ? (
                            myBlogs.map((blog) => (
                                <div key={blog._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
                                    <AdminBlogCard blog={blog} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center text-muted">
                                <p>You haven’t posted any blogs yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default MyBlog;
