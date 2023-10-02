// Funcionario Model
import { Model } from "pinia-orm";
import Inscricao from "./inscricao";
import Pagamento from "./pagamento";

export default class Funcionario extends Model {
  // entity is a required property for all models.
  static entity = "funcionarios";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      nome: this.string(""),
      sobrenome: this.string(""),
      apelido: this.string(""),
      pai: this.string(""),
      mae: this.string(""),
      fotoPath: this.string(""),
      tipoDoc: this.string(""),
      numeroDoc: this.string(""),
      emissorDoc: this.string(""),
      dateEmissaoDoc: this.attr(),
      validadeDoc: this.attr(),
      docExpirado: this.boolean(false),
      isUtilizador: this.boolean(true),
      utilizadorId: this.string(""),
      contactoPrincipal: this.string(""),
      contactoAlternativo: this.string(""),
      endereco: this.string(""),
      nuit: this.string(""),
      escolaId: this.attr(null),
      categoriaFuncionarioId: this.attr(null),
      isActivo: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
      // Relationship
      inscricaos: this.hasMany(Inscricao, "funcionarioRegisto"),
      pagamentos: this.hasMany(Pagamento, "funcionarioRegisto"),
    };
  }
}
