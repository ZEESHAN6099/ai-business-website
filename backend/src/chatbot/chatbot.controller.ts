import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}

  @Post()
  getReply(@Body() body: { message: string }) {
    return this.chatbotService.reply(body.message);
  }
}