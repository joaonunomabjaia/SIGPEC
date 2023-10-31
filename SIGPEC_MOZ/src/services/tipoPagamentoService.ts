import { useRepo } from 'pinia-orm'
import TipoPagamento from 'src/stores/models/TipoPagamento';

const tipoPagamentoRepo = useRepo(TipoPagamento);



export default {
    // Methods

    newInstanceEntity() {
    return tipoPagamentoRepo.getModel().$newInstance();
    },

    getAll() {
        return tipoPagamentoRepo.all();
    },

    getById(tipoPagamentoId: string) {
        return tipoPagamentoRepo
            .withAllRecursive(3)
            .where('id', tipoPagamentoId)
            .first();
    },

    getAllByEscolaId(escolaId: string) {
        return tipoPagamentoRepo
            .withAllRecursive(3)
            .where('escolaId', escolaId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getDefault() {
        return tipoPagamentoRepo
            .withAllRecursive(3)
            .where('descricao', 'Categoria')
            .first();
    },

    post(tipoPagamento: string) {
        return tipoPagamentoRepo.save(tipoPagamento) // Fazer depois de salvar no supabase ( Depois da promise )
    },

    patch(tipoPagamento: string) {
        return tipoPagamentoRepo.save(tipoPagamento) // Fazer depois de actualizar no supabase ( Depois da promise )
    },
}