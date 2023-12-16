import React from "react";
import Layout from "../../components/Layout/Layout";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Link } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-2">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 20)}</p>
                  <p className="card-text">$ {p.price}</p>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Read More
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
