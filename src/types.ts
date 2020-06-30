import {Moment} from 'moment'

export interface Facility {
  FacilityId: number// 114,
  Name: string //'Sandspit Lanes 1 - 3',
  OrderBy: number // 0,
  FacilityType: number // 2,
  FacilityTypeNew: number // 1,
  Category: 'Campgrounds'|string // 'Campgrounds',
  TotalUnitCount: number // 60,
  MasterMaxOccupancy: number // 60,
  EnableCheckOccupancy: boolean // false,
  InSeason: boolean // true,
  DatesInSeason: number // 21,
  DatesOutOfSeason: number // 0,
  RestrictionIds: {
    PlaceId: 64,
    FacilityId: 114,
    UnitCategoryIds: any[],
    UnitTypeIds: any[],
    PlaceRestrictions: any[],
    FacilityRestrictions: any[],
    CategoryRestrictions: any[],
    TypeRestrictions: any[],
    GlobalRestrictions: any[]
  },
  Restrictions: {
    FutureBookingStarts: '2020-06-01T00:00:00-07:00',
    FutureBookingEnds: '2021-05-31T00:00:00-07:00',
    FutureBookingStartsId: 137,
    FutureBookingEndsId: 162
  },
  Dates: Record<string, DateAvailability> // date: '2020-06-15T00:00:00'
}

export interface DateAvailability {
  Date: '2020-07-04',
  IsAvailable: false,
  TotalAvailable: 0,
  MaxOccupancy: 60,
  UnitCount: 60,
  ReservationCount: 44,
  PersonCount: null,
  LockCount: null,
  InSeason: true,
  IsBlocked: false
}

export interface OccupancyResponse {
  Message: string// 'Built in 15.9899 ms size 5683 bytes',
  FacilityId: number// 114 (placeId for Ruckle Park)
  StartDate: string // '2020-06-15',
  EndDate: string //'2020-07-05',
  Facility: Facility
}

export const Amenity = {
  Size: {id: 204, key: '0.Size'},
  Pad: {id: 180, key: '1.Pad'},
  PadWidth: {id: 156, key: '1.PadWidth'},
  WheelChairOnly: {id: 166, key: '11.WheelChairOnly'},
  Quality: {id: 168, key: '13.Quality'},
  PicnicTable: {id: 170, key: '15.PicnicTable'},
  SiteLength: {id: 171, key: '16.SiteLength'},
  PadSlope: {id: 181, key: '21.PadSlope'},
  MinCapacity: {id: 186, key: '26.MinCapacity'},
  TentAreaType: {id: 193, key: '30.TentAreaType'},
  SiteWidth: {id: 194, key: '31.SiteWidth'},
  ServiceType: {id: 197, key: '34.ServiceType'},
  FirePit: {id: 199, key: '35.FirePit'},
  GroundCover: {id: 190, key: '38.GroundCover'},
  Shading: {id: 163, key: '8.Shading'},
  Privacy: {id: 164, key: '9.Privacy'},
}

