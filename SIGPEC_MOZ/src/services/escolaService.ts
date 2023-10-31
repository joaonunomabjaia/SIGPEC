import { useRepo } from 'pinia-orm';
import Escola from 'src/stores/models/escola';

const escolaRepo = useRepo(Escola);

export default {
    // Methods

    newInstanceEntity() {
    return escolaRepo.getModel().$newInstance();
    },

    getAll() {
        return escolaRepo.all();
    },

    getById(escolId: string) {
        return escolaRepo
            .withAllRecursive(3)
            .where('id', escolId)
            .first();
    },

    post(escola: string) {
        return escolaRepo.save(escola) // Fazer depois de salvar no supabase ( Depois da promise )
    },

    patch(escola: string) {
        return escolaRepo.save(escola) // Fazer depois de actualizar no supabase ( Depois da promise )
    },
}