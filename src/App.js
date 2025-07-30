import { useEffect, useState } from "react";
import "./styles.css";

const page = 8;

export default function App() {
  const ProductsCard = ({ image, title }) => {
    return (
      <div className="products-image">
        <img src={image} alt={title}></img>
        <p>{title}</p>
      </div>
    );
  };

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  //calculate page
  const totalproduct = products.length;
  const pages = Math.ceil(totalproduct / page);

  const start = currentPage * page;
  const end = start + page;

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    json.products;
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return !products.length ? (
    <h1>NO Products Found</h1>
  ) : (
    <div className="App">
      <h1>PAGINATION</h1>
      <div className="pagination">
        <button
          disabled={currentPage === 0}
          className="left"
          onClick={() => prevPage()}
        >
          ⮜
        </button>
        {[...Array(pages).keys()].map((n) => (
          <button
            key={n}
            className={`page-number ${n === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(n)}
          >
            {n + 1}
          </button>
        ))}
        <button
          disabled={currentPage === pages - 1}
          className="right"
          onClick={() => nextPage()}
        >
          ⮞
        </button>
      </div>
      <div className="card-container">
        {products.slice(start, end).map((p) => (
          <ProductsCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}
