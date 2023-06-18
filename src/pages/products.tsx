import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import { Product } from '@/utils/constants/constants'

const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  const handleEdit = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, editing: !product.editing } : product
      )
    )
  }

  const handleSave = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) => (i === index ? { ...product, editing: false } : product))
    )
  }

  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) => (i === index ? { ...product, [field]: value } : product))
    )
  }

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col min-h-screen px-4 py-8">
        <div className="p-6 mx-auto rounded shadow w-[75%]">
          <Typography variant="h4" className="mb-4 text-white">
            Product Listings
          </Typography>
          {products.map((product, index) => (
            <div
              key={index}
              className={`m-4 mx-auto border-gray-600 text-white border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
            >
              {product.editing ? (
                <>
                  <TextField
                    label="Name"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                  />
                  <TextField
                    label="Description"
                    value={product.description}
                    onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    style={{ marginBottom: '1rem' }}
                  />
                  <TextField
                    label="Price"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                  />
                  <Button
                    onClick={() => handleSave(index)}
                    variant="contained"
                    endIcon={<Save />}
                    style={{ marginBottom: '1rem' }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                    Name:
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                    Description:
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                    Price:
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                    {product.price}
                  </Typography>
                  <Button
                    onClick={() => handleEdit(index)}
                    variant="contained"
                    endIcon={<Edit />}
                    style={{ marginBottom: '1rem' }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          ))}
          {/* <Button
            onClick={() =>
              setProducts((prevProducts) => [
                ...prevProducts,
                { name: '', description: '', price: '', editing: true }
              ])
            }
            variant="contained"
            endIcon={<Add />}
          >
            Add Product
          </Button> */}
        </div>
      </div>
    </section>
  )
}

export default ProductListingPage
