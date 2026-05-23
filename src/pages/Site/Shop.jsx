import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import bgImage from "../../assets/bgImage.png";

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activePage, setActivePage] = useState(0);

  const productsPerPage = 6;

  useEffect(() => {
    fetch("https://elwafastore.premiumasp.net/api/Service/GetAll")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);

        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get("category");

        if (
          categoryFromUrl &&
          data.some((cat) => String(cat.id) === categoryFromUrl)
        ) {
          setActiveCategoryId(Number(categoryFromUrl));
        } else if (data.length > 0) {
          setActiveCategoryId(data[0].id);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, [location.search]);

  useEffect(() => {
    fetch("https://elwafastore.premiumasp.net/api/Product/GetAll")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  const filteredProducts = products.filter(
    (p) => p.serviceId === activeCategoryId
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const displayedProducts = filteredProducts.slice(
    activePage * productsPerPage,
    (activePage + 1) * productsPerPage
  );

  const handlePrev = () => {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  const handleNext = () => {
    setActivePage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const navigator = (product) => {
    navigate("/product-details", {
      state: {
        name: product.name,
        rating: product.rating ?? 0,
        itemCode: product.id,
        length: product.length,
        width: product.width,
        thickness: product.thickness,
        img: product.pictureUrl,
        category: categories.find((c) => c.id === product.serviceId)?.name,
        allCategoryProducts: filteredProducts,
        details: product.details,
      },
    });
  };

  const handleCategoryClick = (catId) => {
    if (catId === activeCategoryId) return;
    setActiveCategoryId(catId);
    setActivePage(0);

    navigate(`/shop?category=${catId}`, { replace: true });
  };

  return (
    <div className="mt-20 mb-20 font-sans">
      {/* Hero Section */}
      <div className="w-full flex justify-center items-center relative">
        <img src={bgImage} alt="Services" className="w-full h-24 md:h-72" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute text-white text-4xl md:text-6xl font-bold px-4 md:px-8 py-2 md:py-4 rounded-md"
        >
          Shop
        </motion.h1>
      </div>

      <h2 className="text-4xl font-bold text-center mt-12 mb-8 select-none">
        {categories.find((c) => c.id === activeCategoryId)?.name || ""}
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex flex-col gap-4 space-y-10 w-1/4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`cursor-pointer py-3 px-4 rounded-sm text-center font-semibold transition-colors duration-200 ${
                activeCategoryId === cat.id
                  ? "bg-[#264978] text-white"
                  : "bg-[#D9D9D9] text-black hover:bg-[#aec3d9]"
              }`}
              onClick={() => handleCategoryClick(cat.id)}
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && handleCategoryClick(cat.id)
              }
            >
              {cat.name}
            </div>
          ))}
        </aside>

        {/* Horizontal categories mobile */}
        <nav
          className="flex md:hidden overflow-x-auto gap-4 px-4 py-3 bg-gray-100 rounded-md mb-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          aria-label="Categories"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`flex-shrink-0 py-2 px-5 rounded-sm font-semibold whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#264978] ${
                activeCategoryId === cat.id
                  ? "bg-[#264978] text-white"
                  : "bg-[#D9D9D9] text-black hover:bg-[#aec3d9]"
              }`}
              onClick={() => handleCategoryClick(cat.id)}
              aria-current={activeCategoryId === cat.id ? "true" : undefined}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Products grid */}
        <section className="w-full md:w-3/4">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={activeCategoryId + "-" + activePage}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              aria-live="polite"
            >
              {displayedProducts.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  No products available in this category.
                </p>
              ) : (
                displayedProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    className="flex flex-col items-center bg-white p-4 rounded-md shadow-md"
                    tabIndex={0}
                    aria-label={`${product.name} product`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") navigator(product);
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      onClick={() => navigator(product)}
                      src={product.pictureUrl}
                      alt={product.name}
                      className="w-full object-cover rounded-md cursor-pointer"
                      loading="lazy"
                    />

                    <h3 className="mt-4 font-semibold text-lg text-gray-900">
                      {product.name}
                    </h3>

                    <div className="mt-2 mb-6 text-sm text-[#264978] font-semibold text-center space-y-2 ">
                      <p>
                        <span className="text-gray-600">Item Code:</span>{" "}
                        {product.id}
                      </p>
                      {product.width && (
                        <p>
                          <span className="text-gray-600">Width:</span>{" "}
                          {product.width}
                        </p>
                      )}
                      {product.length && (
                        <p>
                          <span className="text-gray-600">Length:</span>{" "}
                          {product.length}
                        </p>
                      )}
                      {product.thickness && (
                        <p>
                          <span className="text-gray-600">Thickness:</span>{" "}
                          {product.thickness}
                        </p>
                      )}
                    </div>
                  </motion.article>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-12 gap-6">
            <button
              aria-label="Previous page"
              className="p-3 rounded-full border border-[#264978] text-[#264978] font-bold hover:bg-[#264978] hover:text-white transition-colors"
              onClick={handlePrev}
              disabled={totalPages === 0}
            >
              <FiArrowLeft />
            </button>
            <p className="font-semibold text-lg select-none">
              Page {activePage + 1} of {totalPages || 1}
            </p>
            <button
              aria-label="Next page"
              className="p-3 rounded-full border border-[#264978] text-[#264978] font-bold hover:bg-[#264978] hover:text-white transition-colors"
              onClick={handleNext}
              disabled={totalPages === 0}
            >
              <FiArrowRight />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
