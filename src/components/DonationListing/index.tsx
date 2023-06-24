import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Container,
  TextField,
  Box,
  Select,
  MenuItem
} from '@mui/material'
import { Donation, DonationTypes } from '@/utils/constants/constants'
import { getDonationsForCharity, updateDonationStatus } from 'pages/api/donations'
import { useAuth } from 'context/AuthContext'
import { getProductById } from 'pages/api/product'

interface DonationItem extends Donation {
  productName: string
  productImage: string
  totalQuantity: number
}
export const Donations = () => {
  const { user } = useAuth()
  const [donations, setDonations] = useState<DonationItem[]>([])

  const [statusFilter, setStatusFilter] = useState<DonationTypes | 'ALL'>('ALL')
  const [searchFilter, setSearchFilter] = useState<string>('')

  const filteredDonations = donations.filter(
    (donation) =>
      (statusFilter === 'ALL' || donation.status === statusFilter) &&
      donation.productName.toLowerCase().includes(searchFilter.toLowerCase())
  )

  useEffect(() => {
    const fetchDonationsData = async () => {
      if (user && user.uid) {
        const donationsData = await getDonationsForCharity(user.uid as string)
        const donationArray = donationsData as Donation[]
        const transformedDonations: DonationItem[] = []
        for (let i = 0; i < donationArray?.length; i++) {
          const product = await getProductById(donationArray[i].productId)
          if (product) {
            transformedDonations.push({
              productImage: product.image,
              productName: product.name,
              totalQuantity: product.quantity,
              ...donationArray[i]
            })
          }
        }
        setDonations(transformedDonations as DonationItem[])
      }
    }

    fetchDonationsData()
  }, [user])

  const handleAccept = async (donationId: string, productId: string, quantity: number) => {
    await updateDonationStatus(donationId, DonationTypes.ACCEPTED, productId, quantity)
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === donationId ? { ...donation, status: DonationTypes.ACCEPTED } : donation
      )
    )
  }

  const handleReject = async (donationId: string, productId: string, quantity: number) => {
    await updateDonationStatus(donationId, DonationTypes.REJECTED, productId, quantity)
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === donationId ? { ...donation, status: DonationTypes.REJECTED } : donation
      )
    )
  }

  return (
    <Container maxWidth="lg" className="mt-4">
      <Box mb={2} display="flex" justifyContent="space-between">
        <TextField
          label="Search products"
          variant="outlined"
          onChange={(e) => setSearchFilter(e.target.value)}
          fullWidth
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as DonationTypes | 'ALL')}
        >
          <MenuItem value="ALL">All statuses</MenuItem>
          {Object.values(DonationTypes).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={4}>
        {filteredDonations.map((donation) => (
          <Grid item key={donation.id} xs={12} sm={6} md={4}>
            <Card className="flex flex-col h-full">
              <img
                src={donation.productImage}
                alt={donation.productName}
                className="object-cover w-full h-64"
              />
              <CardContent className="flex-grow">
                <Typography gutterBottom variant="h6" component="h2">
                  {donation.productName}
                </Typography>
                <Typography>Offered Quantity: {donation.quantity}</Typography>
                <Typography>Offered At: {donation.updatedAt?.toDate().toLocaleString()}</Typography>
              </CardContent>
              <CardActions>
                {donation.status === DonationTypes.OFFERED ? (
                  <>
                    <Button
                      size="small"
                      color="success"
                      variant="contained"
                      onClick={() =>
                        handleAccept(
                          donation.id as string,
                          donation.productId,
                          donation.totalQuantity - donation.quantity
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() =>
                        handleReject(
                          donation.id as string,
                          donation.productId,
                          donation.totalQuantity - donation.quantity
                        )
                      }
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Typography color="primary" variant="body2">
                    Status: {donation.status}
                  </Typography>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
