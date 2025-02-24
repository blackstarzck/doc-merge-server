import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { json } from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(json({ limit: '10mb' }))
  app.enableCors({
    origin: 'http://localhost:3001', // 프론트엔드 URL 허용
    credentials: true, // 쿠키 포함 요청 허용 (필요 시)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 허용할 HTTP 메서드
    allowedHeaders: 'Content-Type, Authorization', // 허용할 헤더
  })

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
