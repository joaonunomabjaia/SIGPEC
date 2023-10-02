import { useMediaQuery } from '@vueuse/core'
import { Platform, LocalStorage } from 'quasar'
import { computed, ref } from 'vue'

export function useSystemUtils () {
  const isWebScreen = useMediaQuery('(min-width: 1024px)')
  const website = computed(() => (!Platform.is.mobile))
  const isDeskTop = computed(() => (!!Platform.is.desktop))
  const isMobile = computed(() => (!!Platform.is.mobile))
  const isElectron = computed(() => (!!Platform.is.electron))
  const isOnline = computed(() =>
    website.value
      ? true
      : LocalStorage.getItem('clinic_sector_users') === null ||
        (LocalStorage.getItem('clinic_sector_users') !== null &&
          LocalStorage.getItem('clinic_sector_users').includes('NORMAL'))
  )
  const connectivity = ref(true)
  const checkConnectivity = async () => {
    try {
      await fetch('https://www.google.com', { method: 'HEAD' })
      connectivity.value = true // Conseguiu pingar o Google
    } catch (error) {
      connectivity.value = false // Não conseguiu pingar o Google
    }
  }
  const isConected = computed(() => {
    checkConnectivity()
    return connectivity.value
  })

  return { website, isDeskTop, isMobile, isElectron, isOnline, isWebScreen, isConected }
}
