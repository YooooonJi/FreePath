import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CardExpand from "./Card/CardExpand";

const CardContainer = styled.View`
  display: flex;
  flex-direction: column-reverse;
`;

const CardView = styled.View`
  margin-top: 15px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.card.bg};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  elevation: 4;
`;

const CardLeftBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

const CardOnOffBox = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.card.circle.bg};
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardOnOffText = styled.Text`
  color: ${(props) => props.theme.card.circle.text};
  font-size: 14px;
  font-weight: bold;
`;

const CardInfoBox = styled.View`
  display: flex;
  justify-content: center;
`;

const CardTitleText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.card.title};
  font-weight: bold;
  margin-bottom: 4px;
`;

const CardAddressText = styled.Text`
  margin-left: 1px;
  color: ${(props) => props.theme.card.addr};
  font-weight: bold;
  font-size: 12px;
`;

const CardTimeTagText = styled.Text`
  align-self: flex-start;
  color: ${(props) => props.theme.card.time.text};
  background-color: ${(props) => props.theme.card.time.bg};
  border-radius: 10px;
  font-size: 12px;
  padding: 2px 8px;
  font-weight: bold;
  margin-top: 4px;
`;

const CardRightBox = styled.View`
  min-width: 100px;
  max-width: 100px;
  width: 100px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-right: 10px;
`;

const TimeLeftText = styled.Text`
  color: ${(props) => props.theme.card.timer};
  font-size: 14px;
  margin-top: 12px;
  font-weight: bold;
`;

const CardSetupBox = styled.View`
  width: 50px;
  display: flex;
`;

const CardDeleteBox = styled.View`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  background-color: ${(props) => props.theme.card.edit.delete};
`;

const CardEditBox = styled.View`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 10px;
  background-color: ${(props) => props.theme.card.edit.update};
`;

const Card = ({ data, setup }) => {
  const [cardType, setCardType] = useState(-1);
  const [expandShow, setExpandShow] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const updownArr = ["", "상행", "하행"];

  useEffect(() => {
    if (data.updown === undefined) {
      setCardType(3);
    } else {
      setCardType(data.updown);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  // console.log(data.timetype);

  const splitTime = data.inputtime.split(" ")[1].split(":");

  const calcLeftTime = (term, sec) => {
    const dateSplit = term.split(" ");
    const split1 = dateSplit[0].split("-");
    const split2 = dateSplit[1].split(":");

    const arrivetime = new Date(
      Date.UTC(split1[0], split1[1] * 1 - 1, split1[2], split2[0], split2[1])
    );
    const now = new Date();
    const nowtime = new Date(
      Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      )
    );

    const timeInterval = (arrivetime - nowtime) / 1000;

    if (timeInterval < 0) {
      return "시간 초과";
    }

    const secToMinutes = parseInt(timeInterval / 60);
    const minToHours = parseInt(secToMinutes / 60);
    const leftMinutes = parseInt(secToMinutes - minToHours * 60);

    let returnTime = "";

    if (minToHours <= 0) {
      if (leftMinutes > 0) {
        returnTime += `${leftMinutes}분 후`;
      } else {
        returnTime += `${leftMinutes}분 이내`;
      }
    } else {
      returnTime += `${minToHours}시간 `;
      if (leftMinutes > 0) {
        returnTime += `${leftMinutes}분 후`;
      }
    }

    return returnTime;
  };

  return (
    <CardContainer>
      {cardType === 3 && expandShow && <CardExpand data={data.routeinfo} />}
      {cardType === 3 && (
        <CardView>
          <CardLeftBox>
            <CardOnOffBox>
              <Icon name="map" size={20} color="#FFFFFF" />
              <CardOnOffText>ON</CardOnOffText>
            </CardOnOffBox>
            <CardInfoBox>
              <CardTitleText>{data.alarmname}</CardTitleText>
              <CardAddressText>{data.startaddress}</CardAddressText>
              <CardAddressText>{data.endaddress}</CardAddressText>
              <CardTimeTagText>
                {data.timetype === 0
                  ? `막차`
                  : `${splitTime[0]}:${splitTime[1]}`}
              </CardTimeTagText>
            </CardInfoBox>
          </CardLeftBox>
          {!setup && (
            <CardRightBox>
              <TimeLeftText>
                {calcLeftTime(data.arrivetime, seconds)}
              </TimeLeftText>
              <Icon
                name={expandShow ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={30}
                color="rgba(0, 0, 0, 0.5)"
                onPress={() => {
                  setExpandShow(!expandShow);
                }}
              />
            </CardRightBox>
          )}
          {setup && (
            <CardSetupBox>
              <CardDeleteBox>
                <Icon name="delete" size={30} color="#ffffff" />
              </CardDeleteBox>
              <CardEditBox>
                <Icon name="edit" size={30} color="#ffffff" />
              </CardEditBox>
            </CardSetupBox>
          )}
        </CardView>
      )}
      {cardType === 0 && (
        <CardView>
          <CardLeftBox>
            <CardOnOffBox>
              <Icon name="map" size={20} color="#FFFFFF" />
              <CardOnOffText>ON</CardOnOffText>
            </CardOnOffBox>
            <CardInfoBox>
              <CardTitleText>{data.alarmname}</CardTitleText>
              <CardAddressText style={{ marginTop: 16 }}>
                {`${data.stationname}(${data.stationid}) - ${data.busno}번`}
              </CardAddressText>
              <CardTimeTagText>
                {`${splitTime[0]}:`}
                {`${splitTime[1]}`}
              </CardTimeTagText>
            </CardInfoBox>
          </CardLeftBox>
          {!setup && (
            <CardRightBox>
              <TimeLeftText>
                {/* {calcLeftTime(data.arrivetime, seconds)} */}
                반복 알림
              </TimeLeftText>
            </CardRightBox>
          )}
          {setup && (
            <CardSetupBox>
              <CardDeleteBox>
                <Icon name="delete" size={30} color="#ffffff" />
              </CardDeleteBox>
              <CardEditBox>
                <Icon name="edit" size={30} color="#ffffff" />
              </CardEditBox>
            </CardSetupBox>
          )}
        </CardView>
      )}
      {(cardType === 1 || cardType === 2) && (
        <CardView>
          <CardLeftBox>
            <CardOnOffBox>
              <Icon name="map" size={20} color="#FFFFFF" />
              <CardOnOffText>ON</CardOnOffText>
            </CardOnOffBox>
            <CardInfoBox>
              <CardTitleText>{data.alarmname}</CardTitleText>
              <CardAddressText style={{ marginTop: 16 }}>
                {`${data.stationname} ${data.updownname}`}
              </CardAddressText>
              <CardTimeTagText>
                {`${splitTime[0]}:`}
                {`${splitTime[1]}`}
              </CardTimeTagText>
            </CardInfoBox>
          </CardLeftBox>
          {!setup && (
            <CardRightBox>
              <TimeLeftText>
                {/* {calcLeftTime(data.arrivetime, seconds)} */}
                반복 알림
              </TimeLeftText>
            </CardRightBox>
          )}
          {setup && (
            <CardSetupBox>
              <CardDeleteBox>
                <Icon name="delete" size={30} color="#ffffff" />
              </CardDeleteBox>
              <CardEditBox>
                <Icon name="edit" size={30} color="#ffffff" />
              </CardEditBox>
            </CardSetupBox>
          )}
        </CardView>
      )}
    </CardContainer>
  );
};

export default Card;
