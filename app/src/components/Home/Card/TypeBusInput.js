import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  getStationByNameList,
  getRouteByStationList,
} from "../../../api/BusApi";

const TypeBusContainer = styled.View``;

const InputContainer = styled.View`
  margin-top: 10px;
  padding: 5px 10px 5px 10px;
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: #f9f1f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 3;
`;

const InputBox = styled.TextInput`
  width: 90%;
  height: 30px;
`;

const InputIconBox = styled.TouchableOpacity`
  z-index: 1;
`;

const TypeBusInput = () => {
  const [busStop, setBusStop] = useState("");
  const [busNo, setBusNo] = useState("");

  const selectBusNo = async (arsId) => {
    const { status, data } = await getRouteByStationList(arsId);

    if (status === 200) {
      const busNoList = data.ServiceResult.msgBody[0].itemList;

      console.log(`*** selectBusNo (${status}) : 버스 ${busNoList.length} ***`);
      console.log(busNoList);

      setBusNo(busNoList[0].busRouteNm[0]);
    }
  };

  const searchBusStop = async () => {
    setBusNo("");

    const { status, data } = await getStationByNameList(busStop);

    if (status === 200) {
      const busStopList = data.ServiceResult.msgBody[0].itemList;

      console.log(
        `*** searchBusStop (${status}) : 버스 정류장 ${busStopList.length} ***`
      );
      console.log(busStopList);

      setBusStop(busStopList[0].stNm[0]);
      selectBusNo(busStopList[0].arsId[0]);
    }
  };

  return (
    <TypeBusContainer>
      <InputContainer>
        <InputBox
          placeholder="정류장을 입력해주세요."
          onChangeText={setBusStop}
          onFocus={() => setBusStop("")}
          value={busStop}
        />
        {busStop !== "" && (
          <InputIconBox onPress={() => searchBusStop()}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
      <InputContainer>
        <InputBox placeholder="버스를 선택해주세요." value={busNo} />
      </InputContainer>
    </TypeBusContainer>
  );
};

export default TypeBusInput;