export interface UnitDetails {
  Unit: {
    UnitId: 6169,
    FacilityId: 154,
    UnitTypeId: 4,
    Name: '44',
    ShortName: '44',
    AllowWebBooking: true,
    WebBookingStartTime: '2019-11-03T16:00:00',
    WebBookingEndTime: '2019-11-03T20:00:00',
    CustomField1: null,
    DescriptionHtml: string, // pretty much useless
    OrderBy: 3793,
    IDate: '2019-08-12T10:36:31.373',
    UDate: '2019-08-12T10:36:31.373',
    UserId: 1,
    ParentUnitId: 0,
    IsWebViewable: true,
    IsADA: false,
    IsTentSite: true,
    IsRVSite: true,
    VehicleLength: 40,
    UCashierName: null,
    UStoreId: 0,
    OldUnitId: 0,
    Custom: null,
    UnitDetail: 0,
    IsExist: null,
    NameIsDifferent: null,
    RAUnitId: 0,
    Combined: null,
    SiteType: '0',
    Inactive: false
  },
  FacilityName: 'Nairn Campground',
  IsCaptcha: false,
  RecentPopups: 0,
  InvalidStart: false,
  RateTypeName: 'Standard',
  Rate: '22.00',
  Fee: '6.00',
  UseTypeName: 'Nightly',
  DayUseUnit: null,
  UnitType: {
    UnitTypeId: 4,
    UnitCategoryId: 2,
    Name: 'Standard',
    UseType: 4,
    AllowFutureBooking: true,
    RateType: 0,
    RateBaseHours: 0,
    RestrictByPlace: false,
    OrderBy: 1,
    UDate: '2019-08-08T08:25:20.573',
    UserId: 1,
    AllowReservationVehicles: false,
    UnitTypeFeeCode: '534',
    MinReservationTypeMinutes: 0,
    MinReservationTypeHours: 0,
    MinReservationTypeDays: 0,
    IsPremium: false,
    UnitTypeGroupId: 4
  },
  NightlyUnit: {
    UnitId: 6169,
    MaxAdult: 4,
    MaxChildren: 7,
    MinAdult: 1,
    MinChildren: 0,
    MaxOccupancy: 8,
    MaxVehicles: 2,
    MinOccupancy: 1,
    PullInType: 3,
    CheckInStarts: '1899-12-30T13:00:00',
    CheckInEnds: '1899-12-30T22:00:00',
    CheckOutTime: '1899-12-30T11:00:00',
    SleepingUnitRequired: true
  },
  PullInTypeName: 'Not Applicable',
  Amenities: {
    '0.Size': {
      AmenityId: 204,
      Name: 'Size',
      ShortName: 'Size',
      AmenityType: 2,
      IsSearchable: false,
      Description: 'Size',
      OrderBy: 0,
      IDate: '2019-08-13T11:02:04.927',
      UDate: '2019-08-13T11:31:20.283',
      ImagePath: null,
      UCashierName: 'US eDirect Admin',
      UStoreId: 1,
      IsADA: false,
      Value: 'Medium'
    },
  }
}

export interface InventorySlice {
  InventorySliceId: number //10383941
  InventoryDateId: number //":6654,"
  StartTime: string //":"2020-08-19T00:00:00","
  UnitId: number //":6902,"
  UnitTypeId: number //":2,"
  IsPremium: boolean // ":false,"
  IsFree: boolean //":true,"
  IsBlocked: boolean //":false,"
  IsReserved: boolean //":false,"
  IsWalkin: boolean // ":false,"
  ReservationId: number // ":0,"
  FacilityId: number // ":174,"
  LockExpiration: string //":"2020-06-20T12:12:00.943","
  IsLocked: boolean
}
export type UnitRestrictionResponse = InventorySlice[]

export interface UnitType {
  Available: true
  AvailableCount: 16
  AvailableFiltered: true
  HasAda: false
  MaxVehicleLength: 13
  Name: "Walk-In"
  Restrictions: Restrictions
  UnitCategoryId: 2
  UnitTypeGroupId: 2
  UnitTypeId: 2
}

export interface PlaceFacility {
  Available: boolean
  AvailableFiltered: boolean
  AvailableOccupancy: null
  Category: 'Campgrounds'
  Description: string //"<font size="0.25">Main Camping Season March1, 2020 - November 8, 2020<BR>Reservable Dates January 1, 2020 -January 5, 2020 and March 1, 2020 - Novembere 7, 2020 and December18, 2020 - December 31, 2020</font>"
  EnableCheckOccupancy: false
  FacilityId: 174
  FacilityType: 2
  FacilityTypeNew: 1
  InSeason: true
  Latitude: 49.556820003
  Longitude: -123.236577991
  Name: string //"Porteau Cove - Walk In Sites W1 - W16"
  Restrictions: Restrictions
  UnitTypes: {[unitTypeId: number]: UnitType}
}

