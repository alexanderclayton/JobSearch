export type TJob = {
  _id?: string | undefined;
  userId: string;
  title: string;
  company: TCompany;
  compensation: TCompensation;
  hours: string;
  tech: TTech[];
  location: ELocation;
  __v?: number;
};

export type TAddress = {
  street: string;
  city: string;
  state: string;
  zip: number;
};

export type TCompany = {
  name: string;
  address: TAddress;
  companyType: string;
};

export enum ERate {
  Hourly = "hourly",
  Annual = "annual",
  None = "none",
}

export type TSalary = {
  amount: number;
  rate: ERate;
};

export type TCompensation = {
  salary: TSalary;
  benefits: string[];
};

export type TTech = {
  tech: string;
  qualified: boolean;
};

export enum ELocation {
  Onsite = "onsite",
  Remote = "remote",
  Hybrid = "hybrid",
}
