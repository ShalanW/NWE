import {ServiceAddress} from "../general/service-address";
import {Container} from "./container";

export interface OnCallAccount {

  type: string;
  address: ServiceAddress;
  accountNumber: string;
  siteNumber: string;
  container: Container;
  notes: string[]

}
