import {MedicalRecord} from "./medical-record";
import {ShredRecord} from "./shred-record";

export interface Account {

  id: number;

  medicalAccount: MedicalRecord;
  shredAccount: ShredRecord;


}
