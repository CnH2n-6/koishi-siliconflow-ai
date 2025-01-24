import { Context, Schema } from 'koishi'

import { Config } from './config'

export const name = 'siliconflow-ai'
export { Config }


export function apply(ctx: Context, config: Config) {
  

  ctx.command('config').action(() => {
    // 输出当前的配置
    
  })
}
