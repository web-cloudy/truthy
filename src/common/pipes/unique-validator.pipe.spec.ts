import { Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { UniqueValidatorPipe } from './unique-validator.pipe';
import { UserEntity } from '../../auth/entity/user.entity';
import { UniqueValidationArguments } from './abstract-unique-validator';
import { Connection } from 'typeorm';

const mockConnection = () => ({
  getRepository: jest.fn(() => ({
    count: jest.fn().mockResolvedValue(0)
  }))
});

describe('UniqueValidatorPipe', () => {
  let isUnique: UniqueValidatorPipe, connection;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UniqueValidatorPipe,
        {
          provide: getConnectionToken(),
          useFactory: mockConnection
        }
      ]
    }).compile();
    isUnique = await module.get<UniqueValidatorPipe>(UniqueValidatorPipe);
    connection = await module.get<Connection>(Connection);
  });

  describe('check unique validation', () => {
    it('check if there is no duplicate', async () => {
      const username = 'tester';
      const args: UniqueValidationArguments<UserEntity> = {
        constraints: [UserEntity, ({ object: {} }) => ({})],
        value: username,
        targetName: '',
        object: {
          username
        },
        property: 'username'
      };
      const result = await isUnique.validate<UserEntity>('username', args);
      expect(connection.getRepository).toHaveBeenCalledWith(UserEntity);
      expect(result).toBe(true);
    });
  });
});
