import { Context, Schema, segment } from 'koishi'

import { ChatApi } from './server/chat'

import { Config } from './config'


export const name = 'siliconflow-ai'
export { Config }

const autoReply = {}

const errReply = [
  "哎呀，服务器小老弟累趴下了，让它休息一下下吧 ~",  
  "我们的服务器正在打盹儿，等它睡醒再来吧 (｡ ͡° ͜ʖ ͡°) ",  
  "服务器君感冒了，正在吃药休息，待会儿再来找它玩儿吧 >_<",  
  "我们的小可爱服务器今天有点不在状态，让它缓缓哈 ╮(￣▽￣)╭",  
  "啊咧咧~ 服务器菌正在装死，等它自己玩够了就好啦 (●'◡'●)",  
  "叮咚！服务器正在进行一场说走就走的旅行，很快回来哦 ✈️"
]

export function apply(ctx: Context, config: Config) {
  const chatApi = new ChatApi(config)

  // 定时自动回复，主动参与群聊
  ctx.middleware(async(session, next) => {
    const groundId = session.guildId
    if(!autoReply[groundId]) {
      autoReply[groundId] = Date.now()
    }
    const message = session.content
    const cd = 60 * 60 * 1000
    const needAutoReply = !message.startsWith('<img') && (Date.now() - autoReply[groundId]) >=  cd

    if(needAutoReply) {
      console.log('已自动回复', groundId)
      autoReply[groundId] = Date.now()
      const message = session.content
      const reply = await chatApi.chat(message)
      const result = segment.escape(reply)
      await session.send(result)
    } else {
      return next()
    }
  })

  ctx.middleware(async(session, next) => {
    
    const content = session.content
    if(!content.startsWith('# ')) {
      return next()
    }

    const message = content.slice(2).trim()

    if(!message) {
      return next()
    }

    const reply = await chatApi.chat(message, async(error) => {
      await session.send(errReply[Math.floor(Math.random() * errReply.length)])
    })
    const result = segment.escape(reply)
    
    await session.send(result)
  })

  ctx.middleware(async(session, next) => {
    // 兜底at内容
    if(session.stripped.atSelf) {
      const message = session.stripped.content
      // koishi 会自动识别是否为已注册的指令，如果为已注册的指令，则优先执行指令，不需要自己处理了
      // const commandList = session.app.$commander._commandList.map((item) => item.displayName) 
      const reply = await chatApi.chat(message, async(error) => {
        await session.send(errReply[Math.floor(Math.random() * errReply.length)])
      })
      const result = segment.escape(reply)
      await session.send(result)
    }
  
    return next()  
  })


}


