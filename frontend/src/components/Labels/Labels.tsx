import React, { useContext } from 'react'
import { useAppSelector } from '../../redux/store/hooks'
import GlobalContext from '../context/GlobalContext'

const Labels: React.FC = () => {
  const { labels } = useAppSelector((state) => state.labels)

  const { updateLabel } = useContext(GlobalContext)

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx: number) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={ checked }
            onChange={() => {
              const verify = Boolean(checked)
              updateLabel({ label: lbl, checked: !verify })
            } }
            className=
              {`form-checkbox h-5 w-5 text-${lbl}-400
              rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  )
}

export default Labels
