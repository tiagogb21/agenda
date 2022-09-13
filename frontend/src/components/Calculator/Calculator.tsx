/* eslint-disable no-eval */
import React, { useState, CSSProperties } from 'react'

import { calculatorButtons, MINIMUM_VALUE, signalStore } from '../../utils/data'

import { AiFillCloseCircle } from 'react-icons/ai'
import { MdOutlineNightlight, MdOutlineLightMode } from 'react-icons/md'
import { useAppSelector } from '../../redux/store/hooks'
import { toggleButton } from '../../redux/reducers/calculatorReducer'
import { useAppDispatch } from '../../redux/store/store'

import calculatorStyles from './calculator.styles'
import Button from '../../stories/Button/Button'

interface IItem {
  background: string
  name: string
  color: string
}

const Calculator: React.FC = () => {
  const [buttonValue, setButtonValue] = useState('')
  const [changeStyle, setChangeStyle] = useState(true)

  const dispatch = useAppDispatch()
  const { buttonClose } = useAppSelector(state => state.calculator)

  const handleClick = (e: React.MouseEvent): void => {
    const target = (e.target as HTMLButtonElement)
    const targetValue = (target.textContent != null) ? target.textContent : ''
    if (targetValue === '=') {
      setButtonValue((eval(buttonValue)).toFixed(2).toString())
    } else if (buttonValue.length < MINIMUM_VALUE) {
      if (signalStore.includes(targetValue) &&
      signalStore.includes(buttonValue[buttonValue.length - 1])) {
        const targetText = buttonValue.slice(0, -1) + targetValue
        return setButtonValue(targetText)
      }
      const targetText =
        buttonValue + targetValue
      return setButtonValue(targetText)
    }
  }

  const clearAll = (): void => {
    setButtonValue('')
  }

  const handleClickChange = (): void => {
    setChangeStyle((prev) => !prev)
  }

  return (
    <section style={ calculatorStyles.container as CSSProperties }>
      <article style={ calculatorStyles.closeBtnContainer }>
        <button
          type="button"
          className="btn-toggle-light"
          onClick={ handleClickChange }
          style={ {
            color: changeStyle ? 'black' : '#ffffff',
            width: '80px',
            fontSize: '12px',
            border: 'none',
            borderRadius: '6px',
            background: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          } }
        >
          {
            changeStyle
              ? <MdOutlineLightMode />
              : <MdOutlineNightlight />
          }
          <span>
            { changeStyle ? 'Dia' : 'Noite' }
          </span>
        </button>
        <button
          type="button"
          className="btn-close"
          style={ {
            color: changeStyle ? 'black' : '#ffffff',
            width: '80px',
            fontSize: '12px',
            background: 'inherit',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          } }
          onClick={() => dispatch(toggleButton(!buttonClose))}
        >
          <AiFillCloseCircle />
          <span>
            Fechar
          </span>
        </button>
      </article>
      <section style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '305px'
      }}>
        <article style={ calculatorStyles.btnCalcContainer as CSSProperties }>
          <p>{ buttonValue }</p>
        </article>
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          {
            calculatorButtons.map((calc: IItem[], index: number) => (
              <article
                key={index}
                style={{ display: 'flex', gap: '10px' }}
              >
                {
                  calc.map((button: IItem, id: number) => (
                    <button
                      type="button"
                      key={ button.name }
                      style={{
                        background: button.background,
                        height: '30px',
                        width: '30px',
                        margin: 0,
                        border: '1px solid #1ea7fd',
                        color: button.color,
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      onClick={ button.name === 'AC' ? clearAll : handleClick }
                    >
                      { button.name }
                    </button>
                  ))
                }
              </article>
            ))
          }
        </article>
        <Button
          primary
          label="adicionar"
          size="small"
        />
      </section>
    </section>
  )
}

export default Calculator
