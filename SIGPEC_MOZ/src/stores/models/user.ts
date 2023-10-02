// User Model
import { Model } from "pinia-orm";
// import moment from 'moment'

export default class User extends Model {
  static entity = "users";
  static primaryKey = "id";
  static fields() {
    return {
      // Attributes
      id: this.uid(),
      nomenomeCompleto: this.attr("Guest"),
      dataNascimento: this.attr(null),
      passWordIfGuest: this.attr("G123EC"),
      isActivo: this.attr(true),
      syncStatus: this.attr("R"), // R=Ready to sync, U=updated (must be sync again), S=sent (no need to sync)
    };
  }
}
