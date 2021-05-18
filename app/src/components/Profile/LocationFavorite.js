import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalSelector from "react-native-modal-selector";
import firebase from "firebase";
import Constants from "expo-constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { updateLocation } from "../../api/UserApi";

const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 35px;
`;

const LocationIconBox = styled.TouchableOpacity`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
  elevation: 3;
`;

const DataView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DataTextInput = styled.TextInput`
  padding: 5px;
  width: 100%;
  text-align: center;
`;

const DataTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

const LocationFavorite = ({ location }) => {
  const [popModal1, setPopModal1] = useState(false);
  const [address1, setAddress1] = useState();
  const [latitude1, setLatitude1] = useState();
  const [longitude1, setLongitude1] = useState();
  const [popModal2, setPopModal2] = useState(false);
  const [address2, setAddress2] = useState();
  const [latitude2, setLatitude2] = useState();
  const [longitude2, setLongitude2] = useState();
  const [popModal3, setPopModal3] = useState(false);
  const [address3, setAddress3] = useState();
  const [latitude3, setLatitude3] = useState();
  const [longitude3, setLongitude3] = useState();
  const [popModal4, setPopModal4] = useState(false);
  const [address4, setAddress4] = useState();
  const [latitude4, setLatitude4] = useState();
  const [longitude4, setLongitude4] = useState();

  const searchAddress = async (
    address,
    setAddress,
    setLatitude,
    setLongitude
  ) => {
    const restApiKey = Constants.manifest.extra.kakaoRestApiKey;
    const url = "https://dapi.kakao.com/v2/local/search/address.json";
    const getQuery = `?query=${address}`;

    await fetch(url + getQuery, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.meta.total_count === 0) {
          alert("검색 결과가 없습니다.");
          setAddress();
        } else {
          const arrivalInfo = response.documents[0];
          setAddress(arrivalInfo.address_name);
          setLatitude(arrivalInfo.x);
          setLongitude(arrivalInfo.y);
        }
      })
      .catch();
  };

  useEffect(() => {
    for (let i = 0; i < location.length; i++) {
      switch (location[i].locationid.lacationtype) {
        case 1:
          setAddress1(location[i].address);
          setLatitude1(location[i].latitude);
          setLongitude1(location[i].longitude);
          break;
        case 2:
          setAddress2(location[i].address);
          setLatitude2(location[i].latitude);
          setLongitude2(location[i].longitude);
          break;
        case 3:
          setAddress3(location[i].address);
          setLatitude3(location[i].latitude);
          setLongitude3(location[i].longitude);
          break;
        case 4:
          setAddress4(location[i].address);
          setLatitude4(location[i].latitude);
          setLongitude4(location[i].longitude);
          break;
        default:
          break;
      }
    }
  }, []);

  const data1 = [
    { key: 0, section: true, label: "집 주소 입력" },
    {
      key: 1,
      label: "",
      component: (
        <DataView>
          <DataTextInput
            value={address1}
            placeholder="주소 입력"
            onChangeText={setAddress1}
          />
          <DataTouchable
            onPress={() =>
              searchAddress(
                address1,
                setAddress1,
                setLatitude1,
                setLongitude1,
                setPopModal1
              )
            }
          >
            <MaterialIcons name="search" size={20} color="rgba(0, 0, 0, 1)" />
          </DataTouchable>
        </DataView>
      ),
    },
  ];

  const data2 = [
    { key: 0, section: true, label: "회사 주소 입력" },
    {
      key: 1,
      label: "",
      component: (
        <DataView>
          <DataTextInput
            value={address2}
            placeholder="주소 입력"
            onChangeText={setAddress2}
          />
          <DataTouchable
            onPress={() =>
              searchAddress(
                address2,
                setAddress2,
                setLatitude2,
                setLongitude2,
                setPopModal2
              )
            }
          >
            <MaterialIcons name="search" size={20} color="rgba(0, 0, 0, 1)" />
          </DataTouchable>
        </DataView>
      ),
    },
  ];

  const data3 = [
    { key: 0, section: true, label: "장소 주소 입력" },
    {
      key: 1,
      label: "",
      component: (
        <DataView>
          <DataTextInput
            value={address3}
            placeholder="주소 입력"
            onChangeText={setAddress3}
          />
          <DataTouchable
            onPress={() =>
              searchAddress(
                address3,
                setAddress3,
                setLatitude3,
                setLongitude3,
                setPopModal3
              )
            }
          >
            <MaterialIcons name="search" size={20} color="rgba(0, 0, 0, 1)" />
          </DataTouchable>
        </DataView>
      ),
    },
  ];

  const data4 = [
    { key: 0, section: true, label: "장소 주소 입력" },
    {
      key: 1,
      label: "",
      component: (
        <DataView>
          <DataTextInput
            value={address4}
            placeholder="주소 입력"
            onChangeText={setAddress4}
          />
          <DataTouchable
            onPress={() =>
              searchAddress(
                address4,
                setAddress4,
                setLatitude4,
                setLongitude4,
                setPopModal4
              )
            }
          >
            <MaterialIcons name="search" size={20} color="rgba(0, 0, 0, 1)" />
          </DataTouchable>
        </DataView>
      ),
    },
  ];

  return (
    <LocationContainer>
      <ModalSelector
        data={data1}
        style={{
          position: "absolute",
        }}
        touchableStyle={{ display: "none" }}
        childrenContainerStyle={{ display: "none" }}
        initValueTextStyle={{ display: "none" }}
        optionStyle={{ padding: 0 }}
        optionTextStyle={{ display: "none" }}
        optionContainerStyle={{ padding: 0 }}
        sectionStyle={{ padding: 10 }}
        initValue=""
        cancelText="저장"
        onModalClose={async () => {
          const req = {
            address: address1,
            latitude: latitude1,
            locationtype: 1,
            longitude: longitude1,
            uid: firebase.auth().currentUser.uid,
          };
          const { status } = await updateLocation(req);
          if (status === 200) {
            setPopModal1(false);
          }
        }}
        visible={popModal1}
      />
      <ModalSelector
        data={data2}
        style={{
          position: "absolute",
        }}
        touchableStyle={{ display: "none" }}
        childrenContainerStyle={{ display: "none" }}
        initValueTextStyle={{ display: "none" }}
        optionStyle={{ padding: 0 }}
        optionTextStyle={{ display: "none" }}
        optionContainerStyle={{ padding: 0 }}
        sectionStyle={{ padding: 10 }}
        initValue=""
        cancelText="저장"
        onModalClose={async () => {
          const req = {
            address: address2,
            latitude: latitude2,
            locationtype: 2,
            longitude: longitude2,
            uid: firebase.auth().currentUser.uid,
          };
          const { status } = await updateLocation(req);
          if (status === 200) {
            setPopModal2(false);
          }
        }}
        visible={popModal2}
      />
      <ModalSelector
        data={data3}
        style={{
          position: "absolute",
        }}
        touchableStyle={{ display: "none" }}
        childrenContainerStyle={{ display: "none" }}
        initValueTextStyle={{ display: "none" }}
        optionStyle={{ padding: 0 }}
        optionTextStyle={{ display: "none" }}
        optionContainerStyle={{ padding: 0 }}
        sectionStyle={{ padding: 10 }}
        initValue=""
        cancelText="저장"
        onModalClose={async () => {
          const req = {
            address: address3,
            latitude: latitude3,
            locationtype: 3,
            longitude: longitude3,
            uid: firebase.auth().currentUser.uid,
          };
          const { status } = await updateLocation(req);
          if (status === 200) {
            setPopModal3(false);
          }
        }}
        visible={popModal3}
      />
      <ModalSelector
        data={data4}
        style={{
          position: "absolute",
        }}
        touchableStyle={{ display: "none" }}
        childrenContainerStyle={{ display: "none" }}
        initValueTextStyle={{ display: "none" }}
        optionStyle={{ padding: 0 }}
        optionTextStyle={{ display: "none" }}
        optionContainerStyle={{ padding: 0 }}
        sectionStyle={{ padding: 10 }}
        initValue=""
        cancelText="저장"
        onModalClose={async () => {
          const req = {
            address: address4,
            latitude: latitude4,
            locationtype: 4,
            longitude: longitude4,
            uid: firebase.auth().currentUser.uid,
          };
          const { status } = await updateLocation(req);
          if (status === 200) {
            setPopModal4(false);
          }
        }}
        visible={popModal4}
      />
      <LocationIconBox onPress={() => setPopModal1(true)}>
        <MaterialCommunityIcons name="home-heart" size={40} color="#BBB27E" />
      </LocationIconBox>
      <LocationIconBox onPress={() => setPopModal2(true)}>
        <MaterialCommunityIcons
          name="wallet-travel"
          size={40}
          color="#8C837C"
        />
      </LocationIconBox>
      <LocationIconBox onPress={() => setPopModal3(true)}>
        <MaterialCommunityIcons name="flag" size={40} color="#ABC2E0" />
      </LocationIconBox>
      <LocationIconBox onPress={() => setPopModal4(true)}>
        <MaterialCommunityIcons name="flag" size={40} color="#ABC2E0" />
      </LocationIconBox>
    </LocationContainer>
  );
};

export default LocationFavorite;
