const calendarStyles = {
  container: {
    width: '100vw',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableContainer: {
    border: '2px solid #1ea7fd',
    borderRadius: '6px',
    padding: '10px'
  },
  lineTable: {
    width: '80vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTable: {
    width: 'calc(100%/7)',
    height: 'calc(100%/7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#1ea7fd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  cellTable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ffffff',
    color: '#1ea7fd',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  buttonCell: {
    height: '40px',
    width: 'calc(100%/7)'
  },
  buttonDesk: {
    height: '50px',
    width: '70px'
  }
}

export default calendarStyles
