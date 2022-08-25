import {ServiceAddress} from "../general/service-address";
import {Container} from "./container";

export interface MedicalRecord {

  id: number;
  mwAddress: ServiceAddress;
  mwUmbrellaAccountNumber: string;

  mwAccountNumber: string;
  mwSiteNumber: string;
  mwContainers: Container[];

  mwPerServiceCost: number;
  mwMonthlyCost: number;

}
