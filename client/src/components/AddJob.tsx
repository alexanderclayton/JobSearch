import React, { useState } from "react";
import { ELocation, ERate, TJob } from "../types";
import { useAuth } from "../context";

interface IAddJobProps {
  setJobModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddJob = ({ setJobModal }: IAddJobProps) => {
  const { token, user } = useAuth();
  const [addedJob, setAddedJob] = useState<TJob>({
    userId: user?._id,
    title: "",
    company: {
      name: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: 0,
      },
      companyType: "",
    },
    compensation: {
      salary: {
        amount: 0,
        rate: ERate.None,
      },
      benefits: [],
    },
    hours: "",
    tech: [],
    location: ELocation.Remote,
  });

  const [techValue, setTechValue] = useState({
    tech: "",
    qualified: false,
  });

  const [benefitValue, setBenefitValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string,
  ) => {
    const { value } = e.target;
    const updatedJob: TJob = { ...addedJob };
    const keys = id.split(".");
    let nestedObj: any = updatedJob;
    for (let i = 0; i < keys.length - 1; i++) {
      nestedObj = nestedObj[keys[i]];
    }
    const targetKey = keys[keys.length - 1];
    nestedObj[targetKey] = value;
    setAddedJob(updatedJob);
  };

  const handleAddTech = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addedJob.tech.push(techValue);
    setTechValue({
      tech: "",
      qualified: false,
    });
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setTechValue((prevTech) => ({
      ...prevTech,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeleteTech = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setAddedJob((prevJob) => ({
      ...prevJob,
      tech: prevJob.tech.filter((_, i) => i !== index),
    }));
  };

  const handleAddBenefit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addedJob.compensation.benefits.push(benefitValue);
    setBenefitValue("");
  };

  const handleBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenefitValue(e.target.value);
  };

