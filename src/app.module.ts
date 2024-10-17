import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // Tiempo de vida de las peticiones en segundos
      limit: 10, // Número máximo de peticiones permitidas por minuto
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}