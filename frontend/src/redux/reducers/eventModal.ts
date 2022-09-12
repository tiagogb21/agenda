import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IEventModal } from '../../interfaces/eventModal.interface'

const initialState: IEventModal = {
  showEventModal: false,
  filteredEvents: [],
  selectedEvent: []
}

export const EventModal = createSlice({
  name: 'EventModal',
  initialState,
  reducers: {
    toggleEventModal: (state, action: PayloadAction<boolean>) => {
      state.showEventModal = action.payload
    },
    inserIntoSelectedEvent: (state, action: PayloadAction<any>) => {
      state.selectedEvent = [...state.selectedEvent, action.payload]
    }
  }
})

export const { toggleEventModal, inserIntoSelectedEvent } = EventModal.actions
export default EventModal.reducer
