import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppGuard extends AuthGuard('jwt') {
 
  constructor(
    private reflector: Reflector,
    ) {
      super();
    }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // if endpoint doesnot have a role allow access
    if (!roles) {
      return true;
    }

    // receive jwt from guard
    await super.canActivate(context);

    // validate role access
    return this.matchRoles(roles, req?.user?.roles || "");
  }

  private matchRoles(routeRoles: Array<string>, userRoles: Array<string>): boolean {
    let isAuthorized = false;
  
    userRoles.forEach(role => {
      if (routeRoles.includes(role))  {
        isAuthorized = true;
        return;
      }
    });

    return isAuthorized;
  }
}