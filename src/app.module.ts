import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const MONGODB_CONNECTION_STRING = process.env.MONGODB_SERVER_URL + 'nestjs-intro-acad?retryWrites=true&w=majority';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(MONGODB_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
