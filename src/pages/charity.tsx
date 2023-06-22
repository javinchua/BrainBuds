import { useEffect, useState } from 'react'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import { useAuth } from 'context/AuthContext'
import { CharityData, sampleCharity, userTypes } from '@/utils/constants/constants'
import { getCharityInfo, updateCharityInfo } from './api/charity'
import PrivateRoute from 'context/PrivateRoute'

const CharityPage = () => {
  const { user } = useAuth()

  const [editing, setEditing] = useState(false)
  // charity info refers to the data in the backend
  const [charityInfo, setCharityInfo] = useState<CharityData>(sampleCharity)
  // refers to the info that users see on their s
  const [charityData, setCharityData] = useState<CharityData>(charityInfo)
  const [loading, setLoading] = useState(false)

  const handleEdit = () => {
    setEditing(true)
  }

  useEffect(() => {
    const retrieveInfo = async () => {
      if (user.uid) {
        setLoading(true)
        const data = await getCharityInfo(user.uid)
        if (data != null) {
          setCharityInfo(data as CharityData)
          setCharityData(data as CharityData)
        }
        setLoading(false)
      }
    }
    retrieveInfo()
  }, [user])

  const handleSave = () => {
    if (user.uid) {
      setCharityInfo(charityData)
      updateCharityInfo(charityData, user.uid)
      setEditing(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharityData({ ...charityData, [e.target.name]: e.target.value })
  }

  return (
    <PrivateRoute allowedUserTypes={[userTypes.CHARITY]}>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto lg:py-0">
          <div className="max-w-lg p-8 mx-auto bg-white rounded shadow">
            <Typography variant="h4" className="mb-4">
              Charity Information
            </Typography>
            {loading ? (
              <CircularProgress /> // Render a loading indicator while data is being fetched
            ) : editing ? (
              // Edit mode
              <>
                <TextField
                  name="name"
                  label="Name"
                  value={charityData.name}
                  onChange={handleChange}
                  fullWidth
                  style={{
                    marginBottom: '1rem'
                  }}
                />
                <TextField
                  name="description"
                  label="Description"
                  value={charityData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  style={{
                    marginBottom: '1rem'
                  }}
                />
                <Button onClick={handleSave} variant="contained" endIcon={<Save />}>
                  Save
                </Button>
              </>
            ) : (
              // View mode
              <>
                <Typography variant="h6" className="mb-2">
                  Name:
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {charityData.name}
                </Typography>
                <Typography variant="h6" className="mb-2">
                  Description:
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {charityData.description}
                </Typography>
                {user && user.type === userTypes.CHARITY && (
                  <Button onClick={handleEdit} variant="contained" endIcon={<Edit />}>
                    Edit
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </PrivateRoute>
  )
}

export default CharityPage
