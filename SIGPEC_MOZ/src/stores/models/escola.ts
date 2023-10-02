// Escola Model
import { Model } from "pinia-orm";
import Inscricao from "./inscricao";
import Funcionario from "./funcionario";
import moment from "moment";
import Aluno from "./aluno";
import Pagamento from "./pagamento";

export default class Escola extends Model {
  // entity is a required property for all models.
  static entity = "escolas";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      nome: this.string(""),
      email: this.string(""),
      contactoPrincipal: this.string(""),
      contactoAlternativo: this.string(""),
      endereco: this.string(""),
      nuit: this.string(""),
      funcionarioRegisto: this.string(),
      dataRegisto: this.attr(
        moment(new Date()).format("DD-MM-YYYY, h:mm:ss a")
      ),
      funcionarioEdit: this.string(),
      dataEdit: this.attr(),
      isActivo: this.attr(false),
      logotipo: this.attr(""),
      slogan: this.attr(""),
      contrato: this.attr(""),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
      // Relationship
      inscricaos: this.hasMany(Inscricao, "escolaId"),
      funcionarios: this.hasMany(Funcionario, "escolaId"),
      alunos: this.hasMany(Aluno, "escolaId"),
      pagamentos: this.hasMany(Pagamento, "escolaId"),
      // TAmbem te varios users, mas irei ver como tratar no supabase
    };
  }
}
