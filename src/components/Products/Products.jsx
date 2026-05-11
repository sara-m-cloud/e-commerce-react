import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import LoaderScreen from '../LoaderScreen/LoaderScreen'
import toast from 'react-hot-toast'

function getAllProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}

export default function Products() {
  const { addProductToCart } = useContext(cartContext)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')

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

  // Derive unique categories
  const categories = allProducts
    ? ['All', ...new Set(allProducts.map(p => p.category.name))]
    : ['All']

  // Filter + sort
  let filtered = allProducts?.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = selectedCategory === 'All' || p.category.name === selectedCategory
    return matchSearch && matchCat
  }) ?? []

  if (sortBy === 'price-asc')  filtered = [...filtered].sort((a, b) => (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price))
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price))
  if (sortBy === 'rating')     filtered = [...filtered].sort((a, b) => b.ratingsAverage - a.ratingsAverage)

  if (isLoading) return <LoaderScreen />
  if (isError)   return <h2 className='text-center text-red-500 mt-10'>Error occurred while fetching products.</h2>

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .products-root { font-family: 'Outfit', sans-serif; }

        /* Search bar */
        .search-bar {
          width: 100%;
          padding: 11px 18px 11px 44px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          background: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          color: #111827;
        }
        .search-bar:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }
        .search-bar::placeholder { color: #9ca3af; }

        /* Category pills */
        .cat-pill {
          padding: 7px 16px;
          border-radius: 999px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          font-size: 13px;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.18s;
        }
        .cat-pill:hover { border-color: #10b981; color: #059669; }
        .cat-pill.active {
          background: linear-gradient(135deg, #10b981, #059669);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 3px 10px rgba(16,185,129,0.3);
        }

        /* Sort select */
        .sort-select {
          padding: 9px 14px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'Outfit', sans-serif;
          color: #374151;
          background: #fff;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .sort-select:focus { border-color: #10b981; }

        /* Product card */
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

        /* Empty state */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
          font-size: 15px;
        }

        /* Scrollbar for categories */
        .cats-scroll {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
          scrollbar-width: none;
        }
        .cats-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="products-root container mx-auto px-4 py-8">

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontSize: 'clamp(22px, 4vw, 30px)',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '4px',
          }}>
            All Products
          </h1>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>

          {/* Search + Sort */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <i className="fa-solid fa-magnifying-glass" style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af', fontSize: '13px',
              }} />
              <input
                type="text"
                className="search-bar"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Category pills */}
          <div className="cats-scroll">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-box-open" style={{ fontSize: '36px', marginBottom: '12px', display: 'block' }} />
              No products match your search.
            </div>
          ) : (
            filtered.map(product => {
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
            })
          )}
        </div>
      </div>
    </>
  )
}
