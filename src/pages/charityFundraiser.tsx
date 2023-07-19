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
import FundraiserEditing, { Fundraiser, Category, userTypes } from '@/utils/constants/constants'
import {
  addNewFundraiser,
  getAllFundraisersFromCharityId,
  updateFundraiserInfo
} from './api/fundraiser'
import { useAuth } from 'context/AuthContext'
import { AddFundraiserForm } from '@/components/AddFundraiser'
import { fetchCategories } from './api/category'
import PrivateRoute from 'context/PrivateRoute'

const FundraiserListingPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [fundraisers, setFundraisers] = useState<FundraiserEditing[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const emptyFundraiser = {
    id: '',
    name: '',
    description: '',
    goalAmount: 0,
    curAmount: 0,
    image: '',
    charityId: user.uid || '',
    category: ''
  }
  const [newFundraiser, setNewFundraiser] = useState<Fundraiser>(emptyFundraiser)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setNewFundraiser(emptyFundraiser)
    setOpen(false)
  }

  const handleAddFundraiser = async () => {
    if (newFundraiser) {
      const result = await addNewFundraiser(newFundraiser)
      const addEditField = {
        ...result,
        editing: false
      }
      setFundraisers((prevFundraisers) => [...prevFundraisers, addEditField as FundraiserEditing])
      handleClose()
    }
  }

  const handleNewFundraiserImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setNewFundraiser((prevFundraiser) => ({
      ...(prevFundraiser as Fundraiser),
      file: file
    }))
  }

  const handleFundraiserImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    setFundraisers((prevFundraisers) =>
      prevFundraisers.map((fundraiser, i) =>
        i === index ? { ...fundraiser, file: file } : fundraiser
      )
    )
  }
  const handleNewFundraiserChange = (field: keyof Fundraiser, value: string) => {
    setNewFundraiser((prevFundraiser) => ({
      ...(prevFundraiser as Fundraiser),
      [field]: value
    }))
  }

  const handleEdit = (index: number) => {
    setFundraisers((prevFundraisers) =>
      prevFundraisers.map((fundraiser, i) =>
        i === index ? { ...fundraiser, editing: !fundraiser.editing } : fundraiser
      )
    )
  }

  const handleSave = async (index: number) => {
    const result = await handleSaveFundraiser(fundraisers[index])
    if (result != undefined) {
      setFundraisers((prevFundraisers) =>
        prevFundraisers.map((fundraiser, i) => (i === index ? result : fundraiser))
      )
    }
  }

  const handleFundraiserChange = (index: number, field: keyof FundraiserEditing, value: string) => {
    setFundraisers((prevFundraisers) =>
      prevFundraisers.map((fundraiser, i) =>
        i === index ? { ...fundraiser, [field]: value } : fundraiser
      )
    )
  }

  const handleSaveFundraiser = async (data: FundraiserEditing) => {
    if (user.uid) {
      const removedEditField = {
        id: data.id,
        name: data.name,
        description: data.description,
        goalAmount: data.goalAmount,
        curAmount: data.curAmount,
        image: data.image,
        charityId: data.charityId,
        category: data.category,
        createdAt: data.createdAt,
        ...(data.file && { file: data.file })
      }
      const res = await updateFundraiserInfo(removedEditField)
      const addEditField = {
        ...res,
        editing: false
      }
      return addEditField as FundraiserEditing
    }
  }
  useEffect(() => {
    const retrieveInfo = async () => {
      if (user.uid) {
        setLoading(true)
        const data = await getAllFundraisersFromCharityId(user.uid)
        if (data != null) {
          const editedData = data.map((info) => ({
            ...info,
            editing: false
          }))
          setFundraisers(editedData)
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
                Fundraiser Listings
              </Typography>
              <Button onClick={handleOpen} variant="contained" endIcon={<Add />}>
                Add Fundraiser
              </Button>
            </div>
            {loading ? (
              <CircularProgress /> // Render a loading indicator while data is being fetched
            ) : (
              <>
                {fundraisers.map((fundraiser, index) => {
                  return (
                    <div
                      key={index}
                      className={`m-4 mx-auto border-gray-600 text-white border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
                    >
                      {fundraiser.editing ? (
                        <>
                          <TextField
                            label="Name"
                            value={fundraiser.name}
                            onChange={(e) => handleFundraiserChange(index, 'name', e.target.value)}
                            fullWidth
                            style={{ marginBottom: '1rem' }}
                          />
                          <TextField
                            label="Description"
                            value={fundraiser.description}
                            onChange={(e) =>
                              handleFundraiserChange(index, 'description', e.target.value)
                            }
                            fullWidth
                            multiline
                            rows={4}
                            style={{ marginBottom: '1rem' }}
                          />
                          <TextField
                            label="Goal"
                            value={fundraiser.goalAmount}
                            onChange={(e) =>
                              handleFundraiserChange(index, 'goalAmount', e.target.value)
                            }
                            fullWidth
                            style={{ marginBottom: '1rem' }}
                          />
                          <TextField
                            label="Current"
                            value={fundraiser.curAmount}
                            onChange={(e) =>
                              handleFundraiserChange(index, 'curAmount', e.target.value)
                            }
                            fullWidth
                            style={{ marginBottom: '1rem' }}
                          />
                          <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                              labelId="category-label"
                              value={fundraiser.category}
                              onChange={(e) =>
                                handleFundraiserChange(index, 'category', e.target.value)
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
                            onChange={(e) => handleFundraiserImageChange(index, e)}
                          />

                          {/* Display the selected image */}
                          {fundraiser.file ? (
                            <div className="mt-4">
                              <h3>Selected Image:</h3>
                              <div className="w-64 h-64">
                                <img
                                  src={URL.createObjectURL(fundraiser.file)}
                                  alt="Selected"
                                  className="object-cover rounded-md"
                                />
                              </div>
                            </div>
                          ) : fundraiser.image ? (
                            <div className="mt-4">
                              <h3>Selected Image:</h3>
                              <div className="w-64 h-64">
                                <img
                                  src={fundraiser.image}
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
                            {fundraiser.name}
                          </Typography>
                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Description:
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                            {fundraiser.description}
                          </Typography>
                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Category:
                          </Typography>
                          <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                            {fundraiser.category}
                          </Typography>

                          <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                            Quantity:
                          </Typography>

                          {fundraiser.image ? (
                            <img className="mb-4" src={fundraiser.image} width={'400px'} />
                          ) : null}
                          {fundraiser.createdAt && (
                            <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                              Created At: {fundraiser.createdAt.toDate().toLocaleDateString()}
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

                <AddFundraiserForm
                  open={open}
                  handleClose={handleClose}
                  fundraiser={newFundraiser}
                  handleFundraiserChange={handleNewFundraiserChange}
                  handleSave={handleAddFundraiser}
                  handleNewFundraiserImage={handleNewFundraiserImage}
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

export default FundraiserListingPage
