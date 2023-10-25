import { useRepo } from 'pinia-orm';
import Pagamento from 'src/stores/models/pagamento';

const pagamentoRepo = useRepo(Pagamento);

export default {
    // Methods

    newInstanceEntity() {
    return pagamentoRepo.getModel().$newInstance();
    },

    getAll() {
        return pagamentoRepo.all();
    },

    getById(pagamentoId: string) {
        return pagamentoRepo
            .withAllRecursive(3)
            .where('id', pagamentoId)
            .first();
    },

    getAllByEscolaId(escolaId: string) {
        return pagamentoRepo
            .withAllRecursive(3)
            .where('escolaId', escolaId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getAllByUtilizadorId(utilizadorId: string) {
        return pagamentoRepo
            .withAllRecursive(3)
            .where('funcionarioRegisto', utilizadorId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getAllByInscricaoId(inscricaoId: string) {
        return pagamentoRepo
            .withAllRecursive(3)
            .where('inscricaoId', inscricaoId)
            .limit(500)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    getAllByTipoPagamentoId(tipoPagamentoId: string) {
        return pagamentoRepo
            .withAllRecursive(3)
            .where('tipoPagamentoId', tipoPagamentoId)
            .limit(20)
            .orderBy('dataRegisto', 'desc')
            .get();
    },

    post(tipoPagamento: string) {
        return pagamentoRepo.save(tipoPagamento) // Fazer depois de salvar no supabase ( Depois da promise )
    },

    patch(tipoPagamento: string) {
        return pagamentoRepo.save(tipoPagamento) // Fazer depois de actualizar no supabase ( Depois da promise )
    },
}