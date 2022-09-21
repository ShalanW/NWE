import {OnCallAccount} from "../stericycle/OnCallAccount";

export interface Customer {
  customerName: string
  accounts?: OnCallAccount[]
}
