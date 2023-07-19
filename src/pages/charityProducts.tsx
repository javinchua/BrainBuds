import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material'
import { Edit, Save, Add } from '@mui/icons-material'
import { ProductEditing, Product, Category, userTypes } from '@/utils/constants/constants'
import { addNewProduct, getAllProductsFromCharity, updateProductInfo } from './api/product'
import { useAuth } from 'context/AuthContext'
import { AddProductForm } from '@/components/AddProduct'
import { fetchCategories } from './api/category'
import PrivateRoute from 'context/PrivateRoute'

const ProductListingPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductEditing[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const emptyProduct = {
    name: '',
    description: '',
    price: 0,
    editing: true,
    charityId: user.uid || '',
    image: '',
    category: '',
    id: '0',
    quantity: 0,
    numLikes: 0
  }
  const [newProduct, setNewProduct] = useState<Product>(emptyProduct)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setNewProduct(emptyProduct)
    setOpen(false)
  }

  const handleAddProduct = async () => {
    if (newProduct) {
      const result = await addNewProduct(newProduct)
      const addEditField = {
        ...result,
        editing: false
      }
      setProducts((prevProducts) => [...prevProducts, addEditField as ProductEditing])
      handleClose()
    }
  }

  const handleNewProductImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setNewProduct((prevProduct) => ({
      ...(prevProduct as Product),
      file: file
    }))
  }

  const handleProductImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setProducts((prevProducts) =>
      prevProducts.map((product, i) => (i === index ? { ...product, file: file } : product))
    )
  }
  const handleNewProductChange = (field: keyof Product, value: string) => {
    setNewProduct((prevProduct) => ({
      ...(prevProduct as Product),
      [field]: value
    }))
  }

  const handleEdit = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, editing: !product.editing } : product
      )
    )
  }

  const handleSave = async (index: number) => {
    const result = await handleSaveProduct(products[index])
    if (result != undefined) {
      setProducts((prevProducts) =>
        prevProducts.map((product, i) => (i === index ? result : product))
      )
    }
  }

  const handleProductChange = (index: number, field: keyof ProductEditing, value: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) => (i === index ? { ...product, [field]: value } : product))
    )
  }

  const handleSaveProduct = async (data: ProductEditing) => {
    if (user.uid) {
      const removedEditField = {
        id: data.id,
        name: data.name,
        category: data.category,
        description: data.description,
        charityId: data.charityId,
        price: data.price,
        image: data.image,
        quantity: data.quantity,
        createdAt: data.createdAt,
        numLikes: data.numLikes,
        ...(data.file && { file: data.file })
      }
      const res = await updateProductInfo(removedEditField)
      const addEditField = {
        ...res,
        editing: false
      }
      return addEditField as ProductEditing
    }
  }
  useEffect(() => {
    const retrieveInfo = async () => {
      if (user.uid) {
        setLoading(true)
        const data = await getAllProductsFromCharity(user.uid)
        if (data != null) {
          const editedData = data.map((info) => ({
            ...info,
            editing: false
          }))
          setProducts(editedData)
        }

        const categories = await fetchCategories()
        if (categories != null) {
          setCategories(categories)
        }
        setLoading(false)
      }
    }
    retrieveInfo()
  }, [user])

  return (
    <PrivateRoute allowedUserTypes={[userTypes.CHARITY]}>
      <section className="bg-gray-900">
        <div className="flex flex-col min-h-screen px-4 py-8">
          <div className="p-6 mx-auto rounded shadow w-[75%]">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h4" className="mb-4 text-white">
                Product Listings
              </Typography>
              <Button onClick={handleOpen} variant="contained" endIcon={<Add />}>
                Add Product
              </Button>
            </div>
            {loading ? (
              <CircularProgress /> // Render a loading indicator while data is being fetched
            ) : (
              <>
                {products.map((product, index) => {
                  return (
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
                            onChange={(e) =>
                              handleProductChange(index, 'description', e.target.value)
                            }
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
                          <TextField
                            label="Quantity"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            fullWidth
                            style={{ marginBottom: '1rem' }}
                          />
                          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                              labelId="category-label"
                              value={product.category}
                              onChange={(e) =>
                                handleProductChange(index, 'category', e.target.value)
                              }
                            >
                              {categories.map((category) => (
                                <MenuItem key={category.id} value={category.name}>
                                  {category.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => handleProductImageChange(index, e)}
                          />

                          {/* Display the selected image */}
                          {product.file ? (
                            <div className="mt-4">
                              <h3>Selected Image:</h3>
                              <div className="w-64 h-64">
                                <img
                                  src={URL.createObjectURL(product.file)}
                                  alt="Selected"
                                  className="object-cover rounded-md"
                                />
                              </div>
                            </div>
                          ) : product.image ? (
                            <div className="mt-4">
                              <h3>Selected Image:</h3>
                              <div className="w-64 h-64">
                                <img
                                  src={product.image}
                                  alt="Selected"
                                  className="object-cover rounded-md"
                                />
                              </div>
                            </div>
                          ) : null}

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
                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Name:
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                            {product.name}
                          </Typography>
                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Description:
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                            {product.description}
                          </Typography>
                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Category:
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                            {product.category}
                          </Typography>
                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Price:
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                            {product.price}
                          </Typography>
                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Quantity:
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                            {product.quantity}
                          </Typography>
                          {product.image ? (
                            <img className="mb-4" src={product.image} width={'400px'} />
                          ) : null}
                          {product.createdAt && (
                            <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                              Created At: {product.createdAt.toDate().toLocaleDateString()}
                            </Typography>
                          )}

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
                  )
                })}

                <AddProductForm
                  open={open}
                  handleClose={handleClose}
                  product={newProduct}
                  handleProductChange={handleNewProductChange}
                  handleSave={handleAddProduct}
                  handleNewProductImage={handleNewProductImage}
                  categories={categories}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </PrivateRoute>
  )
}

export default ProductListingPage
