// import styled from "styled-components";
// const FilterBrand = () => {
//   const handleOnChange = (e) => {
//     console.log(e.target.checked);
//     console.log(e.target.value);
//   };
//   return (
//     <>
//       <h1>BRAND</h1>
//       <BrandFilter>
//         <label htmlFor="brand">
//           <input type="checkbox" id="brand" value={} onChange={handleOnChange} />
//           Samsung
//         </label>
//       </BrandFilter>
//     </>
//   );
// };

// export default FilterBrand;

// const BrandFilter = styled.div`
//   width: 300px;
//   height: 600px;
//   background-color: grey;
// `;

import { useState } from "react";
function CheckboxFilter() {
  const [brands, setBrands] = useState([
    { name: "Samsung", checked: false },
    { name: "Apple", checked: false },
    { name: "OnePlus", checked: false },
    // Add more brands as needed
  ]);

  const handleCheckboxChange = (event, brandName) => {
    const updatedBrands = brands.map((brand) =>
      brand.name === brandName
        ? { ...brand, checked: event.target.checked }
        : brand
    );
    setBrands(updatedBrands);
  };

  return (
    <div>
      <h3>Filter by Brand:</h3>
      {brands.map((brand) => (
        <div key={brand.name}>
          <label>
            <input
              type="checkbox"
              checked={brand.checked}
              onChange={(event) => handleCheckboxChange(event, brand.name)}
            />
            {brand.name}
          </label>
        </div>
      ))}

      <h4>Checked Brands:</h4>
      {brands
        .filter((brand) => brand.checked)
        .map((brand) => (
          <div key={brand.name}>{brand.name}</div>
        ))}
    </div>
  );
}

export default CheckboxFilter;
