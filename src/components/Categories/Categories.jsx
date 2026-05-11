import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import useCategories from '../../customHooks/useCategories'
import LoaderScreen from '../LoaderScreen/LoaderScreen'

export default function Categories() {
  const { data, isLoading } = useCategories()
  const allCategories = data?.data.data

  if (isLoading) return <LoaderScreen />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .cat-page { font-family: 'Outfit', sans-serif; }

        .cat-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #f3f4f6;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.22s, box-shadow 0.22s;
          cursor: pointer;
        }
        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }
        .cat-card:hover .cat-img {
          transform: scale(1.05);
        }
        .cat-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .cat-name {
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          padding: 12px 8px;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <div className="cat-page container mx-auto px-4 py-8">

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontSize: 'clamp(22px, 4vw, 30px)',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '4px',
          }}>All Categories</h1>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
            {allCategories?.length} categories available
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allCategories?.map(category => (
            <div key={category._id} className="cat-card">
              <div style={{ overflow: 'hidden' }}>
                <img
                  className="cat-img"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <p className="cat-name">{category.name}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
