import axios, { AxiosInstance } from 'axios'  

import { createHttpServer } from './http'
import type { Context } from 'koishi' 
import type { Config } from '../config'
import type { TextModelRequestData } from './type'

export class ChatApi {
  private http: AxiosInstance

  constructor(private config: Config) {
    this.http = createHttpServer(config.privateKey)
  }

  async chat(messgae, handleError?) {
    let requestData: TextModelRequestData
    if(this.config.textModel.type === 'LLM') {

    }
    if(this.config.textModel.type === 'LVM') {
      requestData =  {
        model: this.config.textModel.name,
        messages: [
          {
            role: 'system',
            content: [{
              type: 'text',
              text: this.config.textModel.personality
            }]
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: messgae
              }
            ]
          }
        ]
      }
    }
    try {
      const { data } = await this.http.post('/chat/completions', requestData)

      
      return data.choices[0].message.content
    } catch(error) {
      handleError && handleError()
      console.log('接口报错--chat:', error?.code)
    }
  }
}