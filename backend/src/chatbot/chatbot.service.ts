import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  reply(message: string) {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes('price') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('package')
    ) {
      return {
        reply:
          'Our AI business websites can be customized based on your needs. Please send your project details through the contact form and our team will contact you.',
      };
    }

    if (
      lowerMessage.includes('chatbot') ||
      lowerMessage.includes('ai') ||
      lowerMessage.includes('automation')
    ) {
      return {
        reply:
          'Yes! We build AI chatbots, automation systems, lead capture tools, and admin dashboards for businesses.',
      };
    }

    if (
      lowerMessage.includes('contact') ||
      lowerMessage.includes('email') ||
      lowerMessage.includes('call')
    ) {
      return {
        reply:
          'You can use the contact form below. Send your name, email, and project message, and our team will respond soon.',
      };
    }

    if (
      lowerMessage.includes('website') ||
      lowerMessage.includes('business') ||
      lowerMessage.includes('seo')
    ) {
      return {
        reply:
          'We create modern business websites with SEO, responsive design, chatbot support, and secure admin dashboards.',
      };
    }

    return {
      reply:
        'Thanks for your message! We help businesses build premium AI websites, chatbots, automation tools, and dashboards. Please tell me what you need.',
    };
  }
}