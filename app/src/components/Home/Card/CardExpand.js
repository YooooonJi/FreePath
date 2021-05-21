import React from "react";
import { Dimensions, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PathTransport from "./PathTransport";
import PathWalk from "./PathWalk";
import PathDetail from "./PathDetail";
import BusDetail from "./BusDetail";

const screenWidth = Dimensions.get("window").width * 0.7;

const CardExpandView = styled.View`
  display: flex;
  align-items: center;
  padding: 15px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${(props) => props.theme.card.expand.bg};
  elevation: 3;
`;

const PathContainer = styled.View`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  width: 100%;
`;

const DepartureBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.card.expand.depart};
`;

const ArrivalBox = styled(DepartureBox)`
  margin-left: -10px;
`;

const DetailContainer = styled.View`
  width: 100%;
  margin-top: 15px;
  padding: 0px 10px;
`;

const CardExpand = ({ data }) => {
  const theme = useTheme();
  const jsonData = JSON.parse(data);

  const {
    info: { totalTime },
    subPath,
  } = jsonData;

  return (
    <CardExpandView>
      <PathContainer>
        <ArrivalBox>
          <Icon name="flag" size={15} color={theme.card.expand.flag} />
        </ArrivalBox>
        {subPath &&
          subPath.reverse().map((sp, index) => {
            if (sp.trafficType === 3) {
              return (
                <PathWalk
                  key={index}
                  minute={sp.sectionTime}
                  width={(sp.sectionTime * screenWidth) / totalTime}
                />
              );
            }
            if (sp.trafficType === 2) {
              return (
                <PathTransport
                  key={index}
                  minute={sp.sectionTime}
                  width={(sp.sectionTime * screenWidth) / totalTime}
                  color={theme.card.expand.bus}
                />
              );
            }
            if (sp.trafficType === 1) {
              return (
                <PathTransport
                  key={index}
                  minute={sp.sectionTime}
                  width={(sp.sectionTime * screenWidth) / totalTime}
                  color={theme.card.expand.subway}
                />
              );
            }
            return null;
          })}
        <DepartureBox>
          <Icon name="place" size={15} color={theme.card.expand.flag} />
        </DepartureBox>
      </PathContainer>
      <DetailContainer>
        {subPath &&
          subPath.reverse().map((sp, index) => {
            if (sp.trafficType === 2) {
              return (
                <View key={index}>
                  <PathDetail
                    type="bus"
                    number={sp.lane[0].busNo}
                    stop={sp.startName}
                    color={theme.card.expand.bus}
                  />
                  <BusDetail count={sp.stationCount} stop={sp.endName} />
                </View>
              );
            }
            if (sp.trafficType === 1) {
              return (
                <PathDetail
                  key={index}
                  type="tram"
                  number={`${sp.lane[0].subwayCode}호선`}
                  stop={`${sp.startName} 승차  ››  ${sp.endName} 하차`}
                  color={theme.card.expand.subway}
                />
              );
            }
            return null;
          })}
      </DetailContainer>
    </CardExpandView>
  );
};

export default CardExpand;
