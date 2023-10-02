import { useQuasar } from 'quasar'
export default function useNotify () {
  const $q = useQuasar()

  const notifySuccess = (messageParam) => {
    $q.notify({
      type: 'positive',
      message: messageParam || 'Sucesso'
    })
  }

  const notifyError = (messageParam) => {
    $q.notify({
      type: 'negative',
      message: messageParam || 'Falhou'
    })
  }

  return {
    notifySuccess,
    notifyError
  }
}
