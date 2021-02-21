import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { UserStatusEnum } from '../user-status.enum';
import * as bcrypt from 'bcrypt';
import { CustomBaseEntity } from '../../custom-base.entity';

@Entity({ name: 'user' })
export class User extends CustomBaseEntity {
  @Index({ unique: true })
  @Column()
  username: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Index()
  @Column()
  name: string;

  @Column()
  status: UserStatusEnum;

  @Column()
  token: string;

  @Column()
  salt: string;
  skipHashPassword = false;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}
