import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductModule } from './products/products.module';
import { UserController } from './usuarios/users.controller';
import { UsersService } from './usuarios/users.service';
import { UserModule } from './usuarios/users.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'client')}),
    ProductModule,
    UserModule,
  ],
  controllers: [AppController, ProductsController, UserController],
  providers: [AppService, ProductsService, UsersService],
})
export class AppModule {}
