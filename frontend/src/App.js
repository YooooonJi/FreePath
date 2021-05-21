import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  width: 98vw;
`;

// const Text = styled.div`
//   color: #aea1ea;
//   font-size: 70px;
//   font-weight: bold;
//   margin: 40px 0px;
// `;

function App() {
  return (
    <Container>
      <img
        src={`${process.env.PUBLIC_URL}/logo_blue.png`}
        alt="logo"
        width="265"
        height="265"
      />
      <img
        src={`https://api.qr-code-generator.com/v1/create?access-token=QdQaaVLG8ai3D7p4Ne7ZrQdXaED7H_tCnXda1xb__x-7J8hLnrlXsU7bBMMIzoVF&frame_name=no-frame&image_format=PNG&image_width=500&qr_code_id=23049307&rnd=1621539471109`}
        alt="logo"
        width="300"
        height="300"
      />
    </Container>
  );
}

export default App;
