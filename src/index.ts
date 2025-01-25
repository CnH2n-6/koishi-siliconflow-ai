import { Context, Schema, segment } from 'koishi'

import { ChatApi } from './server/chat'

import { Config } from './config'


export const name = 'siliconflow-ai'
export { Config }



export function apply(ctx: Context, config: Config) {
  const chatApi = new ChatApi(config)

  ctx.middleware(async(session, next) => {
    const content = session.content
    if(!content.startsWith('# ')) {
      return next()
    }

    const message = content.slice(2).trim()

    if(!message) {
      return next()
    }

    
    const reply = await chatApi.chat(message)
    const result = segment.escape(reply)
    
    await session.send(result)
  })

 
}
