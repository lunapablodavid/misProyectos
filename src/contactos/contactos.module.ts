import { Module } from '@nestjs/common';
import { ContactsController } from './contactos.controller';
import { ContactsService } from './contactos.service';
@Module({
controllers: [ContactsController],
providers: [ContactsService]
})
export class ContactModule {}
