// Pagamento Model
import { Model } from "pinia-orm";
import moment from "moment";

export default class Pagamento extends Model {
  // entity is a required property for all models.
  static entity = "pagamentos";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      valorPago: this.attr(0),
      referenteA: this.attr(null),
      dataRegisto: this.attr(
        moment(new Date()).format("DD-MM-YYYY, h:mm:ss a")
      ),
      funcionarioEdit: this.string(""),
      notas: this.attr(""),
      dataEdit: this.attr(""),
      isValido: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)

      
      escolaId: this.attr(null),
      inscricaoId: this.attr(null),
      tipoPagamentoId: this.attr(""),
      funcionarioRegisto: this.string(null),
    };
  }
}
