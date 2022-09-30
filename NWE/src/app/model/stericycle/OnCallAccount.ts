import {ServiceAddress} from "../general/service-address";
import {Container} from "./container";

export interface OnCallAccount {
  id: string
  type: string;
  address: ServiceAddress;
  accountNumber: string;
  siteNumber: string;
  container: Container;
  notes: string[]

}
