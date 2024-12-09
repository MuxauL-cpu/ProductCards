import React, { useEffect, useState } from "react";
import api from "../../utils/Api";
import "./App.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 6; // Товары на странице
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchProducts = () => {
    api
      .getProducts()
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        setError(`Ошибка при загрузке товаров: ${error}`);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / rowsPerPage);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h2 className="product-title">{product.title}</h2>
            <button className="like-button">Like</button>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="table__pagination">
        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={index + 1 === currentPage ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default App;
