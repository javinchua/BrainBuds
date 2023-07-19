import { Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { Category, Fundraiser } from '@/utils/constants/constants'
import { Save } from '@mui/icons-material'

interface AddFundraiserFormProps {
  open: boolean
  handleClose: () => void
  fundraiser: Fundraiser
  handleFundraiserChange: (field: keyof Fundraiser, value: string) => void
  handleSave: () => void
  handleNewFundraiserImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  categories: Category[]
}

export const AddFundraiserForm: React.FC<AddFundraiserFormProps> = ({
  open,
  handleClose,
  fundraiser,
  handleFundraiserChange,
  handleSave,
  handleNewFundraiserImage,
  categories
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-white rounded-lg">
          <h2 className="mb-4 text-2xl font-bold">Add Fundraiser</h2>
          {/* Render the form inputs */}
          <TextField
            label="Name"
            value={fundraiser.name}
            onChange={(e) => handleFundraiserChange('name', e.target.value)}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Description"
            value={fundraiser.description}
            onChange={(e) => handleFundraiserChange('description', e.target.value)}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Goal Amount"
            value={fundraiser.goalAmount}
            onChange={(e) => handleFundraiserChange('goalAmount', e.target.value)}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={fundraiser.category}
              onChange={(e) => handleFundraiserChange('category', e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input type="file" accept="image/*" onChange={handleNewFundraiserImage} />

          {/* Display the selected image */}
          {fundraiser.file && (
            <div className="w-64 h-64 mt-4">
              <img
                src={URL.createObjectURL(fundraiser.file)}
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
