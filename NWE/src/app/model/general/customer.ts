import {OnCallAccount} from "../stericycle/OnCallAccount";


export interface Customer {
  customerName: string
  haulerApiDate?: Date
  customerApiDate?: Date
  accounts?: OnCallAccount[]
}