  const handleDeleteBenefit = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setAddedJob((prevJob) => {
      const updatedBenefits = prevJob.compensation.benefits.filter(
        (_, i) => i !== index,
      );
      return {
        ...prevJob,
        compensation: {
          ...prevJob.compensation,
          benefits: updatedBenefits,
        },
      };
    });
  };

  const addJob = async (job: TJob) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/jobs/add_job", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Added job failed: ${errorData.message}`);
      } else {
        const data = await response.json();
        console.log("Successfully added job:", data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addJob(addedJob);
      setJobModal(false);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="m-8 max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">Add Job</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="mb-1 block font-medium">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                value={addedJob.title}
                onChange={(e) => handleChange(e, "title")}
                required
              />
            </div>
            <div>
              <label htmlFor="company.name" className="mb-1 block font-medium">
                Company Name
              </label>
              <input
                type="text"
                id="company.name"
                className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                value={addedJob.company.name}
                onChange={(e) => handleChange(e, "company.name")}
                required
              />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="company.address.street"
                className="mb-1 block font-medium"
              >
                Company Address
              </label>
              <input
                type="text"
                id="company.address.street"
                className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                value={addedJob.company.address.street}
                onChange={(e) => handleChange(e, "company.address.street")}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="company.address.city"
                  className="mb-1 block font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  id="company.address.city"
                  className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                  value={addedJob.company.address.city}
                  onChange={(e) => handleChange(e, "company.address.city")}
                />
              </div>
              <div>
                <label
                  htmlFor="company.address.state"
                  className="mb-1 block font-medium"
                >
                  State
                </label>
                <input
                  type="text"
                  id="company.address.state"
                  className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                  value={addedJob.company.address.state}
                  onChange={(e) => handleChange(e, "company.address.state")}
                />
              </div>
              <div>
                <label
                  htmlFor="company.address.zip"
                  className="mb-1 block font-medium"
                >
                  Zip
                </label>
                <input
                  type="number"
                  id="company.address.zip"
                  className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                  value={addedJob.company.address.zip}
                  onChange={(e) => handleChange(e, "company.address.zip")}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="company.companyType"
              className="mb-1 block font-medium"
            >
              Company Type
            </label>
            <input
              type="text"
              id="company.companyType"
              className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
              value={addedJob.company.companyType}
              onChange={(e) => handleChange(e, "company.companyType")}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label
                htmlFor="compensation.salary.amount"
                className="mb-1 block font-medium"
              >
                Salary Amount
              </label>
              <input
                type="number"
                id="compensation.salary.amount"
                className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                value={addedJob.compensation.salary.amount}
                onChange={(e) => handleChange(e, "compensation.salary.amount")}
              />
            </div>
            <div>
              <label
                htmlFor="compensation.salary.rate"
                className="block font-medium"
              >
                Rate
              </label>
              <select
                id="compensation.salary.rate"
                className="mt-1 block h-10 w-full rounded-md px-3 py-2 hover:cursor-pointer"
                value={addedJob.compensation.salary.rate}
                onChange={(e) => handleChange(e, "compensation.salary.rate")}
              >
                {Object.values(ERate).map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label htmlFor="hours" className="mb-1 block font-medium">
                Hours
              </label>
              <input
                type="text"
                id="hours"
                className="h-10 w-full rounded-md border border-gray-300 px-3 py-2"
                value={addedJob.hours}
                onChange={(e) => handleChange(e, "hours")}
              />
            </div>
            <div>
              <label htmlFor="location" className="block font-medium">
                Location
              </label>
              <select
                id="location"
                className="mt-1 block h-10 w-full rounded-md px-3 py-2 hover:cursor-pointer"
                value={addedJob.location}
                onChange={(e) => handleChange(e, "location")}
              >
                {Object.values(ELocation).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <label htmlFor="tech" className="mb-1 block font-medium">
                Technologies
              </label>
              <div className="flex h-10 w-full items-center rounded-md border border-gray-300 px-3 py-2">
                <input
                  type="text"
                  id="tech"
                  className="mr-2 w-full"
                  value={techValue.tech}
                  onChange={handleTechChange}
                />
                <label htmlFor="qualified" className="mx-1">
                  Qualified:
                </label>
                <input
                  type="checkbox"
                  id="qualified"
                  className="mx-2"
                  checked={techValue.qualified}
                  onChange={handleTechChange}
                />
                <button
                  className="mx-2 pb-1 text-2xl"
                  onClick={(e) => handleAddTech(e)}
                >
                  +
                </button>
              </div>
              <div className="flex flex-col items-start px-6">
                {addedJob.tech.map((techObject, idx) => (
                  <div
                    key={idx}
                    className="flex w-full items-center justify-between"
                  >
                    <p>{techObject.tech}</p>
                    {techObject.qualified === true ? (
                      <p className="text-xs text-green-700">Qualified</p>
                    ) : (
                      <p className="text-xs text-red-700">Unqualified</p>
                    )}
                    <button
                      className="text-xs text-red-500"
                      onClick={(e) => handleDeleteTech(e, idx)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="compensation.benefits"
                className="mb-1 block font-medium"
              >
                Benefits
              </label>
              <div className="flex h-10  w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 focus:ring">
                <input
                  type="text"
                  id="compensation.benefits"
                  className="mr-2 w-full"
                  value={benefitValue}
                  onChange={handleBenefitChange}
                />
                <button
                  className="pb-1 text-2xl"
                  onClick={(e) => handleAddBenefit(e)}
                >
                  +
                </button>
              </div>
              <div className="flex flex-col items-start px-6">
                {addedJob.compensation.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex w-full items-center justify-between"
                  >
                    <p>{benefit}</p>
                    <button
                      className="text-xs text-red-500"
                      onClick={(e) => handleDeleteBenefit(e, idx)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setJobModal(false)}
              className="ml-4 rounded-lg bg-gray-300 px-6 py-2 text-gray-800 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