export interface NearbyPlace {
  Allhighlights: string //""
  Available: boolean
  AvailableFiltered: boolean
  Description: string //"Ruckle Provincial Park, located 12 km from Fulford Harbour at the end of Beaver Pt. Rd. on Salt Spring Island, is the largest Park in the Gulf Islands and has a fascinating farm history.  The Ruckle family’s involvement with this land dates back to 1872.         <br/>         With its 7 kilometres of shoreline, rocky headlands and tiny coves and bays, Ruckle Park provides hours or even days of enjoyable exploration. A mixture of forest, field and shore habitats makes it one of the most productive wildlife viewing areas on Saltspring Island. Tidal pools are filled with a brightly-coloured sea life while birdwatchers can catch sight of birds that call the sea, meadows and forests home. Pitch your tent at a numbered picnic table in the grassy meadows and enjoy the scenic view of Swanson Channel. Watch for sea lions and killer whales out in the sea, and mink and river otter cavorting along the shoreline.         <br/>         Ruckle Provincial Park offers 68 walk-in sites and 4 RV sites on a first come, first served basis, as well as 10 reservable walk-in sites and 4 reservable RV sites."
  Facilities: {[facilityId: number]: PlaceFacility}
  HasAlerts: false
  IsFavourite: false
  Latitude: 48.784649
  Longitude: -123.385216
  MilesFromSelected: 13
  Name: "Ruckle Park"
  ParkActivity: 1
  ParkCategoryId: 1
  ParkPopularity: 0
  ParkSize: "Medium"
  PlaceId: 114
  Restrictions: Restrictions
  Url: "http://bcparks.ca/explore/parkpgs/ruckle/"
}

export interface Restrictions {
  FutureBookingStarts: string // "2020-06-21T00:00:00-07:00",
  FutureBookingEnds: string //"2021-06-19T00:00:00-07:00"
  IsRestrictionValid: boolean // true
  MaximumStay: number // 14
  MinimumStay: number // 1
}

export interface PlaceSearchResult {
  AvailablePlaces: number
  CountNearby: true
  CustomerId: null
  EndDate: string // "2020-06-29"
  Filters: {
    IsADA: string //"False",
    UnitCategoryId: number //"2"
    SleepingUnitId: number // "8"
    MinVehicleLength: number // "0"
  }
  HighlightedPlaceId: number
  Latitude: number // 49.282729
  Longitude: number // -123.120738
  NearbyLimit: number // 200
  NearbyPlaces: NearbyPlace[]
  SelectedPlace: NearbyPlace
  SelectedPlaceId: 83
  Sort: "Distance"
  StartDate: "2020-06-29"
}

export enum Category {
  GroupCamping = 1,
  Camping = 2,
  DayUse = 3,
  Lodging = 4,
}

// UnitTypesGroups for Category = Camping
export enum CampingType {
  WalkIn = 2,
  Serviced = 3,
  Standard = 4,
  ServicedDouble = 7,
  StandardDouble = 8,
  WalkInDouble = 9,
  ServicedHalfDouble = 10,
  StandardHalfDouble = 11,
  WalkInHalfDouble = 12,
}

export enum NightlySleepingUnit {
  OneTent = 8,
  TwoTents = 9,
  ThreeTents = 10,
  CamperVan = 11,
  LgTrailer = 13,
  SmTrailer = 12,
  XLTrailer = 14,
}

export enum CampingType {
  OneTent = 8,
  TwoTents = 9,
}

export interface UnitCategoryListRequest {
  CategorieId?: Category
  placeId: number
}

export interface KeyValuePair<T> {
  Key: T
  Value: string
}

export interface KeyValueListResponse<T = number> {
  d: KeyValuePair<T>[]
}

export interface CampingUnitListRequest {
  CampingId: number
  placeId: number
}

export interface Restriction {
  RestrictionId: 107,
  RestrictionType: 4,
  Restriction: 'Future Booking Ends',
  ContextFlag: 8,
  Context: 'Web',
  Value: 0,
  PlaceId: 0,
  FacilityId: 0,
  UnitTypeId: 0,
  UnitCategoryId: Category,
  UsageClassificationId: 0,
  IsHoliday: false,
  HolidayId: 0,
  Sunday: 0,
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  StartDate: null,
  EndDate: null,
  LowerSecurityLevel: 0,
  UpperSecurityLevel: 20,
  Time: '2016-06-04T07:00:00',
  Months: 4,
  IsSeasonRecurrent: false,
  SkipForPastReservations: false,
  SkipForContinuousReservations: false,
  SkipForEarlyCheckinModifications: false
}


