import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { getModelToken } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import { title } from 'process';



describe('NoteService', () => {
    let service: NoteService;

    const MockNoteService = {
        find: jest.fn(),
        exec: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn()
    }

    const obj = {
        "_id": "67c9591d9dd7f27b6306db3b",
        "note": "Google",
        "author": "string",
        "tag": ["abc"],
        "__v": 0
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NoteService, { provide: getModelToken(Note.name), useValue: MockNoteService }]
        }).compile();

        service = module.get<NoteService>(NoteService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("findAll", async () => {
        MockNoteService.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([obj]) });

        const otv = await service.findAll();

        expect(otv).toEqual([obj]);
        expect(MockNoteService.find).toHaveBeenCalled();
    });


    it('create', async () => {
        const CreateDto = {
            title: 'tyui',
            note: "G",
            author: "string",
            tag: ["abc"]
        };

        MockNoteService.create.mockResolvedValue(CreateDto);

        const otv = await service.create(CreateDto);

        expect(otv).toEqual(CreateDto);
        expect(MockNoteService.create).toHaveBeenCalledWith(CreateDto)
    });

    it('update', async () => {
        const _id = "67c9591d9dd7f27b6306db3b"
        const gg = {
            note: "Google",
            author: "string",
            tag: "abc",
        }

        MockNoteService.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(gg) });

        const otv = await service.update(_id, gg);

        expect(otv).toEqual(gg);
        expect(MockNoteService.findByIdAndUpdate).toHaveBeenCalledWith({ _id: _id }, gg, { new: true })
    })
});
