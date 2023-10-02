import {
  Loading,
  QSpinnerGears
} from 'quasar'
export default function useLoading () {
  const loadingShow = (messageParam) => {
    Loading.show({
      spinner: QSpinnerGears,
      message: messageParam
    })
  }

  const loadingHide = () => {
    Loading.hide()
  }

  return {
    loadingShow,
    loadingHide
  }
}
