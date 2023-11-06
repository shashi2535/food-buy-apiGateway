export enum GRPC_PORTS {
  USER_SERVICE = 8000,
  RESTAURANT_SERVICE = 8001,
}

export enum PACKAGE_NAMES {
  USER = 'user',
  RESTAURANT = 'restaurant',
}

export enum SERVICES {
  USER_SERVICE = 'UserService',
  RESTAURANT_SERVICE = 'RestaurantService',
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
  UPDATE_BASIC_DETAILS = 'updateBasicDetails',
  GET_RESTAURANT_BASIC_DETAILS = 'getRestaurantBasicDetails',
}

export enum ORDER_METHODS {
  CHECK_HEALTH = 'checkHealth',
}
