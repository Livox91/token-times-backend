import { Test, TestingModule } from '@nestjs/testing';
import { NewsWriterService } from './news-writer.service';

describe('NewsWriterService', () => {
  let service: NewsWriterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsWriterService],
    }).compile();

    service = module.get<NewsWriterService>(NewsWriterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
