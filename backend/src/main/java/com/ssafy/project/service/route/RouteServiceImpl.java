package com.ssafy.project.service.route;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.StringTokenizer;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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
			
			JSONParser parser=new JSONParser();
			JSONObject obj=(JSONObject)parser.parse(br);
			JSONObject response=(JSONObject)obj.get("result");
			JSONArray path = (JSONArray) response.get("path");
			
			//세부 경로들
			for (int i = 0; i < path.size()-1; i++) {
				JSONObject infos=(JSONObject)path.get(i);
				
				//pathType : 1=지하철, 2=버스, 3=지하철+버스
				long pathType=(Long)infos.get("pathType");
				System.out.print(pathType+" ");
				
				JSONObject info=(JSONObject)infos.get("info");
				
				long totalTimeTmp=(long)info.get("totalTime");
				int totalTime=(int)totalTimeTmp;
				
				//출발시간 구하기
				String[] time=routeFindRequest.getArriveTime().split(":");
				int hour=Integer.parseInt(time[0]);
				int minute=Integer.parseInt(time[1]);
				String startTime=(hour*60+minute-totalTime)/60+":"+(hour*60+minute-totalTime)%60;
				
				System.out.println("start:"+startTime);
				String first=(String)info.get("firstStartStation");
				System.out.print(first +" "+totalTime);
				System.out.println();
				
			}
			
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
