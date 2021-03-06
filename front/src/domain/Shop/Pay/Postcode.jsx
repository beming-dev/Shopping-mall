import React from 'react'
import DaumPostcode from 'react-daum-postcode';

const Postcode = () => {
    const handleComplete = (data) => {
        let postcode = document.querySelector('#postcode');
        let address = document.querySelector('#address');

      let fullAddress = data.address;
      let extraAddress = ''; 
      
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      }
  
      postcode.value = data.zonecode;
      address.value = fullAddress;
    }
  
    return (
      <DaumPostcode
        onComplete={handleComplete}
      />
    );
  }

  export default Postcode;