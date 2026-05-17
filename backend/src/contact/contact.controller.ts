import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllMessages() {
    return this.contactService.getAllMessages();
  }
}