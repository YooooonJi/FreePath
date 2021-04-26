import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 90vh;
`;

const Text = styled.div`
  color: #aea1ea;
  font-size: 70px;
  font-weight: bold;
  margin: 40px 0px;
`;

function App() {
  return (
    <Container>
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
      <Text>COMING SOON</Text>
    </Container>
  );
}

export default App;
