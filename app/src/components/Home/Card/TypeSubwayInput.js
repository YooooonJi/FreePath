import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalSelector from "react-native-modal-selector";
import {
  searchInfoBySubwayNameService,
  SearchSTNBySubwayLineInfo,
} from "../../../api/SubwayApi";

const TypeSubwayContainer = styled.View``;

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

let subwayStationList;
let nextSubwayStation;

const TypeSubwayInput = () => {
  const [subwayStation, setSubwayStation] = useState("");
  const [subwayLine, setSubwayLine] = useState("");
  const [subwayUpdown, setSubwayUpdown] = useState(0);
  const [popModal, setPopModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const subwayStationInput = useRef();

  const findNextSubwayStation = async (index, key) => {
    const { status, data } = await SearchSTNBySubwayLineInfo(
      subwayStationList[index].LINE_NUM
    );

    if (status === 200) {
      const subwayLineList = data.SearchSTNBySubwayLineInfo.row;

      subwayLineList.sort((a, b) => {
        if (a.FR_CODE > b.FR_CODE) {
          return 1;
        }
        if (a.FR_CODE < b.FR_CODE) {
          return -1;
        }
        return 0;
      });

      const order = subwayLineList.findIndex(
        (station) => station.FR_CODE === subwayStationList[index].FR_CODE
      );

      if (key % 2 === 0 && order > 0) {
        nextSubwayStation = `(${subwayLineList[order - 1].STATION_NM} 방향)`;
      } else if (key % 2 === 1 && order + 1 < subwayLineList.length) {
        nextSubwayStation = `(${subwayLineList[order + 1].STATION_NM} 방향)`;
      } else {
        nextSubwayStation = "";
      }
    }
  };

  const searchSubwayStation = async () => {
    const { status, data } = await searchInfoBySubwayNameService(subwayStation);

    if (status === 200 && typeof data.RESULT === "undefined") {
      subwayStationList = data.SearchInfoBySubwayNameService.row;

      const temp = [{ key: -1, section: true, label: "지하철 구독" }];

      for (let key = 0; key < 2 * subwayStationList.length; key += 1) {
        const index = parseInt(key / 2, Number);

        temp.push({
          key,
          label: `${subwayStationList[index].STATION_NM} ${
            subwayStationList[index].LINE_NUM
          } ${key % 2 === 0 ? "상행" : "하행"}`,
        });
      }

      subwayStationInput.current.blur();
      setModalData(temp);
      setPopModal(true);
    } else {
      alert("지하철 역 검색에 실패했습니다.");
    }
  };

  const selectSubwayInfo = async (key) => {
    const index = parseInt(key / 2, Number);

    await findNextSubwayStation(index, key);

    setSubwayStation(subwayStationList[index].STATION_NM);
    setSubwayLine(
      `${subwayStationList[index].LINE_NUM} ${
        key % 2 === 0 ? "상행" : "하행"
      } ${nextSubwayStation}`
    );
    setSubwayUpdown((key % 2) + 1);
  };

  return (
    <TypeSubwayContainer>
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
            selectSubwayInfo(option.key);
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
          placeholder="지하철역을 입력해주세요."
          onChangeText={setSubwayStation}
          onFocus={() => {
            setSubwayStation("");
            setSubwayLine("");
          }}
          value={subwayStation}
          ref={subwayStationInput}
        />
        {subwayStation !== "" && (
          <InputIconBox onPress={() => searchSubwayStation()}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
      <InputContainer>
        <InputBox
          placeholder="호선을 선택해주세요."
          value={subwayLine}
          editable={false}
        />
      </InputContainer>
    </TypeSubwayContainer>
  );
};

export default TypeSubwayInput;
