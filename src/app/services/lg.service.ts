import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LgService {

  public editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

}
