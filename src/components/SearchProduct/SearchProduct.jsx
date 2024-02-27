// import { useSelector } from "react-redux"
import Header from "../Header/Header"
import classes from "./SearchProduct.module.css"
import {Link} from "react-router-dom"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Loading from "../Loading/Loading";
const apiKey = import.meta.env.VITE_API_KEY;

function SearchProduct() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const productName = useParams().title;
  function removeAccents(text) {
     return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  useEffect(() => {
    const searchPro = async() => {
      try {
        const response = await axios.get(`${apiKey}/products`)
        const filteredProducts = response.data.data.filter((product) => {
          const title = DOMPurify.sanitize(product.title).toLowerCase();
          const sanitizedProductName =
            DOMPurify.sanitize(productName).toLowerCase();

          if (sanitizedProductName) {
            const searchTerms = sanitizedProductName
              .trim()
              .split(/\s+/)
              .map((term) => removeAccents(term)); // Chuyển đổi từ có dấu thành từ không dấu
            return searchTerms.every((term) =>
              removeAccents(title).includes(term)
            );
          }

          return false;
        });
        setProduct(filteredProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    searchPro();
  })
 
  return (
    <div>
      <Header/>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {products.length ? (
            <div className={classes.products}>
              {/* Hiển thị danh sách sản phẩm */}
              {products.map((product) => (
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
                        {/* Hiển thị giá và giá cũ */}
                        <p style={{ fontWeight: "500" }}>
                          {product.price.toLocaleString("vi-VN")}
                          <span
                            style={{ fontSize: "1.3rem", color: "#FF512F" }}
                          >
                            đ
                          </span>
                        </p>
                        <p
                          style={{
                            marginLeft: "8px",
                            fontSize: "1.5rem",
                            textDecoration: "line-through",
                          }}
                        >
                          {product.price_old.toLocaleString("vi-VN")}
                          <span style={{ color: "#FF512F" }}>đ</span>
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
          ) : (
            <div className={classes.notice}>
              <GoAlert style={{ color: "#FF9800", fontSize: "5rem" }} />
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchProduct