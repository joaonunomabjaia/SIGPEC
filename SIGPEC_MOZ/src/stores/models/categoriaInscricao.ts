// CategoriaInscricao Model
import { Model } from "pinia-orm";
import Inscricao from "./inscricao";
import moment from "moment";

export default class CategoriaInscricao extends Model {
  // entity is a required property for all models.
  static entity = "categoriaInscricaos";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      descricao: this.string(""),
      valorDefeito: this.attr(0), // Valor defeito da categoria
      valorPromo: this.attr(0), // Caso haja promocao, valor a pagar
      emPromo: this.boolean(false), // Ha promocao?
      inicioPromo: this.attr(null), // Data inicio da Promocao
      fimPromo: this.attr(null), // Data fim da Promocao
      funcionarioRegisto: this.string("Sistema"),
      dataRegisto: this.attr(
        moment(new Date()).format("DD-MM-YYYY, h:mm:ss a")
      ),
      funcionarioEdit: this.string("Sistema"),
      dataEdit: this.attr(null),
      isActivo: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
      // Relationship
      inscricaos: this.hasMany(Inscricao, "categoriaInscricaoId"),
    };
  }
}
