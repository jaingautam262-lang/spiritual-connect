import { jainPujanData_1 } from "./jainPujanData_1";
import { jainPujanData_2 } from "./jainPujanData_2";
import { jainPujanData_3 } from "./jainPujanData_3";

export interface PujaSection {
  name: string;
  text: string;
}

export interface JainPuja {
  id: string;
  title: string;
  titleEn: string;
  deity: string;
  description: string;
  faith: string;
  sections: PujaSection[];
}

export const jainPujanData: JainPuja[] = [
  ...jainPujanData_1,
  ...jainPujanData_2,
  ...jainPujanData_3,
];
