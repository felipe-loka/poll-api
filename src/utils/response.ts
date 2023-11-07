interface SuccessReponse {
  message: string
  status: 'success' | 'failed'
  data: object
}

interface ErrorReponse {
  message: string
  status: 'success' | 'failed'
  error?: object
}

export const buildSuccessResponse = (message: string, data: object): SuccessReponse => {
  return {
    message,
    status: 'success',
    data
  }
}

export const buildErrorResponse = (message: string, error?: object): ErrorReponse => {
  return {
    message,
    status: 'failed',
    error
  }
}
