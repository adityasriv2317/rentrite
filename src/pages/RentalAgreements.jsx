import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RentalAgreementPDF from "./RentalAgreementPDF";
import Chatbot from "../components/Chatbot";

function RentalAgreement() {
  const [formData, setFormData] = useState({
    ownerName: "",
    tenantName: "",
    ownerPhone: "",
    tenantPhone: "",
    ownerEmail: "",
    tenantEmail: "",
    rentalAddress: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    securityDeposit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClearForm = () => {
    setFormData({
      ownerName: "",
      tenantName: "",
      ownerPhone: "",
      tenantPhone: "",
      ownerEmail: "",
      tenantEmail: "",
      rentalAddress: "",
      startDate: "",
      endDate: "",
      rentAmount: "",
      securityDeposit: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Form Section */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold text-center mb-6">
          Rental Agreement Generator
        </h1>
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Owner Details */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-lg font-semibold">Owner Details</legend>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Owner Name"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              placeholder="Owner Phone"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="email"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              placeholder="Owner Email"
              className="w-full border p-2 rounded"
            />
          </fieldset>
          {/* Tenant Details */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-lg font-semibold">Tenant Details</legend>
            <input
              type="text"
              name="tenantName"
              value={formData.tenantName}
              onChange={handleChange}
              placeholder="Tenant Name"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="tenantPhone"
              value={formData.tenantPhone}
              onChange={handleChange}
              placeholder="Tenant Phone"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="email"
              name="tenantEmail"
              value={formData.tenantEmail}
              onChange={handleChange}
              placeholder="Tenant Email"
              className="w-full border p-2 rounded"
            />
          </fieldset>
          {/* Rental Property Details */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-lg font-semibold">
              Rental Property Details
            </legend>
            <input
              type="text"
              name="rentalAddress"
              value={formData.rentalAddress}
              onChange={handleChange}
              placeholder="Rental Address"
              className="w-full border p-2 rounded"
            />
          </fieldset>
          {/* Duration */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-lg font-semibold">
              Agreement Duration
            </legend>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </fieldset>
          {/* Payments and Security Deposit */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-lg font-semibold">Financial Details</legend>
            <input
              type="number"
              name="rentAmount"
              value={formData.rentAmount}
              onChange={handleChange}
              placeholder="Rent Amount (₹)"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              placeholder="Security Deposit (₹)"
              className="w-full border p-2 rounded"
            />
          </fieldset>
        </div>
        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleClearForm}
            className="bg-red-500 text-white px-4 py-2 rounded w-1/2 mr-2"
          >
            Clear Form
          </button>
          <PDFDownloadLink
            document={<RentalAgreementPDF formData={formData} />}
            fileName="rental_agreement.pdf"
            className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 ml-2 text-center"
          >
            {({ loading }) => (loading ? "Generating..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      </div>

      {/* live preview */}
      <div
        className="md:w-1/2 p-6 h-fit border rounded-lg bg-gray-100"
      >
        <h2 className="text-2xl font-bold text-center">Rental Agreement</h2>
        <p className="mt-4">
          This rental agreement is made between <b>{formData.ownerName}</b>{" "}
          (Owner) and <b>{formData.tenantName}</b> (Tenant) for the property
          located at <b>{formData.rentalAddress}</b>.
        </p>
        <p className="mt-2">
          The agreement is effective from <b>{formData.startDate}</b> to{" "}
          <b>{formData.endDate}</b>.
        </p>
        <p className="mt-2">
          The monthly rent is <b>₹{formData.rentAmount}</b> and the security
          deposit is <b>₹{formData.securityDeposit}</b>.
        </p>
        <p className="mt-4">
          Owner Contact: {formData.ownerPhone}, {formData.ownerEmail}
        </p>
        <p className="mt-2">
          Tenant Contact: {formData.tenantPhone}, {formData.tenantEmail}
        </p>
        <p className="mt-6 text-center font-bold">Signatures:</p>
        <div className="flex justify-between mt-4">
          <p>
            ___________________
            <br />
            Owner
          </p>
          <p>
            ___________________
            <br />
            Tenant
          </p>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default RentalAgreement;
