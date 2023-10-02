import useSupabase from 'src/boot/supabase'
import useAuthUser from 'src/composables/UseAuthUser'
export default function useApi () {
  const { user } = useAuthUser()
  const { supabase } = useSupabase()

  const list = async (table) => {
    console.log(String(table))
    const { data, error } = await supabase
      .from(String(table))
      .select('*')
      .range(0, 9)

    if (error) throw error
    console.log(data)
    return data
  }

  const getByContentType = async (table, contentTypeId) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('content_type_id', contentTypeId)

    if (error) throw error
    return data
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)

    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
          user_id: user.value.id
        }
      ])

    if (error) throw error
    return data
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update([
        {
          ...form,
          user_id: user.value.id
        }
      ])
      .match({ id: form.id })

    if (error) throw error
    return data
  }

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id })

    if (error) throw error
    return data
  }

  return {
    list,
    getById,
    post,
    update,
    remove,
    getByContentType
  }
}
