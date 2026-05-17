import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createMessage(
    @Body() body: { name: string; email: string; message: string },
  ) {
    return this.contactService.createMessage(body);
  }

  @Get()
  getAllMessages() {
    return this.contactService.getAllMessages();
  }
}