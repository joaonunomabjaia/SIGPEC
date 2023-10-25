import { useRepo } from 'pinia-orm';
import Inscricao from 'src/stores/models/inscricao';

const inscricaoRepo = useRepo(Inscricao);

export default {
    // Methods

    newInstanceEntity() {
    return inscricaoRepo.getModel().$newInstance();
    },

    getAll() {
        return inscricaoRepo.all();
    },

    getById(inscricaoId: string) {
        return inscricaoRepo
            .withAllRecursive(3)
            .where('id', inscricaoId)
            .first();
    },

    getAllByAlunoId(alunoId: string) {
        return inscricaoRepo
            .withAllRecursive(3)
            .where('alunoId', alunoId)
            .limit(5)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getAllByEscolaId(escolaId: string) {
        return inscricaoRepo
            .withAllRecursive(3)
            .where('escolaId', escolaId)
            .limit(5)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getAllByFuncionarioId(funcionarioRegisto: string) {
        return inscricaoRepo
            .withAllRecursive(3)
            .where('funcionarioRegisto', funcionarioRegisto)
            .limit(5)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getAllByCategoriaInscricaoId(categoriaInscricaoId: string) {
        return inscricaoRepo
            .withAllRecursive(3)
            .where('categoriaInscricaoId', categoriaInscricaoId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    post(inscricao: string) {
        return inscricaoRepo.save(inscricao) // Fazer depois de salvar no supabase ( Depois da promise )
    },

    patch(inscricao: string) {
        return inscricaoRepo.save(inscricao) // Fazer depois de actualizar no supabase ( Depois da promise )
    },
}