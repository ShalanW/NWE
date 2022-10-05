import {OnCallAccount} from "../stericycle/OnCallAccount";
import {ServiceAddress} from "./service-address";

export interface Customer {
  customerName: string
  haulerApiDate?: Date
  customerApiRate?: string
  customerApiDate?: Date
  accounts?: OnCallAccount[]
  address?: ServiceAddress
  // accounts?: OnCallAccount[]
}