// see restrictions.json
export interface FacilityStartEndRestrictions {
  StartDate: null
  FutureBookingEnds: "2020-09-06T00:00:00-07:00"
  FutureBookingStarts: "2021-05-07T00:00:00-07:00"
  Message: "Built in 0.1126 ms size 2829 bytes"
  RestrictionIds: { PlaceId: 41, FacilityId: 276, UnitCategoryIds: [2], UnitTypeIds: [4], PlaceRestrictions: [205] }
  Restrictions: Restriction[]
}

export interface SignInResponse {
  __type: 'CustomerInfo'
  UserId: number
  Username: string
  ErrorMessage: null | string
  ErrorMode: boolean
  IsPasswordExpired: boolean
  IsTemporaryCustomer: boolean
}

export interface Park {
  CityParkId: number
  Name: string
  Latitude: number
  Longitude: number
  IsActive: boolean
  EntityType: 'Park' | string
  EnterpriseId: number
  ParkSize: 'Small' | 'Medium' | 'Large' | string
  PlaceId: number
}

export interface PlaceSearchRequest {
  PlaceId: number
  Latitude?: number
  Longitude?: number
  HighlightedPlaceId?: number
  StartDate?: string // 07-10-2020
  Nights?: number
  CountNearby?: boolean
  NearbyLimit?: number
  NearbyOnlyAvailable?: boolean
  NearbyCountLimit?: number
  Sort?: 'Distance' | string
  CustomerId?: number // 0
  RefreshFavourites?: boolean // true
  IsADA?: boolean // false
  UnitCategoryId?: Category
  SleepingUnitId?: number // 0
  MinVehicleLength?: number // 0
  UnitTypesGroupIds?: []
}

export interface FindPlacesInput {
  placeId?: number
  category?: Category
  sleepingUnit?: NightlySleepingUnit
  startDate: Moment
  nights?: number
  near?: {
    latitude: string
    longitude: string
  }
}

export interface FacilityAvailability {
  AvailableUnits: number,
  CountsByUnitId: { [unitId: number]: number }
  FacilityId: number
  Nights: number
  StartDate: string // 2021-06-14T00:00:00
}

