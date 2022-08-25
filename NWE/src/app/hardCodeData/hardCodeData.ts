import {Account} from "../model/stericycle/account";
import {ServiceAddress} from "../model/general/service-address";
import {Container} from "../model/stericycle/container";

export const STERICYCLEACCOUNTS: Account[] = [
  {
    id: 1,

    medicalAccount: {

      id: 1,

      mwAddress: {
        streetAddress: "123 Test Street",
        city: "Test City",
        state: "Test State",
        zip: "Test Zip",
      },

      mwUmbrellaAccountNumber: "ABC123",

      mwAccountNumber: "456",
      mwSiteNumber: "789",
      mwContainers: [{
        coType: "Medical Waste",

        coCount: 2,
        coSize: 90,
        coUnit: "Gallon",
        coDescription: "Red Bag",

        coPrice: 101,
        coMinimumPerService: 102,
        coFrequencyByWeeks: 103,

        coPerServiceCost: 104,
        coMonthlyCost: 105,

        coExtraBoxCostHauler: 106,
        coExtraBoxCostCustomer: 107,


        //--------------------------------------- Hauler Info Below

        coHaulerCount: 4,
        coHaulerSize: 99,
        coHaulerUnit: "Kilo",
        coHaulerDescription: "Blue Bag",

        coHaulerPrice: 201,
        coHaulerMinimumPerService: 202,
        coHaulerFrequencyByWeeks: 203,

        coHaulerPerServiceCost: 204,
        coHaulerMonthlyCost: 205,

        coHaulerExtraBoxCostHauler: 206,
      }],

      mwPerServiceCost: 500,
      mwMonthlyCost: 501,
    },
    shredAccount: {
      id: 1,

      shAddress: {
        streetAddress: "123 Test Street",
        city: "Test City",
        state: "Test State",
        zip: "Test Zip",
      },

      shUmbrellaAccountNumber: "DEF456",

      shAccountNumber: "987",
      shSiteNumber: "654",
      shContainers: [{
        coType: "Document Destruction",

        coCount: 8,
        coSize: 190,
        coUnit: "Box",
        coDescription: "Red Box",

        coPrice: 301,
        coMinimumPerService: 302,
        coFrequencyByWeeks: 303,

        coPerServiceCost: 304,
        coMonthlyCost: 305,

        coExtraBoxCostHauler: 306,
        coExtraBoxCostCustomer: 307,


        //--------------------------------------- Hauler Info Below

        coHaulerCount: 16,
        coHaulerSize: 199,
        coHaulerUnit: "Big Box",
        coHaulerDescription: "Blue Box",

        coHaulerPrice: 401,
        coHaulerMinimumPerService: 402,
        coHaulerFrequencyByWeeks: 403,

        coHaulerPerServiceCost: 404,
        coHaulerMonthlyCost: 405,

        coHaulerExtraBoxCostHauler: 406,
      }

      ],

      shPerServiceCost: 600,
      shMonthlyCost: 601,
    }
  },

]
