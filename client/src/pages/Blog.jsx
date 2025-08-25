import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useAppContext } from "../context/UseAppContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Blog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            data.success ? setData(data.blog) : console.error(data.message);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    return data ? (
        <>
            <Navbar />

            {/* Header Section */}
            <div className="container my-5 text-center">
                <p className="text-primary fw-medium mb-2">
                    Published on {moment(data.createdAt).format("MMMM Do YYYY")}
                </p>

                <h3 className="fs-1 fw-bold text-dark mb-3">
                    {data.title}
                </h3>

                <h5 className="text-muted fst-italic mb-3">
                    {data.subTitle}
                </h5>

                <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                    {data.author.name}
                </span>
            </div>

            {/* Image and Description */}
            <div className="container mb-5">
                <img
                    src={data.image}
                    alt={data.title}
                    className="img-fluid rounded-4 mb-4 mx-auto d-block"
                    style={{ maxWidth: "700px", objectFit: "cover" }}
                />

                <div
                    className="mx-auto"
                    style={{ maxWidth: "850px", fontSize: "1.05rem", lineHeight: "1.8" }}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />
            </div>

            <Footer />
        </>
    ) : (
        <Loader />
    );
};

export default Blog;
