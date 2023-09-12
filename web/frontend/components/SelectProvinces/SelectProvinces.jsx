import { Select } from "@shopify/polaris";
import React, { useCallback } from "react";

const SelectProvinces = ({ provinces, province, setProvince }) => {
  const handleSelectChange = useCallback((code) => setProvince(code), []);

  const opctions = [];

  if (provinces) {
    opctions.push({ label: "", value: "", key: "" });
    provinces.map((prov) => {
      opctions.push({ label: prov.name, value: prov.code, key: prov.code });
    });
  }

  return (
    <Select
      label="Provincia"
      options={opctions}
      onChange={handleSelectChange}
      value={province ? province : ""}
      requiredIndicator
    />
  );
};

export default SelectProvinces;
