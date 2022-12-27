import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { toggleBrand, toggleStock } from "../../features/filter/filterSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const filter = useSelector(state => state.filter)
  const {inStock, filters: { brands }} = filter;
  const dispatch = useDispatch();
  let filteredProducts = [];

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data.data))
  }, [])

  //Product filtering logics
  const getStockFiltered = (items) => items.filter(p => p.status);
  const getBrandFiltered = (items) => items.filter(p => brands.includes(p.brand));

  if(inStock && brands.length) {
    let stockFiltered = getStockFiltered(products);
    filteredProducts = getBrandFiltered(stockFiltered);
  } 
  else if(inStock) {
    filteredProducts = getStockFiltered(products);
  }
  else if(brands.length) {
    filteredProducts = getBrandFiltered(products);
  }
   else {
    filteredProducts = products;
  }

  const activeClass = "text-white  bg-indigo-500 border-white";

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className='mb-10 flex justify-end gap-5'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${inStock? activeClass : ""}`}
          onClick={() =>  dispatch(toggleStock())}
        >
          In Stock
        </button>
        <button 
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : ""}`}
          onClick={() =>  dispatch(toggleBrand("amd"))}
        >
          AMD
        </button>
        <button 
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeClass : ""}`}
          onClick={() =>  dispatch(toggleBrand("intel"))}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl gap-14 mx-auto my-10'>
        {filteredProducts.map(product => <ProductCard
          product={product} 
          key={product._id} 
        />)}
      </div>
    </div>
  );
};

export default Home;
