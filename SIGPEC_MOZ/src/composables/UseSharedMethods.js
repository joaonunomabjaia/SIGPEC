import moment from 'moment'
export default function useSharedMethods () {
  // Dado a data de nascimento, retorne a idade actual
  const calculateAge = (birthDate) => {
    if (birthDate !== undefined && birthDate !== null) {
      return moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years')
    } else {
      return null
    }
  }

  // Dado duas datas, retornar a diferenca date1-date2 em dias
  const diffDatesInDays = (date1, date2) => {
    if (date1 !== undefined && date2 !== undefined) {
      const a = moment(date1, 'DD-MM-YYYY')
      const c = a.diff(date2, 'days')
      return c
    }
    return null
  }

  return {
    calculateAge,
    diffDatesInDays
  }
}
