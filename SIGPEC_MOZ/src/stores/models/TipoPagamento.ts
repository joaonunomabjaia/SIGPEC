// TipoPagamento Model
import { Model } from "pinia-orm";
import moment from "moment";
import Pagamento from "./pagamento";

export default class TipoPagamento extends Model {
  // entity is a required property for all models.
  static entity = "tipoPagamentos";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      valorPorPagar: this.attr(0),
      descricao: this.string("Categoria"),
      dataRegisto: this.attr(
        moment(new Date()).format("DD-MM-YYYY, h:mm:ss a")
      ),
      funcionarioEdit: this.string(null),
      dataEdit: this.attr(null),
      isActivo: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
      
      funcionarioRegisto: this.string(null),
      escolaId: this.string(""),
      // Relationship
      pagamentos: this.hasMany(Pagamento, "tipoPagamentoId"),
    };
  }
}
