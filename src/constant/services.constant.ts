export enum GRPC_PORTS {
  USER_SERVICE = 8000,
  RESTAURANT_SERVICE = 8001,
}

export enum PACKAGE_NAMES {
  USER = 'user',
  RESTAURANT = 'restaurant',
  MISC = 'misc',
}

export enum SERVICES {
  USER_SERVICE = 'UserService',
  RESTAURANT_SERVICE = 'RestaurantService',
  MISC_SERVICE = 'MiscService',
}

export enum USER_METHODS {
  CHECK_HEALTH = 'checkHealth',
  REGISTER_USER = 'registerOwner',
  VERIFY_OTP = 'verifyOtp',
  RESEND_OTP = 'resendOtp',
  LOGIN_OWNER = 'loginOwner',
  VERIFY_TOKEN = 'verifyToken',
}

export enum RESTAURANT_METHODS {
  CHECK_HEALTH = 'checkHealth',
  CREATE_RESTAURANT = 'createRestaurant',
}

export enum ORDER_METHODS {
  CHECK_HEALTH = 'checkHealth',
}

export enum MISC_METHODS {
  GET_ENTITY_TYPE = 'getEntityByType',
}
