import { RefreshToken } from './entities/refresh-token.entity';
import { UserSerializer } from '../auth/serializer/user.serializer';
import { EntityRepository } from 'typeorm';
import * as config from 'config';
import { BaseRepository } from '../common/repository/base.repository';
import { RefreshTokenSerializer } from './serializer/refresh-token.serializer';

const tokenConfig = config.get('jwt');
@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends BaseRepository<
  RefreshToken,
  RefreshTokenSerializer
> {
  /**
   * Create refresh token
   * @param user
   * @param tokenPayload
   */
  public async createRefreshToken(
    user: UserSerializer,
    tokenPayload: Partial<RefreshToken>
  ): Promise<RefreshToken> {
    const token = this.create();
    token.userId = user.id;
    token.isRevoked = false;
    token.ip = tokenPayload.ip;
    token.userAgent = tokenPayload.userAgent;
    token.browser = tokenPayload.browser;
    token.os = tokenPayload.os;
    const expiration = new Date();
    expiration.setSeconds(
      expiration.getSeconds() + tokenConfig.refreshExpiresIn
    );
    token.expires = expiration;
    return token.save();
  }

  /**
   * find token by id
   * @param id
   */
  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.findOne({
      where: {
        id
      }
    });
  }
}
