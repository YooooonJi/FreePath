import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalSelector from "react-native-modal-selector";
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
  color: ${(props) => (props.editable ? "black" : "black")};
`;

const InputIconBox = styled.TouchableOpacity`
  z-index: 1;
`;

let busStopList;
let busNoList;

const TypeBusInput = ({ getInputValue1, getInputValue2 }) => {
  const [busStop, setBusStop] = useState("");
  const [busStopArsId, setBusStopArsId] = useState("");
  const [busNo, setBusNo] = useState("");
  const [popModal, setPopModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalMode, setModalMode] = useState(0);
  const busStopInput = useRef();

  const selectBusNo = (index) => {
    setBusNo(busNoList[index].busRouteNm[0]);
    getInputValue2(busNoList[index].busRouteNm[0]);
  };

  const searchBusNo = async (arsId) => {
    const { status, data } = await getRouteByStationList(arsId);

    if (status === 200) {
      busNoList = data.ServiceResult.msgBody[0].itemList;

      const temp = [{ key: -1, section: true, label: "버스 번호" }];

      for (let index = 0; index < busNoList.length; index += 1) {
        temp.push({
          key: index,
          label: busNoList[index].busRouteNm[0],
        });
      }

      setModalData(temp);
      setModalMode(1);
      setPopModal(true);
    }
  };

  const searchBusStop = async () => {
    setBusNo("");

    const { status, data } = await getStationByNameList(busStop.split(" ")[0]);

    if (
      status === 200 &&
      data.ServiceResult.msgHeader[0].headerMsg[0] !== "결과가 없습니다."
    ) {
      busStopList = data.ServiceResult.msgBody[0].itemList;

      const temp = [{ key: -1, section: true, label: "버스 정류장" }];

      for (let index = 0; index < busStopList.length; index += 1) {
        temp.push({
          key: index,
          label: `${busStopList[index].arsId[0]} ${busStopList[index].stNm[0]}`,
        });
      }

      setModalData(temp);
      setModalMode(0);
      setPopModal(true);
    } else {
      alert("버스 정류장 검색에 실패했습니다.");
    }
  };

  const selectBusStop = (index) => {
    setBusStop(
      `${busStopList[index].stNm[0]} (${busStopList[index].arsId[0]})`
    );
    setBusStopArsId(busStopList[index].arsId[0]);
    getInputValue1(busStopList[index]);

    busStopInput.current.blur();
  };

  return (
    <TypeBusContainer>
      {popModal && (
        <ModalSelector
          data={modalData}
          style={{
            position: "absolute",
          }}
          touchableStyle={{ display: "none" }}
          childrenContainerStyle={{ display: "none" }}
          initValueTextStyle={{ display: "none" }}
          sectionStyle={{ padding: 10 }}
          initValue=""
          cancelText="닫기"
          onChange={async (option) => {
            if (modalMode === 0) {
              selectBusStop(option.key);
            } else {
              selectBusNo(option.key);
            }
            setPopModal(false);
          }}
          onModalClose={() => {
            setPopModal(false);
          }}
          visible={popModal}
        />
      )}
      <InputContainer>
        <InputBox
          placeholder="정류장을 입력해주세요."
          onChangeText={setBusStop}
          onFocus={() => {
            setBusStop("");
            setBusStopArsId("");
            setBusNo("");
          }}
          value={busStop}
          ref={busStopInput}
        />
        {busStop !== "" && (
          <InputIconBox onPress={() => searchBusStop()}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
      <InputContainer>
        <InputBox
          placeholder="버스를 선택해주세요."
          value={busNo}
          editable={false}
        />
        {busStopArsId !== "" && (
          <InputIconBox onPress={() => searchBusNo(busStopArsId)}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
    </TypeBusContainer>
  );
};

export default TypeBusInput;
