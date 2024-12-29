import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HelloModule } from './modules/hello/hello.module';
import { PrismaModule } from './modules/prisma/prisma.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../apps/web/out'),
      exclude: ['/api*'],
    }),
    HelloModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
