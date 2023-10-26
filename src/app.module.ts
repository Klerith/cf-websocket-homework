import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';




@Module({  

  imports: [

    // Esto habilita la carpeta publica para que se pueda acceder desde el navegador
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ]
})
export class AppModule {}
