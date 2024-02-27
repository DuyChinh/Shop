import { useState, useEffect } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";
import classes from "./Product.module.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import SimpleSlider from "../Slider/Slider";
import Header from "../Header/Header";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const apiKey = import.meta.env.VITE_API_KEY;

function Products() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage*recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  // console.log(records);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  // console.log(numbers);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiKey}/products`
        );
        // console.log(response);
        const data = response.data.data;
        setData(data);
      } catch (error) {
        // console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  },[]);

  const prePage = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const changeCPage = (id) => {
    setCurrentPage(id);
  }

  return (
    <div>
      <Header />
      <SimpleSlider />
      {/* <h1>Products</h1> */}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={classes.products}>
            {records.map((product) => (
              <div key={product.id} className={classes.productItem}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.src}
                    alt="img-product"
                    className={classes.productImg}
                  />
                  <div className={classes.info}>
                    <p className={classes.title}>{product.title}</p>
                    <div className={classes.price}>
                      <p style={{ fontWeight: "500" }} className="">
                        {product.price.toLocaleString("vi-VN")}
                        <span style={{ fontSize: "1.3rem", color: "#FF512F" }}>
                          đ
                        </span>
                      </p>

                      <p
                        style={{
                          marginLeft: "8px",
                          fontSize: "1.5rem",
                          textDecoration: "line-through",
                        }}
                        className=""
                      >
                        {product.price_old.toLocaleString("vi-VN")}
                        <span
                          style={{
                            color: "#FF512F",
                          }}
                        >
                          đ
                        </span>
                      </p>
                    </div>
                    <button className={classes.btnAddCart}>
                      <MdOutlineAddShoppingCart />
                      Mua Ngay
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <nav>
            <ul className={`pagination ${classes.pagination}`}>
              <li className="page-item">
                <button
                  className="page-link page-prev"
                  onClick={prePage}
                  style={{
                    fontSize: "1.6rem",
                    background: currentPage == 1 ? "#FF8008" : "",
                  }}
                >
                  <FaArrowCircleLeft style={{ fontSize: "2rem" }} />
                </button>
              </li>
              {numbers.map((n, i) => {
                if (
                  n === 1 ||
                  n === npage ||
                  (n >= currentPage - 1 && n <= currentPage + 1)
                ) {
                  return (
                    <li
                      className={`page-item ${
                        currentPage === n ? "active" : ""
                      }`}
                      key={i + 1}
                    >
                      <button
                        className="page-link"
                        onClick={() => changeCPage(n)}
                        style={{ fontSize: "1.6rem" }}
                      >
                        {n}
                      </button>
                    </li>
                  );
                } else if (
                  (n === currentPage - 2 && currentPage > 3) ||
                  (n === currentPage + 2 && currentPage < npage - 2)
                ) {
                  return (
                    <li className="page-item" key={i + 1}>
                      <button
                        className="page-link"
                        style={{ fontSize: "1.6rem" }}
                      >
                        ...
                      </button>
                    </li>
                  );
                }
                return null;
              })}

              <li className="page-item">
                <button
                  className="page-link"
                  onClick={nextPage}
                  style={{
                    fontSize: "1.6rem",
                    background: currentPage === npage ? "#FF8008" : ""
                  }}
                >
                  <FaArrowCircleRight
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Products;