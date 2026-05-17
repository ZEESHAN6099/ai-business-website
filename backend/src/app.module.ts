import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [PrismaModule, ContactModule, AuthModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
