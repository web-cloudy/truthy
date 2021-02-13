import { User } from '../auth/entity/user.entity';

export const SanitizeUser = (userField?: string, strong = true) => {
  return (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> => {
    const decoratedFn = descriptor.value;

    async function newFunction(...args) {
      const data: any = await decoratedFn.apply(this, args);
      const user: User = userField ? data[userField] : data;
      if (user) {
        user.password = null;
        delete user.password;
        user.salt = null;
        delete user.salt;
        if (strong) {
          user.token = null;
          delete user.token;
        }
      }
      return data;
    }

    return {
      value: newFunction
    };
  };
};

export const SanitizeUsers = (userField?: string) => {
  return (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> => {
    const decoratedFn = descriptor.value;

    async function newFunction(...args) {
      const entities: any[] = await decoratedFn.apply(this, args);
      return entities.map((entity) => {
        const user: User = userField ? entity[userField] : entity;
        if (user) {
          user.password = null;
          delete user.password;
          user.salt = null;
          delete user.salt;
          user.token = null;
          delete user.token;
        }
        return entity;
      });
    }

    return {
      value: newFunction
    };
  };
};
