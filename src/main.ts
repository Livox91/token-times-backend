import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const isLocalOrigin = origin?.match(/^https?:\/\/localhost:\d+$/);
      const isProductionOrigin = origin === 'https://www.tokenstimes.com'
        || origin === 'https://tokenstimes.com';

      if (!origin || isLocalOrigin || isProductionOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));

  await app.init();

  return app;
}

// Only run a server when not on Vercel
if (!process.env.VERCEL) {
  createApp().then(app => {
    app.listen(process.env.PORT || 3000);
  });
}