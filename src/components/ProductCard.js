import React from "react";
import { BiListPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

const ProductCard = ({ product, isInCart }) => {
  const dispatch = useDispatch();
  return (
    <div
      className='shadow-lg rounded-3xl border relative  p-3 flex flex-col text-indigo-900'
      key={product._id}
    >
      {isInCart && (
        <div className="flex justify-between">
          <div>
            <h3>{`Added on: ${product.dateTime?.toLocaleString("en-US")}`}</h3>
          </div>
          <div 
            className="bg-indigo-500 text-white rounded-md px-2"> 
            {product.quantity}
          </div>
        </div>
      )}
      <div className='h-52 w-52 mx-auto'>
        <img src={product.image} alt={product.model} />
      </div>
      <h1 className='font-bold text-center'>{product.model}</h1>
      <p className='text-center font-semibold mb-3'>Rating: {product.rating}</p>
      <div className=' flex-1'>
        <ul className='space-y-2'>
          {product.keyFeature.map((feature, index) => {
            return <li key={index} className='text-sm '>{feature}</li>;
          })}
        </ul>
      </div>
      {isInCart ? (
          <div className='flex justify-center max-w-xs pt-5'>
            <div className='flex justify-between items-center gap-2 '>
              <button 
                className={`${product.quantity === 1? "bg-red-500": "bg-indigo-500"} text-lg text-white rounded h-10 w-10`}
                onClick={() => dispatch(removeFromCart(product))}
              >
                -
              </button>
              <div className='border flex-1 flex justify-center items-center h-10 w-20 rounded-md border-gray-300'>
                <span className='text-lg'>
                  { product.quantity }
                </span>
              </div>
              <button 
                className='bg-indigo-500 text-lg text-white rounded h-10 w-10'
                onClick={() => dispatch(addToCart(product))}
              >
                +
              </button>
            </div>
        </div>
        ) :  (
          <div className='flex gap-2'>
            <button 
              className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold'
              onClick={() => dispatch(addToCart(product))}
            >
              Add to cart
            </button>
            <button
              title='Add to wishlist'
              className='bg-indigo-500  py-1 px-2 rounded-full'
            >
              <BiListPlus className='text-white' />
            </button>
          </div>
      )}
    </div>
  );
};

export default ProductCard;
