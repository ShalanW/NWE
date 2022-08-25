import {ServiceAddress} from "../general/service-address";
import {Container} from "./container";

export interface ShredRecord {

  id: number;

  shAddress: ServiceAddress;
  shUmbrellaAccountNumber: string;

  shAccountNumber: string;
  shSiteNumber: string;
  shContainers: Container[];

  shPerServiceCost: number;
  shMonthlyCost: number;


}
