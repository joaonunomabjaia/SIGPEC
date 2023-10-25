// Aluno Model
import { Model } from "pinia-orm";
import Inscricao from "./inscricao";
export default class Aluno extends Model {
  // entity is a required property for all models.
  static entity = "alunos";

  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      nome: this.string(null),
      sobrenome: this.string(null),
      apelido: this.attr(null),
      dataNascimento: this.attr(null),
      pai: this.attr(null),
      mae: this.attr(null),
      sexo: this.attr(null),
      fotoPath: this.attr(null),
      tipoDoc: this.attr(null),
      numeroDoc: this.attr(null),
      emissorDoc: this.attr(null),
      dataEmissaoDoc: this.attr(null),
      validadeDoc: this.attr(null),
      docExpirado: this.boolean(false),
      isUtilizador: this.boolean(true),
      contactoPrincipal: this.attr(null),
      contactoAlternativo: this.attr(null),
      endereco: this.attr(null),
      nuit: this.attr(null),
      isActivo: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)

      
      escolaId: this.attr(null),
      utilizadorId: this.attr(null),
      // Relationship
      inscricaos: this.hasMany(Inscricao, "alunoId"),
    };
  }
}
