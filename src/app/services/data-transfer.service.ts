import { CommonInformation } from './../entities/common-information';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private commonInformationSource = new BehaviorSubject(new CommonInformation());
  currentCommonInformation = this.commonInformationSource.asObservable();

  changeCommonInformation(newInformation: CommonInformation){
    this.commonInformationSource.next(newInformation);
  }




}
