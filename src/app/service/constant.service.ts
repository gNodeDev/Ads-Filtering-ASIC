import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConstantService {
  public hostName: any;
  public APIBaseURL: any;

  constructor() { 

    this.APIBaseURL = 'http://localhost:8000/';
  }

  public APIConfig = {
    GET_ALL_DATA:'allAdsToShowTable',
    GET_BREACHES_DATA: 'GetAdvBreaches',
    GET_AUDIO_TRANSIT: 'GetAudioTranscript',
    GET_BREACHES_DATA_ALL: 'GetAdvBreachesAll',
    GET_NODE_POST_DATA : 'GetNodeDetail',
    GET_CREDIT_LIC_MAP_DATA: "GetMapData",
    GET_INDIGIOUS_DATA: "GetIndigiousData"
  };
}
