import { Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { Category, Product } from '@/utils/constants/constants'
import { Save } from '@mui/icons-material'

interface AddProductFormProps {
  open: boolean
  handleClose: () => void
  product: Product
  handleProductChange: (field: keyof Product, value: string) => void
  handleSave: () => void
  handleNewProductImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  categories: Category[]
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  open,
  handleClose,
  product,
  handleProductChange,
  handleSave,
  handleNewProductImage,
  categories
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-white rounded-lg">
          <h2 className="mb-4 text-2xl font-bold">Add Product</h2>
          {/* Render the form inputs */}
          <TextField
            label="Name"
            value={product.name}
            onChange={(e) => handleProductChange('name', e.target.value)}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Description"
            value={product.description}
            onChange={(e) => handleProductChange('description', e.target.value)}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Price"
            value={product.price}
            type="number"
            onChange={(e) => handleProductChange('price', e.target.value)}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={product.category}
              onChange={(e) => handleProductChange('category', e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            value={product.quantity}
            type="number"
            onChange={(e) => handleProductChange('quantity', e.target.value)}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <input type="file" accept="image/*" onChange={handleNewProductImage} />

          {/* Display the selected image */}
          {product.file && (
            <div className="w-64 h-64 mt-4">
              <img
                src={URL.createObjectURL(product.file)}
                alt="Selected"
                className="object-cover rounded-md"
              />
            </div>
          )}

          {/* Button */}
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSave} endIcon={<Save />}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
