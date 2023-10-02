// CategoriaFuncionario Model
import { Model } from "pinia-orm";
import Funcionario from "./funcionario";

export default class CategoriaFuncionario extends Model {
  // entity is a required property for all models.
  static entity = "categoriaFuncionarios";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      descricao: this.string(""),
      dataCriacao: this.attr(null),
      isActivo: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
      // Relationship
      funcionarios: this.hasMany(Funcionario, "categoriaFuncionarioId"),
    };
  }
}
