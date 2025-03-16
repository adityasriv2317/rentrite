import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#F3F4F6" }, // Match bg-gray-100
  container: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  }, // Card styling
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  text: { fontSize: 12, marginBottom: 8, textAlign: "justify" },
  bold: { fontWeight: "bold" },
  section: { marginBottom: 10 },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  signatureText: { fontSize: 12, textAlign: "center" },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textDecoration: "underline",
  },
  contactInfo: { marginBottom: 10 },
  signatureLine: { marginTop: 40, textAlign: "center" },
});

const RentalAgreementPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Rental Agreement</Text>

        <View style={styles.section}>
          <Text style={styles.header}>Parties</Text>
          <Text style={styles.text}>
            This rental agreement is made between{" "}
            <Text style={styles.bold}>{formData.ownerName}</Text> (Owner) and{" "}
            <Text style={styles.bold}>{formData.tenantName}</Text> (Tenant) for
            the property located at{" "}
            <Text style={styles.bold}>{formData.rentalAddress}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Term</Text>
          <Text style={styles.text}>
            The agreement is effective from{" "}
            <Text style={styles.bold}>{formData.startDate}</Text> to{" "}
            <Text style={styles.bold}>{formData.endDate}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Rent and Deposit</Text>
          <Text style={styles.text}>
            The monthly rent is INR.{" "}
            <Text style={styles.bold}>{formData.rentAmount}</Text> and the
            security deposit is INR.{" "}
            <Text style={styles.bold}>{formData.securityDeposit}</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Contact Information</Text>
          <Text style={styles.contactInfo}>
            <Text style={styles.bold}>Owner Contact:</Text>{" "}
            {formData.ownerPhone}, {formData.ownerEmail}
          </Text>
          <Text style={styles.contactInfo}>
            <Text style={styles.bold}>Tenant Contact:</Text>{" "}
            {formData.tenantPhone}, {formData.tenantEmail}
          </Text>
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 15,
          }}
        >
          Signatures
        </Text>
        <View style={styles.signatures}>
          <View style={styles.signatureLine}>
            <Text>___________________</Text>
            <Text style={styles.signatureText}>Owner</Text>
          </View>
          <View style={styles.signatureLine}>
            <Text>___________________</Text>
            <Text style={styles.signatureText}>Tenant</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default RentalAgreementPDF;