export interface PreCartInput {
  __EVENTTARGET: ''
  __EVENTARGUMENT: ''
  __VIEWSTATE: string
  __VIEWSTATEGENERATOR: string // 15B64D40
  ctl01$hdnLoginCaptchResponse: ''
  ctl01$Hidscreenresolutionmain: ''
  ctl01$hdnCulture: ''
  ctl01$txtPassword: ''
  ctl01$AdvanceMainSearch$hdnAutoPlaceId: ''
  ctl01$AdvanceMainSearch$hdnLat: string // 49.556322
  ctl01$AdvanceMainSearch$hdnLag: string // -123.238203
  ctl01$AdvanceMainSearch$hdnautocomplete: ''
  ctl01$AdvanceMainSearch$hdncustomautocomplete: ''
  ctl01$AdvanceMainSearch$hdnArrivalDate: ''
  ctl01$AdvanceMainSearch$txtArrivalDate: string // 06/20/2020
  ctl01$AdvanceMainSearch$hdnNights: 0
  ctl01$AdvanceMainSearch$ddlNights: 0
  ctl01$AdvanceMainSearch$hdnEnableGoogleAnalyticCodeTracing: ''
  ctl01$mainContent$hdClient: number // 736567
  ctl01$mainContent$Hidscreenresolution: number // 1253
  ctl01$mainContent$hdnPlaceid: number // 104
  ctl01$mainContent$hiddenPlaceLevel: ''
  ctl01$mainContent$hdnFacilityid: 0
  ctl01$mainContent$hdnFacilityType: 0
  ctl01$mainContent$facilityChanged: ''
  ctl01$mainContent$IsParkFeatures: 0
  ctl01$mainContent$hdnParkFirstBlockFullDesc: ''
  ctl01$mainContent$hdnIsTimebasematrix: 0
  ctl01$mainContent$hdnIsAdvanceFacilityAvailability: 0
  ctl01$mainContent$hdmaximumdate: 6
  ctl01$mainContent$hdnmaxstay: 14
  ctl01$mainContent$hdnCashierOpenCampingCall: 0
  ctl01$mainContent$hdnUnNumberArrivalDate: ''
  ctl01$mainContent$hdnUnNumberNights: ''
  ctl01$mainContent$hdnUnNUmberUnitId: ''
  ctl01$mainContent$hdnInventoryUpdateClick: 1
  ctl01$mainContent$hdnNextDate: ''
  ctl01$mainContent$hdnPrevDate: ''
  ctl01$mainContent$UnitDetailPopup$hdnUnitId: number // 6902
  ctl01$mainContent$UnitDetailPopup$hdnFacilityId: number // 174
  ctl01$mainContent$UnitDetailPopup$ParkAlerttest: ''
  ctl01$mainContent$UnitDetailPopup$hdnmustReadrAlertPrecat: ''
  ctl01$mainContent$UnitDetailPopup$hdnParkIDAlert: number // 104
  ctl01$mainContent$UnitDetailPopup$hdnUnitDetailsCaptch: ''
  ctl01$mainContent$UnitDetailPopup$h1: ''
  ctl01$mainContent$UnitDetailPopup$ddlnighthf: number // 1
  ctl01$mainContent$UnitDetailPopup$hdnInventoryAvailable: ''
  ctl01$mainContent$UnitDetailPopup$hdnInventoryCheck: ''
  ctl01$mainContent$UnitDetailPopup$hdnUnitDetailPopupdate: string // 08/19/2020
  ctl01$mainContent$UnitDetailPopup$hdnUnitDetailsPlaceId: number // 104
  ctl01$mainContent$UnitDetailPopup$hdnUnitIsCaptcha: false
  ctl01$mainContent$UnitDetailPopup$ddlPopupNights: number // 1
  ctl01$mainContent$UnitDetailPopup$bReserve2: ''
  ctl01$mainContent$hdnnotavailableunit: ''
  hdnIsMapshow: 0
  hdnMapLevelshow: 1
  hdnMapboxPlaceid: 0
  hdnMapboxParksize: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnNightsSearchUnitAvailbity: number // 1
  ctl01$mainContent$SearchUnitAvailbity$hdnSearchtypeSearchUnitAvailbity: 'Park'
  ctl01$mainContent$SearchUnitAvailbity$hdnParkSizeSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnSearchPlaceIdSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnAutoPlaceIdSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnLatSearchUnitAvailbity: string // 49.556322
  ctl01$mainContent$SearchUnitAvailbity$hdnLagSearchUnitAvailbity: string // -123.238203
  ctl01$mainContent$SearchUnitAvailbity$hdnautocompleteSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailbity$hdncustomautocompleteSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnIsPremiumSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnIsAdaSearchUnitAvailbity: 0
  ctl01$mainContent$SearchUnitAvailbity$hdnIsPlaceSearchUnitAvailbity: 0
  ctl01$mainContent$SearchUnitAvailbity$hdnIsFacilityBacktoSearchUnitPlace: 0
  ctl01$mainContent$SearchUnitAvailbity$hdnParkFinderArray: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnIsAutocompleteFill: 1
  ctl01$mainContent$SearchUnitAvailbity$hdn_NewCampingUnitSearchUnitAvailbity: 0
  ctl01$mainContent$SearchUnitAvailbity$hdn_IsParkAllData: false
  ctl01$mainContent$SearchUnitAvailbity$hdnsearchPlaceAlias: ''
  ctl01$mainContent$SearchUnitAvailbity$hdnsearchplacenametext: ''
  ctl01$mainContent$SearchUnitAvailbity$txtCityParkSearch: string // Porteau Cove Park
  ctl01$mainContent$SearchUnitAvailbity$txtArrivalDate: string // 08/19/2020
  ctl01$mainContent$SearchUnitAvailbity$ddlNightsSearchUnitAvailbity: number // 1
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_CategoriesSearchUnitAvailbity: 0
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_CampingUnitSearchUnitAvailbity: 0
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_LengthSearchUnitAvailbity: 0
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_SelectCampingEquipSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnddlLenghtSearchUnitAvailbity: 0
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnArrivalDateSearchUnitAvailbity: string // 08/19/2020
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnLeft_placeidSearchUnitAvailbity: ''
  ctl01$mainContent$SearchUnitAvailabilityforPlace$ddl_Categories: Category // 2
  ctl01$mainContent$SearchUnitAvailabilityforPlace$ddl_CampingUnit: CampingType // 8
  ctl01$mainContent$SearchUnitAvailabilityforPlace$ddl_Length: 0
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnPlaceUnitTypeCategory: ''
  ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnPlalceAmenities: ''
  ctl01$mainContent$hdnSearchType: ''
  ctl01$mainContent$hdnPlaceFacilirySize: 0
  ctl01$mainContent$ddlFacility: number // 174
  ctl01$mainContent$txtDateRange: string // 8/19/2020
  ctl01$mainContent$Grid_ddlNights: number // 1
  ctl01$mainContent$facilitySearch$hdn_CategoriesSearchFacilityUnitAvailbity: 0
  ctl01$mainContent$facilitySearch$hdn_CampingUnitFacilitySearchUnitAvailbity: 0
  ctl01$mainContent$facilitySearch$hdn_LengthSearchUnitFacilityAvailbity: 0
  ctl01$mainContent$facilitySearch$hdnIsAdaSearchUnitfacility: 0
  ctl01$mainContent$facilitySearch$ddl_Categories_facility: Category // 2
  ctl01$mainContent$facilitySearch$ddl_CampingUnit_facility: CampingType // 8
  ctl01$mainContent$facilitySearch$ddl_Length_facility: 0
  ctl01$mainContent$facilitySearch$hdnFacilityUnitTypeCategory: ''
  ctl01$mainContent$facilitySearch$HiddenField1: ''
  ctl01$mainContent$ugReservationGrid$hdnSelectedUnits: ''
  ctl01$mainContent$ugReservationGrid$hdnnotavailableunit: ''
  ctl01$mainContent$ugReservationGrid$hdnnotavailableunitAdvanced: ''
}

