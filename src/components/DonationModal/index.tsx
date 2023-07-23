import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton
} from '@mui/material'
import { useState, ChangeEvent } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import { Donation, DonationTypes, Product } from '@/utils/constants/constants'
import { createDonation } from 'pages/api/donations'
import { useAuth } from 'context/AuthContext'

interface DonateModalProps {
  product: Product
}

const DonateModal: React.FC<DonateModalProps> = ({ product }) => {
  const { user } = useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value))
  }

  const handleDonate = async () => {
    const donationItem: Donation = {
      productId: product.id,
      charityId: product.charityId,
      donorId: user.uid || '',
      price: product.price,
      quantity: quantity,
      status: DonationTypes.OFFERED
    }
    await createDonation(donationItem)
    handleClose()
  }

  return (
    <div className="m-4">
      <Button onClick={handleOpen} variant="contained" color="primary">
        Donate
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div className="flex items-center justify-between">
            <Typography variant="h6">Donate</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1">Price: {product.price}</Typography>
              <Typography variant="body1">
                Created At: {product.createdAt?.toDate().toLocaleString()}
              </Typography>
              <Typography variant="body1">Available Quantity: {product.quantity}</Typography>
              <TextField
                type="number"
                variant="outlined"
                label="Quantity"
                value={quantity}
                onChange={handleChange}
                style={{
                  marginTop: '1rem'
                }}
                fullWidth
                inputProps={{ min: 1, max: product.quantity }}
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-64 rounded-md"
              />
            </div>
          </div>
        </DialogContent>
        <div className="p-4">
          <Button variant="contained" color="primary" onClick={handleDonate}>
            Donate
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default DonateModal
