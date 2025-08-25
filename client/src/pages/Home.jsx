import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/UseAppContext";
import { useRef, useState } from "react";
import BlogCard from "../components/BlogCard";

const Home = () => {
    const blogCategories = [
        "All",
        "Technology",
        "Startup",
        "Lifestyle",
        "Finance",
    ];
    const { blogs } = useAppContext();
    const [input, setInput] = useState("");
    const inputRef = useRef();
    const [menu, setMenu] = useState("All");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setInput(inputRef.current.value);
    };

    const onClear = () => {
        setInput("");
        inputRef.current.value = "";
    };

    const filteredBlogs = () => {
        const keyword = input.toLowerCase();
        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(keyword) ||
                blog.category.toLowerCase().includes(keyword)
        );
    };

    const displayedBlogs = filteredBlogs().filter((blog) =>
        menu === "All" ? true : blog.category === menu
    );

    return (
        // Parent flex container
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            {/* Main content grows to fill space */}
            <main className="flex-grow-1">
                {/* Hero Section */}
                <div className="container my-5">
                    <div className="text-center mt-5">
                        <span className="badge bg-primary-subtle text-primary mb-3 px-4 py-2 rounded-pill">
                            New: AI feature integrated
                        </span>
                        <h1 className="fw-bold display-5 text-dark">
                            Your own blogging <br /> platform.
                        </h1>
                        <p
                            className="text-secondary mt-3 mx-auto"
                            style={{ maxWidth: "700px" }}
                        >
                            This is your platform to speak freely—share your ideas,
                            experiences, and insights without limits. Whether it’s a single
                            thought or a full-length story, your journey starts here.
                        </p>

                        {/* Search Bar */}
                        <form
                            onSubmit={onSubmitHandler}
                            className="d-flex justify-content-center mt-4 gap-2"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for blogs"
                                required
                                className="form-control w-50"
                            />
                            <button type="submit" className="btn btn-primary px-4">
                                Search
                            </button>
                        </form>

                        {/* Clear Button */}
                        {input && (
                            <button
                                onClick={onClear}
                                className="btn btn-sm btn-outline-secondary mt-3"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="container my-5 text-center">
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {blogCategories.map((item) => (
                            <button
                                key={item}
                                onClick={() => setMenu(item)}
                                className={`btn rounded-pill ${menu === item ? "btn-primary" : "btn-outline-secondary"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Cards */}
                <div className="container mb-5">
                    <div className="row g-4">
                        {displayedBlogs.map((blog) => (
                            <div className="col-12 col-md-6 col-lg-4" key={blog._id}>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                        {displayedBlogs.length === 0 && (
                            <div className="text-center text-secondary my-5">
                                No blogs found.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer stays at bottom */}
            <Footer />
        </div>
    );
};

export default Home;
