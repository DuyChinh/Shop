import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import axios from "axios";
import classes from "./ProductDetail.module.css"
import { FaShippingFast } from "react-icons/fa";
import toast from "react-hot-toast";
import img1 from "./img/img1.png";
const apiKey = import.meta.env.VITE_API_KEY;
import { useAuth0 } from "@auth0/auth0-react";
import Alert from "../Alert/Alert";
import Header from "../Header/Header";
import { FaExchangeAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Location from "../Location/Location"

function ProductDetail() {
    const { user, isAuthenticated} = useAuth0();
    // console.log(userId);
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const carts = useSelector((state) => state.carts);
    const [showLocation, setShowLocation] = useState(false);
    const dispatch = useDispatch();
    const showloca = useSelector((state) => state.showLocation);
    const address =  useSelector((state) => state.address);
    // setShowLocation(showloca);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${apiKey}/products/${id}`);
                // console.log(response);
                const data = response.data.data;
                setProduct(data);
            } catch (error) {
                // console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    },[]);

    useEffect(() => {
      setShowLocation(false);
      dispatch({
        type: "SHOW_LOCATION_STATUS",
        payload: true,
      })
    }, [showloca]);

    const handleAddCart = async (product) => {
      if(isAuthenticated) {
        product.customer_id = user.sub;
        const isProductInCart = carts.find((item) => item.product_id === product.id);
        const titles = product.title.split(" ");
        let titleProduct = "";
        for (let i = 0; i < 4; i++) {
          i === 3
            ? (titleProduct += titles[i] + "...")
            : (titleProduct += titles[i] + " ");
        }

        if (isProductInCart) {
          const productCart = isProductInCart;
          productCart.amount += 1;
          await axios
            .patch(`${apiKey}/carts/${productCart.id}`, productCart)
            .then((res) => {})
            .catch((error) => {
              console.error(error);
            });
        }

        toast.success(`Đã thêm ${titleProduct} vào giỏ hàng`);
        if (!isProductInCart) {
          dispatch({
            type: "Add_To_Cart",
            payload: product,
          });
        }
        let amount = isProductInCart?.amount || 1;
        const { id, customer_id, limit, price, price_old, src, title } = product;
        axios
          .post(`${apiKey}/carts`, {
            product_id: id,
            amount,
            customer_id,
            limit,
            price,
            price_old,
            src,
            title,
          })
          .then((res) => {
            // console.log("post cart", res);
          })
          .catch((error) => {
            // console.error(error);
          });
      }
      else {
        // alert("Bạn chưa đăng nhập!");
        setShowAlert(true);
        // return false;
      }
    };

    const handleShowLocation = () => {
      setShowLocation(true);
    }
  
    //Location

  return (
    <div>
      {showLocation ? <Location /> : ""}
      <Header />
      {showAlert ? <Alert /> : ""}
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.productContainer}>
          <img
            src={product.src}
            alt="img product"
            className={classes.productImg}
          />
          <div className={classes.productInfo}>
            <p className={classes.title}>{product.title}</p>

            <div className={classes.price}>
              <p
                style={{
                  textDecoration: "line-through",
                  color: "#ccc",
                }}
                className=""
              >
                {product.price_old.toLocaleString("vi-VN")}
                <span
                //   style={{
                //     color: "#FF512F",
                //   }}
                >
                  đ
                </span>
              </p>
              <p
                style={{
                  fontWeight: "500",
                  color: "#FF512F",
                  marginLeft: "15px",
                }}
                className=""
              >
                {product.price.toLocaleString("vi-VN")}
                <span style={{ fontSize: "1.4rem" }}>đ</span>
              </p>

              <p className={classes.bonus}>
                Giảm{" "}
                {Math.ceil(
                  ((product.price_old - product.price) / product.price_old) *
                    100
                )}
                %
              </p>
            </div>

            <div className={classes.productSale}>
              <p
                style={{
                  color: "#333",
                  width: "15%",
                  background: "transparent",
                }}
              >
                Mã giảm giá của shop
              </p>
              <div className={classes.sale}>
                <p>
                  Giảm 30k<sup>đ</sup>
                </p>
                <p>Giảm 10%</p>
                <p>Giảm 20%</p>
                <p>
                  Giảm 200k<sup>đ</sup>
                </p>
              </div>
            </div>

            <div className={classes.transport}>
              <p>Vận chuyển</p>
              <div style={{ marginLeft: "40px" }}>
                <div className="d-flex align-items-center">
                  <img
                    src={img1}
                    alt="icon freeship"
                    style={{
                      height: "30px",
                    }}
                  ></img>
                  <p style={{ marginLeft: "10px" }}>Miễn phí vận chuyển</p>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <FaShippingFast style={{ fontSize: "2.7rem" }} />
                  <div className="d-flex flex-column">
                    <div
                      className={`d-flex align-items-center ${classes.transportAddress}`}
                    >
                      <p style={{ marginTop: "0px", color: "#636363" }}>Vận chuyển tới</p>
                      <p
                        style={{ marginTop: "0px", cursor: "pointer" }}
                        onClick={handleShowLocation}
                      >
                        {address}{" "}
                        <span>
                          <FaExchangeAlt />
                        </span>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <p style={{ color: "#636363" }}>
                        Phí vận chuyển
                      </p>
                      <p
                        style={{
                        
                          fontWeight: "500",
                          color: "#FF512F",
                          marginLeft: "15px",
                        }}
                        className=""
                      >
                        0
                        <span style={{ fontSize: "1.2rem" }}>đ</span>
                        <FaChevronDown style={{color: "#333", fontSize: "1.1rem", marginLeft: "5px"}}/>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-3 d-flex align-items-center justify-content-between ${classes.btnAction}`}
            >
              <Link
                to={isAuthenticated ? "" : "/login"}
                className={classes.btnAddToCart}
                onClick={() => {
                  if (isAuthenticated) {
                    handleAddCart(product);
                  }
                }}
              >
                Thêm vào giỏ hàng
              </Link>

              <Link to={"/cart"} className={`${classes.btnBuy}`}>
                Mua Ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ProductDetail