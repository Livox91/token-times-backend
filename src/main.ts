import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "https://www.tokenstimes.com",
      "https://tokenstimes.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 21600,
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