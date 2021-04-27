package com.ssafy.project.service.route;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Service;

import com.ssafy.project.model.route.RouteFindRequest;

@Service
public class RouteServiceImpl implements RouteService {

	@Override
	public String findRoute(RouteFindRequest routeFindRequest) {
		//대중교통 길찾기 api(실행시킬때 본인 api 키 값으로 바꾸기)
		final String openUrl = "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX="+routeFindRequest.getSX()+"&SY="+routeFindRequest.getSY()+"&EX="+routeFindRequest.getEX()+"&EY="+routeFindRequest.getEY()+"&apiKey=D6BmCrs4iH/PLaOQ390EUYI9%2BAdf8B55184hmV7GpSA";
		
		StringBuffer sb = new StringBuffer();
		
		try {
			URL url = new URL(openUrl);

			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			sb.append(br.readLine());

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();	
	}
	
	@Override
	public String readApi() {
		
		StringBuffer sb = new StringBuffer();
		final String openUrl = "https://api.odsay.com/v1/api/searchBusLane?busNo=10&CID=1000&apiKey=D6BmCrs4iH/PLaOQ390EUYI9%2BAdf8B55184hmV7GpSA";
		
		try {
			URL url = new URL(openUrl);

			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			sb.append(br.readLine());

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return sb.toString();
	}

}
