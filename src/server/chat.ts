import { HttpClient } from './http'
import type { Context } from 'koishi' 
import type { Config } from '../config'
import type { TextModelRequestData } from './type'

export class ChatApi {
  private http: HttpClient

  constructor(private config: Config) {
    this.http = new HttpClient(this.config.privateKey)
  }

  async chat() {
    let request: TextModelRequestData
    if(this.config.textModel.type === 'LLM') {

    }
    if(this.config.textModel.type === 'LVM') {

    }

    try {
      
    } catch(error) {

    }



    
  }
}