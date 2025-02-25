import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getSuccessMessage(){
    return 'Endpoint call was successful';
  }
}
