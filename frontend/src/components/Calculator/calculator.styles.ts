const calculatorStyles = {
  container: {
    width: '220px',
    height: '325px',
    position: 'absolute',
    zIndex: '100',
    top: '170px',
    border: '5px solid #1ea7fd',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    background: '#ffffff'
  },
  closeBtnContainer: {
    width: '225px',
    height: '25px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  windowCalcContainer: {
    width: '280px',
    height: '70px',
    background: '#ffffff',
    border: '1px solid rgb(218, 220, 224)',
    borderRadius: '5px',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'row-reverse',
    fontSize: '25px'
  },
  btnCalcContainer: {
    width: '155px',
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    border: '2px solid #1ea7fd'
  }
}

export default calculatorStyles
