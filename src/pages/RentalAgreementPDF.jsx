import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  signature: { marginTop: 20, textAlign: "center", fontSize: 12 },
});

const RentalAgreementPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Rental Agreement</Text>
      <View style={styles.section}>
        <Text style={styles.text}>
          This rental agreement is made between <Text style={{ fontWeight: "bold" }}>{formData.ownerName}</Text> (Owner) and{" "}
          <Text style={{ fontWeight: "bold" }}>{formData.tenantName}</Text> (Tenant) for the property located at{" "}
          <Text style={{ fontWeight: "bold" }}>{formData.rentalAddress}</Text>.
        </Text>
        <Text style={styles.text}>
          The agreement is effective from <Text style={{ fontWeight: "bold" }}>{formData.startDate}</Text> to{" "}
          <Text style={{ fontWeight: "bold" }}>{formData.endDate}</Text>.
        </Text>
        <Text style={styles.text}>
          The monthly rent is ₹<Text style={{ fontWeight: "bold" }}>{formData.rentAmount}</Text> and the security deposit is ₹
          <Text style={{ fontWeight: "bold" }}>{formData.securityDeposit}</Text>.
        </Text>
        <Text style={styles.text}>Owner Contact: {formData.ownerPhone}, {formData.ownerEmail}</Text>
        <Text style={styles.text}>Tenant Contact: {formData.tenantPhone}, {formData.tenantEmail}</Text>
      </View>
      <Text style={styles.signature}>___________________ Owner</Text>
      <Text style={styles.signature}>___________________ Tenant</Text>
    </Page>
  </Document>
);

export default RentalAgreementPDF;