export interface UnitDetailPopupInput {
  ArrivalDate: string // "08-19-2020"
  FBEndDate: string // "11/10/2019"
  MaximumStay: number // 7
  MinimumStay: number // 1
  facilityId: number // "174"
  nights: number // "1"
  placeId: number // "104"
  unitId: number // "6902"
}

export interface BookUnitInput {
  placeId: number,
  placeName: string,
  facilityId: number,
  unitId: number,
  campingType: CampingType,
  startDate: Moment,
  nights: number,
  adults: number
  occupantName: string
  occupant2Name?: string
}

export interface UnitDetail {
  AllowWebBooking: false
  AvailableCount: 0
  IsAda: false
  IsFiltered: false
  IsWebViewable: true
  MapInfo: {
    FontSize: 9
    ImageCoordinateX: 567
    ImageCoordinateY: 258
    ImageHeight: 38
    ImageWidth: 38
    UnitImage: "BritishColumbia/Units/Basic"
  }
  Name: "Standard #8"
  OrderBy: 909
  RecentPopups: 0
  ShortName: "8"
  SleepingUnitIds: CampingType[]
  SliceCount: 21
  Slices: {
    [date:string]: {
      Date: '2020-07-28'
      IsBlocked: true
      IsFree: false
      IsWalkin: true
      Lock: null
      MinStay: 1
      ReservationId: 0
    }
  }
  UnitCategoryId: 2
  UnitId: 5739
  UnitTypeGroupId: 4
  UnitTypeId: 4
  VehicleLength: 30
}

export interface FacilityDetail {
  AvailableSliceCount: 0
  AvailableUnitCount: 0
  DatesInSeason: 21
  DatesOutOfSeason: 0
  Description: string// "Montague Harbour"
  FacilityId: 145
  FacilityImage: string // "BritishColumbia/Facilities/MHM_83_Campground_REV.jpg"
  FacilityMapSize: false
  FacilityType: 2
  Name: string //"Montague Harbour"
  Restrictions: Restrictions
  SeasonDates: {
    // for about 2 weeks starting with startDate
    [date: string]: boolean// '2020-07-28T00:00:00': true
  }
  SliceCount: 1050
  UnitCount: 50
  Units: {[_:number]: UnitDetail} // Key is NOT unitId
}

