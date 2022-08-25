export interface Container {

  coType: string;

  coCount: number;
  coSize: number;
  coUnit: string;
  coDescription: string;

  coPrice: number;
  coMinimumPerService: number;
  coFrequencyByWeeks: number;

  coPerServiceCost: number;
  coMonthlyCost: number;

  coExtraBoxCostHauler: number;
  coExtraBoxCostCustomer: number;


  //--------------------------------------- Hauler Info Below

  coHaulerCount: number;
  coHaulerSize: number;
  coHaulerUnit: string;
  coHaulerDescription: string;

  coHaulerPrice: number;
  coHaulerMinimumPerService: number;
  coHaulerFrequencyByWeeks: number;

  coHaulerPerServiceCost: number;
  coHaulerMonthlyCost: number;

  coHaulerExtraBoxCostHauler: number;

}
