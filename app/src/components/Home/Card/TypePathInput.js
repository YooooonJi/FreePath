import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalSelector from "react-native-modal-selector";
import {
  searchLocationByAddress,
  searchLocationByKeyword,
} from "../../../api/LocationApi";

const TypePathContainer = styled.View``;

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

let departureList;
let arrivalList;

const TypePathInput = (props) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [popModal, setPopModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalMode, setModalMode] = useState(0);
  const departureInput = useRef();
  const arrivalInput = useRef();

  const makeModalData = (search, location, array) => {
    const temp = [
      {
        key: -1,
        section: true,
        label: location === 0 ? "출발지" : "도착지",
      },
    ];

    for (let index = 0; index < array.length; index += 1) {
      temp.push({
        key: index,
        label:
          search === 0 ? array[index].address_name : array[index].place_name,
      });
    }

    setModalData(temp);
    setModalMode(location);
    setPopModal(true);
  };

  const searchAddress = async (location) => {
    const { status, data } = await searchLocationByAddress(
      location === 0 ? departure : arrival
    );

    if (status !== 200 || data.meta.total_count === 0) {
      const { status, data } = await searchLocationByKeyword(
        location === 0 ? departure : arrival
      );

      if (status !== 200 || data.meta.total_count === 0) {
        alert(`${location === 0 ? "출발지" : "도착지"} 검색 결과가 없습니다.`);
      } else if (location === 0) {
        departureList = data.documents;
        makeModalData(1, location, departureList);
      } else {
        arrivalList = data.documents;
        makeModalData(1, location, arrivalList);
      }
    } else if (location === 0) {
      departureList = data.documents;
      makeModalData(0, location, departureList);
    } else {
      arrivalList = data.documents;
      makeModalData(0, location, arrivalList);
    }
  };

  const selectDeparture = (option) => {
    setDeparture(option.label);
    props.getInputValue1(departureList[option.key]);
    departureInput.current.blur();
  };

  const selectArrival = (option) => {
    setArrival(option.label);
    props.getInputValue2(arrivalList[option.key]);
    arrivalInput.current.blur();
  };

  return (
    <TypePathContainer>
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
              selectDeparture(option);
            } else {
              selectArrival(option);
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
          placeholder="출발지를 입력해주세요."
          onChangeText={setDeparture}
          onFocus={() => setDeparture("")}
          value={departure}
          ref={departureInput}
        />
        {departure !== "" && (
          <InputIconBox onPress={() => searchAddress(0)}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
      <InputContainer>
        <InputBox
          placeholder="도착지를 입력해주세요."
          onChangeText={setArrival}
          onFocus={() => setArrival("")}
          value={arrival}
          ref={arrivalInput}
        />
        {arrival !== "" && (
          <InputIconBox onPress={() => searchAddress(1)}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
    </TypePathContainer>
  );
};

export default TypePathInput;
