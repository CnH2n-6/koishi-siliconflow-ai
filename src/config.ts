import { Context, Schema } from 'koishi'


type BaseConfig = {  
  privateKey: string  
}  

type TextModelConfig = {  
  name: string,  
  type: 'LLM' | 'LVM',
  personality: string
}  

type ImageModelConfig = {  
  name: string,  
  type: 'LLM' | 'LVM'  
}  

export type Config = BaseConfig & {  
  textModel?: TextModelConfig,
  imageModel?: ImageModelConfig  
}

export const Config: Schema<Config> = Schema.intersect([  
  Schema.object({  
    privateKey: Schema.string().required().role('secret').description('私钥')  
  }).description('认证配置'),  

  // 可选的文本模型配置  
  Schema.object({  
    textModel: Schema.object({  
      name: Schema.string().default('Qwen/QVQ-72B-Preview').description('模型名称'),  
      type: Schema.union(['LLM', 'LVM']).default('LLM').description('模型类型'),
      personality: Schema.string().role('textarea', { rows: [4, 4] }).description('AI人设'),  
    }).description('文本对话')
  }),  

  // 可选的图像模型配置  
  Schema.object({  
    imageModel: Schema.object({  
      name: Schema.string().default('dall-e-3').description('模型名称'),  
      type: Schema.union(['LLM', 'LVM']).default('LVM').description('模型类型')  
    }).description('图像生成')  
  })  
])