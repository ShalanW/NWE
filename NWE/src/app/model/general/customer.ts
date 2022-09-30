import {OnCallAccount} from "../stericycle/OnCallAccount";

export interface Customer {
  id: string;
  customerName: string
  haulerApiDate?: Date
  customerApiRate?: string
  customerApiDate?: Date
  accounts?: { [key: string]: OnCallAccount }
  // accounts?: OnCallAccount[]
}
