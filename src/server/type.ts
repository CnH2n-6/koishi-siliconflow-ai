/// 所用ai为硅基流动，api参考：https://docs.siliconflow.cn/api-reference/chat-completions/chat-completions?playground=open

// 文字对话
interface BaseTextModelRequestData<T> {
  model: string,
  messages: T,
  frequency_penalty?: number,
  max_tokens?: number,    
  n?: number              
  stop?: any,
  stream?: boolean,
  temperature?: number,
  top_k?: number,
  top_p?: number
}

type LvmTextModelequestData = BaseTextModelRequestData<Array<{
  role: 'user'|'assistant'|'system'
  content: Array<{
    type: 'text'|'image_url'
    text?: string,
    image_url?: {
      url?: string
      detail?: 'auto'|'low'|'high'
    }
  }>
}>>

type LLmTextModelequestData = BaseTextModelRequestData<Array<{
  role: 'user'|'assistant'|'system'
  content: string
}>>

export type TextModelRequestData = LvmTextModelequestData | LLmTextModelequestData