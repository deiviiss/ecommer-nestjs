import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entitys';
import { PayloadToken } from '../../auth/models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...rta } = user.toJSON();

      return rta;
    }

    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };
    return {
      acces_token: this.jwtService.sign(payload),
      user,
    };
  }
}
