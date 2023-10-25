import { useRepo } from 'pinia-orm';
import Aluno from 'src/stores/models/aluno';

const alunoRepo = useRepo(Aluno);

export default {
    // Methods

    newInstanceEntity() {
    return alunoRepo.getModel().$newInstance();
    },

    getAll() {
        return alunoRepo.all();
    },

    getById(alunoId: string) {
        return alunoRepo
            .withAllRecursive(3)
            .where('id', alunoId)
            .first();
    },

    getAllByEscolaId(escolaId: string) {
        return alunoRepo
            .withAllRecursive(3)
            .where('escolaId', escolaId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getAllByUtilizadorId(utilizadorId: string) {
        return alunoRepo
            .withAllRecursive(3)
            .where('utilizadorId', utilizadorId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    post(aluno: string) {
        return alunoRepo.save(aluno) // Fazer depois de salvar no supabase ( Depois da promise )
    },

    patch(aluno: string) {
        return alunoRepo.save(aluno) // Fazer depois de actualizar no supabase ( Depois da promise )
    },
}