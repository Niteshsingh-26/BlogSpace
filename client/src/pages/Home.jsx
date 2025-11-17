import { useEffect, useState } from "react";
import { useAppContext } from "../context/UseAppContext";    //for axios only
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

const Home = () => {
    const categories = ["All", "Technology", "Startup", "Lifestyle", "Finance"];
    const { axios } = useAppContext();

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(false);


    // Fetch blogs from backend
    const fetchBlogs = async () => {
        try {
            setLoading(true);

            const params = {};
            if (search.trim()) params.search = search;
            if (category !== "All") params.category = category;

            const { data } = await axios.get("/api/blog", { params });
            setBlogs(data.blogs);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch blogs on search/category change
    useEffect(() => {
        fetchBlogs();
    }, [search, category]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>

            <main className="flex-grow-1">
                {/* Hero Section */}
                <div className="container my-5">
                    <div className="text-center mt-5">

                        <h1 className="fw-bold display-5">
                            Your own blogging <br /> platform.
                        </h1>

                        <p className="text-secondary mt-3 mx-auto" style={{ maxWidth: "700px" }}>
                            This is your platform to speak freely—share ideas,
                            experiences, and insights without limits.
                        </p>

                        {/* Search Bar */}
                        <div className="d-flex justify-content-center mt-4 gap-2">
                            <input
                                type="text"
                                placeholder="Search for blogs"
                                className="form-control w-50"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                onClick={() => setSearch("")}
                                className="btn btn-outline-secondary px-3"
                                disabled={!search}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="container my-5 text-center">
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`btn ${
                                    category === cat ? "btn-primary" : "btn-secondary"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Cards */}
                <div className="container mb-5">
                    {loading ? (
                        <h2>Loading blogs...</h2>
                    ) : blogs.length === 0 ? (
                        <h2>No blogs found.</h2>
                    ) : (
                        <div className="row g-4">
                            {blogs.map((blog) => (
                                <div className="col-12 col-md-6 col-lg-4" key={blog._id}>
                                    <BlogCard blog={blog} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
