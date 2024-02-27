// import axios from "axios";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// const apiKey = import.meta.env.VITE_API_KEY;
import DOMPurify from "dompurify";
// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./SearchBar.module.css"

function SearchBar() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const title = useParams();
    const [productName, setProductName] = useState("");

    const handleChange = (e) => {
        const productName = e.target.value;
        setProductName(productName);
    }

    // function removeAccents(text) {
    //   return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        const sanitizedProductName = DOMPurify.sanitize(productName);
        navigate(`/search/${sanitizedProductName}`);
    }

  return (
    <form action="" onSubmit={handleSubmit} className={classes.form}>
      <input 
        className={classes.input}
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={productName}
        onChange={handleChange}
      />
      
        <button type="submit" className={classes.btnSearch}>
          <IoSearchSharp />
        </button>
 
    </form>
  );
}

export default SearchBar;
