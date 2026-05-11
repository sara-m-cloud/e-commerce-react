import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import LoaderScreen from '../LoaderScreen/LoaderScreen'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import toast from 'react-hot-toast'

function getAllProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}

export default function Home() {
  const { addProductToCart } = useContext(cartContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: getAllProducts,
  })

  const allProducts = data?.data.data

  async function handleAddProduct(e, id) {
    e.preventDefault()
    const res = await addProductToCart(id)
    if (res) {
      toast.success('Product Added Successfully', { duration: 3000, position: 'top-right' })
    } else {
      toast.error('Error adding product', { duration: 3000, position: 'top-right' })
    }
  }

  if (isLoading) return <LoaderScreen />
  if (isError) return <h2 className='text-center text-red-500 mt-10'>Error occurred while fetching products.</h2>

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .home-root { font-family: 'Outfit', sans-serif; }

        .product-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid #f3f4f6;
          transition: transform 0.22s, box-shadow 0.22s;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        .product-img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          display: block;
          background: #f9fafb;
          transition: transform 0.3s;
        }
        .product-card:hover .product-img { transform: scale(1.04); }

        .img-wrapper {
          overflow: hidden;
          position: relative;
        }

        .discount-badge {
          position: absolute;
          top: 10px; left: 10px;
          background: #ef4444;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.04em;
          font-family: monospace;
        }

        .add-btn {
          position: absolute;
          top: 10px; right: 10px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          color: #fff;
          font-size: 20px;
          font-weight: 300;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.7);
          transition: all 0.2s;
          box-shadow: 0 3px 10px rgba(16,185,129,0.4);
          line-height: 1;
        }
        .product-card:hover .add-btn {
          opacity: 1;
          transform: scale(1);
        }
        .add-btn:hover { transform: scale(1.1) !important; }

        .card-body { padding: 12px 14px 14px; }

        .card-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-cat {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 10px;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .rating {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; font-weight: 600; color: #f59e0b;
        }
        .price-orig { font-size: 11px; color: #f87171; text-decoration: line-through; }
        .price-final { font-size: 14px; font-weight: 700; color: #059669; }
        .price-normal { font-size: 14px; font-weight: 700; color: #111827; }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .section-title {
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700;
          color: #111827;
        }
        .view-all-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600;
          color: #059669;
          text-decoration: none;
          padding: 7px 16px;
          border: 1.5px solid #10b981;
          border-radius: 8px;
          transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
        }
        .view-all-btn:hover {
          background: #10b981;
          color: #fff;
        }
      `}</style>

      <div className="home-root container mx-auto px-4 py-6">

        {/* Sliders */}
        <div className="flex flex-col gap-5 mb-10">
          <HomeSlider />
          <CategoriesSlider />
        </div>

        {/* Section header */}
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '2px' }}>
              {allProducts?.length} products available
            </p>
          </div>
          <Link to="/Products" className="view-all-btn">
            View All
            <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px' }} />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allProducts?.map(product => {
            const discount = product.priceAfterDiscount
              ? Math.round((1 - product.priceAfterDiscount / product.price) * 100)
              : null

            return (
              <Link
                to={`/ProductDetails/${product._id}`}
                key={product._id}
                className="product-card"
              >
                <div className="img-wrapper">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="product-img"
                  />
                  {discount && (
                    <span className="discount-badge">-{discount}%</span>
                  )}
                  <button
                    className="add-btn"
                    onClick={(e) => handleAddProduct(e, product._id)}
                    title="Add to cart"
                  >+</button>
                </div>

                <div className="card-body">
                  <p className="card-title">
                    {product.title.split(' ').slice(0, 3).join(' ')}
                  </p>
                  <p className="card-cat">{product.category.name}</p>

                  <div className="card-footer">
                    <div className="rating">
                      <i className="fa-solid fa-star" style={{ fontSize: '11px' }} />
                      {product.ratingsAverage}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {product.priceAfterDiscount ? (
                        <>
                          <p className="price-orig">{product.price} EGP</p>
                          <p className="price-final">{product.priceAfterDiscount} EGP</p>
                        </>
                      ) : (
                        <p className="price-normal">{product.price} EGP</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </>
  )
}
