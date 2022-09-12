import React, { CSSProperties, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { Formik, Form } from 'formik'
import { formatedDate } from '../../data/function.data'
import { mainTopInitialState } from '../../data/mainTop.data'
import useFormValidation from '../../FormValidation/useFormValidation'
import { IMainTopSchedule } from '../../interfaces/mainTopSchedule.interface'
import Button from '../../stories/Button/Button'
import TextInput from '../../stories/TextInput/TextInput'
import mainTopStyles from './MainTop.styles'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { cleanSchedules, insertDataInSchedule } from '../../redux/reducers/tableReducers'
import { getAxiosClient, postAxiosInfoDataTable } from '../../services/axios/api'
import IClientRegister from '../../interfaces/clientregister.interface'
import SelectOption from '../../stories/SelectOption/SelectOption'

const MainTop: React.FC = () => {
  const [mainTopScheduleData, setMainTopScheduleData] = useState(mainTopInitialState)
  const [clientsData, setClientsData] = useState([])

  const {
    validateError,
    handleErrorMessage
  } = useFormValidation<IMainTopSchedule>('register')

  const navigate = useNavigate()

  const { schedules } = useAppSelector((state) => state.table)

  const dispatch = useAppDispatch()

  const matches = useMediaQuery('(min-width:600px)')

  const verifyMediaSize = (): any => !matches
    ? { ...mainTopStyles.cardContainer, ...mainTopStyles.cardContainerDesk }
    : { ...mainTopStyles.cardContainer, ...mainTopStyles.cardContainerCell }

  const verifyMediaSizeInputBox = (): any => !matches
    ? { ...mainTopStyles.boxInput, ...mainTopStyles.boxInputCell }
    : { ...mainTopStyles.boxInput, ...mainTopStyles.boxInputDesk }

  const verifyMediaSizeTitleBox = (): CSSProperties => !matches
    ? { ...mainTopStyles.boxTitle, ...mainTopStyles.boxTitleCell }
    : { ...mainTopStyles.boxTitle, ...mainTopStyles.boxTitleDesk }

  const verifyMediaSizeBoxArticle = (): any => !matches
    ? { ...mainTopStyles.boxArticle, ...mainTopStyles.boxArticleCell }
    : { ...mainTopStyles.boxArticle, ...mainTopStyles.boxArticleDesk }

  const verifyScreenArt = (): any => !matches
    ? { ...mainTopStyles.boxArt, ...mainTopStyles.boxArtCell }
    : { ...mainTopStyles.boxArt, ...mainTopStyles.boxArtDesk }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setMainTopScheduleData({
      ...mainTopScheduleData,
      [name]: value
    })
  }

  useEffect(() => {
    const getClients = async (): Promise<void> => {
      const getAxiosInfo = await getAxiosClient()
      const clientsName = getAxiosInfo.data.map((data: IClientRegister) => {
        return data.client
      })
      setClientsData(clientsName)
    }
    void getClients()
    console.log(clientsData)
  }, [])

  const handleClick = async (): Promise<void> => {
    await validateError(mainTopScheduleData)
    const getUserFromLocalStorage = localStorage.getItem('user')
    if (getUserFromLocalStorage === null) return
    const getUser = JSON.parse(getUserFromLocalStorage)
    const { name } = getUser
    const data = {
      createdBy: name,
      client: mainTopScheduleData.client,
      value: mainTopScheduleData.value,
      status: mainTopScheduleData.status,
      date: formatedDate()
    }
    const postAxios = await postAxiosInfoDataTable(data)
    if ((Boolean((postAxios?.message.includes('400')))) ||
    (Boolean((postAxios?.message.includes('401'))))) return
    dispatch(insertDataInSchedule({ id: schedules.length, ...data }))
  }

  const handleClickConclude = async (): Promise<void> => {
    dispatch(cleanSchedules())
    navigate('/schedule')
  }

  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <Formik
          initialValues={ mainTopInitialState }
          onSubmit={ () => console.log() }
        >
          <Form style={ {
            ...verifyMediaSize()
          } }
          >
            <article style={ verifyMediaSizeTitleBox() }>
              <h3 style={{ color: '#1ea7fd', fontSize: '25px' }}>Atendimento</h3>
              <Button
                primary
                label="CONCLUIR"
                type="submit"
                style={ !matches
                  ? mainTopStyles.buttonCellConc
                  : mainTopStyles.buttonDeskConc
                }
                onClick={ handleClickConclude }
              />
            </article>
            <article style={ verifyMediaSizeInputBox() }>
              <article
                style={ verifyMediaSizeBoxArticle() }
              >
              <TextInput
                id="maintopschedule-pacient-name"
                label="Nome do Paciente"
                name="client"
                value={ mainTopScheduleData.client }
                onChange={ handleChange }
                style={{ width: '100%', height: '30px' }}
                styleArticle={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
                { ...handleErrorMessage('client') }
              />
              <TextInput
                id="maintopschedule-value"
                label="Valor"
                name="value"
                type="number"
                value={ mainTopScheduleData.value }
                onChange={ handleChange }
                style={{ width: '100%', height: '40px' }}
                styleArticle={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                { ...handleErrorMessage('value') }
              />
              </article>
              <article style={ verifyScreenArt() }>
                <SelectOption
                  label="status"
                  options={['pendente', 'concluido']}
                  { ...handleErrorMessage('status') }
                />
                <Button
                  label="adicionar"
                  type="submit"
                  onClick={ handleClick }
                />
              </article>
            </article>
          </Form>
        </Formik>
    </section>
  )
}

export default MainTop
