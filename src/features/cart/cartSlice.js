import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  ClubReference: '',
  PublishedEventRef: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addVoucher(state, action) {
      // this reducer adds the voucher to our cart as well as ClubReference & PublishedEventRef
      // payload= {newItem, clubRef, eventRef}

      state.cart.push(action.payload.newItem)
      state.ClubReference = action.payload.clubRef
      state.PublishedEventRef = action.payload.eventRef
    },

    deleteVoucher(state, action) {
      // This reducer deletes the voucher
      // payload= Type

      state.cart = state.cart.filter((item) => item.Type !== action.payload)
    },

    increseVoucherQuantity(state, action) {
      // This reducer increments the quantity of the voucher by 1 and calculates the totalPrice
      // payload= Type

      const item = state.cart.find((item) => item.Type === action.payload)

      item.Quantity++
      item.totalPrice = item.Quantity * item.Amount
    },

    decreseVoucherQuantity(state, action) {
      // This reducer decrements the quantity of the voucher by 1 and calculates the totalPrice
      // If the Quantity= 0 after decrementing then we delete this voucher
      // payload= Type

      const item = state.cart.find((item) => item.Type === action.payload)

      item.Quantity--
      item.totalPrice = item.Quantity * item.Amount

      if (item.Quantity === 0)
        cartSlice.caseReducers.deleteVoucher(state, action)
    },

    clearCart(state) {
      // this reducer resets our cart as well as ClubReference & PublishedEventRef to initialState

      state.cart = []
      state.ClubReference = ''
      state.PublishedEventRef = ''
    },
  },
})

export const {
  addVoucher,
  deleteVoucher,
  decreseVoucherQuantity,
  increseVoucherQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

// These are Selector methods

// getCart returns the list of vouchers in the cart
export const getCart = (state) => state.cart.cart

// getEventRef returns the PublishedEventRef
export const getEventRef = (state) => state.cart.PublishedEventRef

// getClubRef returns the ClubReference
export const getClubRef = (state) => state.cart.ClubReference

// getTotalCartQuantity returns the total quantity of vouchers in the cart
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.Quantity, 0)

// getTotalCartPrice returns the total price of vouchers in the cart
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

// getCurrentQuantityByType returns the quantity of the voucher with the 'Type' passed
export const getCurrentQuantityByType = (Type) => (state) =>
  state.cart.cart.find((item) => item.Type === Type)?.Quantity ?? 0
