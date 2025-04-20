import { supabase } from '~/utils/supabase'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'vue-sonner'

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const BASE_URL = 'https://xyxhlgoxpzwrrxjmmpie.supabase.co/storage/v1/object/'

export const handleUploadFile = async (file) => {
  file = file?.target?.files[0]
  if (!file) {
    toast.error('Erro ao selecionar o arquivo.')
    return null
  }

  if (!file.type.startsWith('image/')) {
    toast.error('Formato de arquivo inválido. Apenas imagens são aceitas.')
    return null
  }

  if (file.size > MAX_FILE_SIZE) {
    toast.error('O arquivo deve ter menos de 1MB.')
    return null
  }

  const uuid = uuidv4()
  const { data, error } = await supabase.storage
    .from('dishes')
    .upload(`public/${uuid}`, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false
    })

  if (error) {
    console.error('Error uploading file:', error)
    toast.error('Erro ao fazer upload do arquivo. Tente novamente mais tarde.')
    return null
  }

  toast.success('Arquivo enviado com sucesso!')
  return BASE_URL + data.fullPath
}
