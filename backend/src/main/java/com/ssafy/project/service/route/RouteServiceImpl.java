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
	public Object findRoute(RouteFindRequest routeFindRequest) {
		String apiKey="D6BmCrs4iH/PLaOQ390EUYI9%2BAdf8B55184hmV7GpSA";
		final String openUrl = "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX="+routeFindRequest.getStartX()+"&SY="+routeFindRequest.getStartY()+"&EX="+routeFindRequest.getEndX()+"&EY="+routeFindRequest.getEndY()+"&apiKey="+apiKey;
		
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

	@Override
	public Object findLast(RouteFindRequest routeFindRequest) {
		// TODO Auto-generated method stub
		return null;
	}

}
