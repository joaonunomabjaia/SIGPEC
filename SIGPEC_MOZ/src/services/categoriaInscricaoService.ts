import { useRepo } from 'pinia-orm'
import CategoriaInscricao from 'src/stores/models/categoriaInscricao'

const categoriaInscricaoRepo = useRepo(CategoriaInscricao);



export default {
    // Methods

    newInstanceEntity() {
    return categoriaInscricaoRepo.getModel().$newInstance();
    },

    getAll() {
        return categoriaInscricaoRepo.all();
    },

    getById(categoriaInscricaoId: string) {
        return categoriaInscricaoRepo
            .withAllRecursive(3)
            .where('id', categoriaInscricaoId)
            .first();
    },

    getAllByEscolaId(escolaId: string) {
        return categoriaInscricaoRepo
            .withAllRecursive(3)
            .where('escolaId', escolaId)
            .limit(500)
            .orderBy('valorDefeito', 'desc')
            .get();
    },

    getAllByUtilizadorId(utilizadorId: string) {
        return categoriaInscricaoRepo
            .withAllRecursive(3)
            .where('utilizadorId', utilizadorId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    post(categoria: string) {
        return categoriaInscricaoRepo.save(categoria) // Fazer depois de salvar no supabase ( Depois da promise )
    },

    patch(categoria: string) {
        return categoriaInscricaoRepo.save(categoria) // Fazer depois de actualizar no supabase ( Depois da promise )
    },
}