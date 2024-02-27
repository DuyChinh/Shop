import "./Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
function Footer() {
  return (
    <div
      className="footer"
      style={{
        background: "linear-gradient(105deg, #6e99e6, #093c94)",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-4 col-xs-12">
            <div className="single_footer">
              <h4>Chăm sóc khách hàng</h4>
              <ul>
                <li>
                  <a href="#">Trung Tâm Trợ Giúp</a>
                </li>
                <li>
                  <a href="#">Giao hàng tiết kiệm</a>
                </li>
                <li>
                  <a href="#">Hướng Dẫn Mua Hàng</a>
                </li>
                <li>
                  <a href="#">Hướng Dẫn Bán Hàng</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo hành</a>
                </li>
              </ul>
            </div>
          </div>
          {/*- END COL */}
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>Về Shop</h4>
              <ul>
                <li>
                  <a href="#">Điều khoản Shop</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="#">Tuyển dụng</a>
                </li>
                <li>
                  <a href="#">Chương trình liên kết vs Shop</a>
                </li>
                <li>
                  <a href="#">Liên hệ với truyền thông</a>
                </li>
              </ul>
            </div>
          </div>
          {/*- END COL */}
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>Liên hệ với chúng tôi</h4>
              <div className="signup_form">
                <form action="#" className="subscribe">
                  <input
                    type="text"
                    className="subscribe__input"
                    placeholder="Nhập Email của bạn"
                  />
                  <button type="button" className="subscribe__btn">
                    <i className="fas fa-paper-plane" />
                  </button>
                </form>
              </div>
            </div>
            <div className="social_profile">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/doanchinhit2102"
                    target="blank"
                  >
                    <FaFacebook style={{ fontSize: "2.5rem" }} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaTwitter style={{ fontSize: "2.5rem" }} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaInstagramSquare style={{ fontSize: "2.5rem" }} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaGooglePlusG style={{ fontSize: "2.5rem" }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/*- END COL */}
        </div>
        {/*- END ROW */}
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-xs-12">
            <p className="copyright">
              Copyright © 2024 <a href="#">Shop DC</a>.
            </p>
          </div>
          {/*- END COL */}
        </div>
        {/*- END ROW */}
      </div>
      {/*- END CONTAINER */}
    </div>
  );
}

export default Footer