export interface IRestaurant {
  name?: string;
  ownerId?: number;
  currentStep?: number;
  isVerified?: boolean;
  phoneNumber?: string;
  phoneNumberCountryCode?: string;
  landlineNumber?: string;
  landLineCode?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  state?: string;
  district?: string;
  country?: string;
  pinCode?: string;
  exactLocation?: boolean;
  whatsAppNotifications?: boolean;
}
