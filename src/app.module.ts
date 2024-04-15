import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://payever:payever@cluster0.j5xu8.mongodb.net/payever?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
