import { useState, useCallback } from 'react'

import validateForm, { ErrorInterface } from '.'
import IClientRegister from '../interfaces/clientregister.interface'
import { ILogin } from '../interfaces/login.interface'
import { IRegister } from '../interfaces/register.interface'
import { ITable } from '../interfaces/table.interface'

import { FormName } from './testSchemas'

export interface DefaultForm { [key: string]: unknown }

const useFormValidation = <Form = DefaultForm>(formName: FormName): any => {
  const [errorItems, setErrorItems] = useState<ErrorInterface>()

  const validateError = async (formParams:
  IRegister
  | ILogin
  | ITable
  | IClientRegister
  ): Promise<boolean> => {
    const errors = await validateForm(formParams, formName)

    if (errors != null) {
      setErrorItems(errors)
      return false
    }
    return true
  }

  const handleErrorMessage = useCallback(
    (item: keyof Form, helperText?: string) => {
      if (errorItems != null) {
        const error = errorItems.errors.find((err) => err.item === item)
        if (error != null) return { error: true, helperText: error?.message }
      }
      // return { helperText };
    },
    [errorItems]
  )

  const clearErrors = (): void => {
    setErrorItems(undefined)
  }

  return { handleErrorMessage, clearErrors, validateError, errorItems }
}

export default useFormValidation
