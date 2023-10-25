// Inscricao Model
import { Model } from "pinia-orm";
import moment from "moment";
import Pagamento from "./pagamento";
export default class Inscricao extends Model {
  // entity is a required property for all models.
  static entity = "inscricaos";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      resumoPromo: this.string(""), // Vai resumir toda informacao de promocao caso haja na tal categoria
      valorPagarPosDisconto: this.attr(0),
      valorDisconto: this.attr(0), // Caso haja desconto individual
      discontoGeral: this.attr(0), // disconto por categoria
      isActivo: this.attr(true),
      totalJaPago: this.attr(0),
      fichaFrentePath: this.attr(null),
      fichaVersoPath: this.attr(null),
      dataRegisto: this.attr(
        moment(new Date()).format("DD-MM-YYYY, h:mm:ss a")
      ),
      funcionarioEdit: this.string(""),
      dataEdit: this.attr(""),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
      notas: this.attr("Inicio"), // Anything else Ex: Inicio, Reinicio, etc.

      // Chaves
      funcionarioRegisto: this.string(""),
      categoriaInscricaoId: this.attr(null),
      escolaId: this.attr(null),
      alunoId: this.attr(null),
      // Relationship
      pagamentos: this.hasMany(Pagamento, "inscricaoId"),

      //futura implementacao de testes multimedia
      aprovacoesMultimedia: this.attr(0), // quantas vezes aprovou nos testes de multimedia?
      reprovacoesMultimedia: this.attr(0), // quantas vezes raprovou nos testes de multimedia?
    };
  }
}
