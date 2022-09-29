import {OnCallAccount} from "../stericycle/OnCallAccount";

export interface Customer {
  customerName: string
  haulerApiDate?: Date
  customerApiRate?: string
  customerApiDate?: Date
  accounts?: { [key: string]: OnCallAccount }
  // accounts?: OnCallAccount[]
}
