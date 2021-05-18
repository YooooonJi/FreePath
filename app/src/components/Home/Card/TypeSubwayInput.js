import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalSelector from "react-native-modal-selector";
import { searchInfoBySubwayNameService } from "../../../api/SubwayApi";

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
`;

const InputIconBox = styled.TouchableOpacity`
  z-index: 1;
`;

const TypeSubwayInput = () => {
  const [subwayStation, setSubwayStation] = useState("");
  const [subwayLine, setSubwayLine] = useState("");
  const [popModal, setPopModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const subwayStationInput = useRef();
  let subwayStationList;

  const searchSubwayStation = async () => {
    const { status, data } = await searchInfoBySubwayNameService(subwayStation);

    if (status === 200 && typeof data.RESULT === "undefined") {
      subwayStationList = data.SearchInfoBySubwayNameService.row;

      const temp = [{ key: 0, section: true, label: "지하철 구독" }];

      for (let index = 0; index < subwayStationList.length; index += 1) {
        for (let way = 1; way <= 2; way += 1) {
          temp.push({
            key: way === 1 ? 2 * index + 1 : 2 * (index + 1),
            label: `${subwayStationList[index].STATION_NM} ${
              subwayStationList[index].LINE_NUM
            } ${way === 1 ? "상행" : "하행"}`,
          });
        }
      }

      subwayStationInput.current.blur();
      setModalData(temp);
      setPopModal(true);
    } else {
      alert("지하철 역 검색에 실패했습니다.");
    }
  };

  const selectSubwayInfo = (key) => {
    console.log(`select : ${key}`);

    // console.log(subwayStationList);
    // setSubwayStation(subwayStationList[key - 1].STATION_NM);
    // setSubwayLine(subwayStationList[key - 1].LINE_NUM);
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
          placeholder="역 이름을 입력해주세요."
          onChangeText={setSubwayStation}
          onFocus={() => setSubwayStation("")}
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
          placeholder="역 이름을 입력하고 라인을 선택해주세요."
          value={subwayLine}
          editable={false}
        />
      </InputContainer>
    </TypeSubwayContainer>
  );
};

export default TypeSubwayInput;
