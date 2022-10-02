import {Customer} from "../general/customer";
import {OnCallAccount} from "./OnCallAccount";

export interface OnCallAccountDialogData {
  customer?: Customer
  account?: OnCallAccount
  dialogType: string
}
