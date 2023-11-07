export const RoutesConstants = {
  SWAGGER: '/swagger-docs',
  HEALTH: '/health',
  BASE_URL: '/v1',
  ROOT: '/',
  SELLER_AUTH: {
    DEFAULT: '/owner',
    LOGIN: '/login',
    SIGNUP: '/signup',
    VERIFY_OTP: '/verifyOtp',
    RESEND_OTP: '/resendOtp',
    VERIFY_TOKEN: '/verify-token',
  },
  USER_AUTH: {
    DEFAULT: 'user',
    LOGIN: 'login',
    SIGNUP: 'signup',
  },
  RESTAURANT: {
    DEFAULT: '/restaurant',
    SAVE_BASIC_DETAILS: '/save-basic-details',
    UPDATE_BASIC_DETAILS: '/update-basic-details/:id',
    GET_BASIC_DETAILS: '/get-basic-details/:id',
    SAVE_RESTAURANT_DETAILS: '/save-restaurant-details/:id',
    GET_RESTAURANT_DETAILS: '/get-restaurant-details/:id',
    UPDATE_RESTAURANT_DETAILS: '/update-restaurant-details/:id',
  },
  MISC: {
    DEFAULT: '/misc',
    GET_ENTITY_TYPE: '/get-entity-type'
  },
  NOT_FOUND: '*',
};
