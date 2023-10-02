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
      valorPago: this.attr(0),
      inscricaoId: this.attr(),
      funcionarioRegisto: this.string(),
      dataRegisto: this.attr(
        moment(new Date()).format("DD-MM-YYYY, h:mm:ss a")
      ),
      funcionarioEdit: this.string(),
      dataEdit: this.attr(),
      isActivo: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
      // Relationship
      pagamentos: this.hasMany(Pagamento, "tipoPagamentoId"),
    };
  }
}
