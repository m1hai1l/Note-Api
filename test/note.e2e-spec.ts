import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { NoteDto } from 'src/note/dto/note.dto';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';



const Id = new Types.ObjectId().toHexString()

const loginDto: AuthDto = {
    email: "string",
    password: "moloko"
}

const testDto: NoteDto = {
    note: "Good",
    author: "Harry",
    tag: ["new"],
    _id: Id
}

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;
    let NoteId: string;
    const tag: string = "new";
    let token: string

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const { body } = await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto);

        token = body.access_tocken;
    });

    it('/notes (POST)', async () => {
        return request(app.getHttpServer())
            .post('/notes')
            .set('Authorization', 'Bearer ' + token)
            .send(testDto)
            .expect(201)
            .expect(({ body }: request.Response) => {
                NoteId = body._id;
                expect(NoteId).toBeDefined()
            })
    })


    it('/notes/:tag (GET)', () => {
        return request(app.getHttpServer())
            .get('/notes/' + tag)
            .expect(200)
    });

    it("/notes/:id (UPDATE)", () => {
        return request(app.getHttpServer())
            .patch('/notes/' + NoteId)
            .set('Authorization', 'Bearer ' + token)
            .send(testDto)
            .expect(200)
    });


    it('/notes/:id (delete)', () => {
        return request(app.getHttpServer())
            .delete('/notes/' + NoteId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    afterAll(() => {
        disconnect()
    })
});
