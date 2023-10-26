import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Chat2Module } from './chat2/chat2.module';




@Module({  

  imports: [

    // Esto habilita la carpeta publica para que se pueda acceder desde el navegador
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    Chat2Module,
  ]
})
export class AppModule {}
