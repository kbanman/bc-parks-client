import fs from 'fs'
import {AxiosResponse} from 'axios'
import cheerio from 'cheerio'
import moment, {Moment} from 'moment'
import {BookUnitInput, CampingType, Category, PreCartInput} from './types'

const SLASH_FORMAT_UNPADDED = 'M/D/YYYY'
const SLASH_FORMAT = 'MM/DD/YYYY'

/**
 * For debugging, saves an Axios response to a file and passes through
 * @param filename
 */
export const saveResult = (filename: string) => (res: AxiosResponse<any>) => {
  fs.writeFileSync(filename, res.data)
  return res
}

export interface ViewState {
  viewState: string
  viewStateGenerator: string
}
/**
 * Extract the view state from the given html body
 * @param body
 */
export function extractViewState(body: string): ViewState {
  const $ = cheerio.load(body)
  return {
    viewState: $('#__VIEWSTATE').val(),
    viewStateGenerator: $('#__VIEWSTATEGENERATOR').val(),
  }
}

/**
 * Get the current time in unix epoch seconds
 */
export function getTime() {
  return Math.round((new Date).getTime() / 1000)
}

/**
 * Build the parameters for form post requests
 * @param input
 */
export const makeParams = (input: {}) => {
  const params = new URLSearchParams()
  for (let key in input) {
    // @ts-ignore
    params.set(key, input[key])
  }
  return params
}

export function getCartInput(vs: ViewState,
                             occupant: string,
                             occupant2: string|undefined,
                             campingType: CampingType,
                             nights: number,
                             arrivalDate: Moment,
                             adults: number) {
  // No idea why this is needed
  const today = moment()
  return {
    __EVENTTARGET: 'ctl01$mainContent$bReserve',
    __EVENTARGUMENT: '',
    __LASTFOCUS: '',
    __VIEWSTATE: vs.viewState,
    __VIEWSTATEGENERATOR: vs.viewStateGenerator,
    ctl01$hdnLoginCaptchResponse: '',
    ctl01$Hidscreenresolutionmain: '',
    ctl01$hdnCulture: '',
    ctl01$txtPassword: '',
    ctl01$AdvanceMainSearch$hdnAutoPlaceId: '',
    ctl01$AdvanceMainSearch$hdnLat: '49.499726',
    ctl01$AdvanceMainSearch$hdnLag: '-122.450121',
    ctl01$AdvanceMainSearch$hdnautocomplete: '',
    ctl01$AdvanceMainSearch$hdncustomautocomplete: '',
    ctl01$AdvanceMainSearch$hdnArrivalDate: today.format(SLASH_FORMAT),
    ctl01$AdvanceMainSearch$txtArrivalDate: today.format(SLASH_FORMAT),
    ctl01$AdvanceMainSearch$hdnNights: 0,
    ctl01$AdvanceMainSearch$ddlNights: 0,
    ctl01$AdvanceMainSearch$hdnEnableGoogleAnalyticCodeTracing: '',
    ctl01$mainContent$Hidscreenresolution: '',
    ctl01$mainContent$hdnvehicleState: '',
    ctl01$mainContent$hdnvehicleType: '',
    ctl01$mainContent$hdnvehicleplates: '',
    ctl01$mainContent$hdnfirstadult: '',
    ctl01$mainContent$hdnfirstchild: '',
    ctl01$mainContent$hdnIsValidPage: 0,
    ctl01$mainContent$hdnfirstinfant: '',
    ctl01$mainContent$hdnPlaceIDforAlert: '',
    ctl01$mainContent$hdnArrivalDate_Alert: '',
    ctl01$mainContent$hdnParkAlertval: '',
    ctl01$mainContent$ddlNights: nights,
    ctl01$mainContent$txtArrivalDate: arrivalDate.format(SLASH_FORMAT),
    ctl01$mainContent$txtIsCalendarCollapsed: 'True',
    ctl01$mainContent$prPrices$txtClassificationIndex: 0,
    ctl01$mainContent$prPrices$rprPrices$ctl00$selClassification: 0,
    ctl01$mainContent$ddlAdults: adults,
    ctl01$mainContent$ddlChildren: 0,
    ctl01$mainContent$ddlVehicles: 0,
    ctl01$mainContent$ddlSleepingUnitType: campingType,
    ctl01$mainContent$ddlPadLength: 'No Vehicle',
    ctl01$mainContent$txtOccupant: occupant,
    ctl01$mainContent$txtOptionalOccupant: occupant2 || '',
    ctl01$mainContent$tbPromoCode: '',
    ctl01$mainContent$cbIagree: 'on',
  }
}


export function getPreCartInput(input: BookUnitInput, viewState: ViewState): Partial<PreCartInput> {
  const searchLat = '49.556322', searchLng = '-123.238203'
  const {nights, startDate, campingType, unitId, facilityId, placeName, placeId} = input

  return {
    __EVENTTARGET: '',
    __EVENTARGUMENT: '',
    __VIEWSTATE: viewState.viewState,
    __VIEWSTATEGENERATOR: viewState.viewStateGenerator,
    ctl01$hdnLoginCaptchResponse: '',
    ctl01$Hidscreenresolutionmain: '',
    ctl01$hdnCulture: '',
    ctl01$txtPassword: '',
    ctl01$AdvanceMainSearch$hdnAutoPlaceId: '',
    ctl01$AdvanceMainSearch$hdnLat: searchLat, // 49.556322,
    ctl01$AdvanceMainSearch$hdnLag: searchLng, // -123.238203,
    ctl01$AdvanceMainSearch$hdnautocomplete: '',
    ctl01$AdvanceMainSearch$hdncustomautocomplete: '',
    ctl01$AdvanceMainSearch$hdnArrivalDate: '',
    ctl01$AdvanceMainSearch$txtArrivalDate: moment().format(SLASH_FORMAT),
    ctl01$AdvanceMainSearch$hdnNights: 0,
    ctl01$AdvanceMainSearch$ddlNights: 0,
    ctl01$AdvanceMainSearch$hdnEnableGoogleAnalyticCodeTracing: '',
    ctl01$mainContent$hdClient: 736567, // ???
    ctl01$mainContent$Hidscreenresolution: 1253,
    ctl01$mainContent$hdnPlaceid: placeId, // 104,
    ctl01$mainContent$hiddenPlaceLevel: '',
    ctl01$mainContent$hdnFacilityid: 0,
    ctl01$mainContent$hdnFacilityType: 0,
    ctl01$mainContent$facilityChanged: '',
    ctl01$mainContent$IsParkFeatures: 0,
    ctl01$mainContent$hdnParkFirstBlockFullDesc: '',
    ctl01$mainContent$hdnIsTimebasematrix: 0,
    ctl01$mainContent$hdnIsAdvanceFacilityAvailability: 0,
    ctl01$mainContent$hdmaximumdate: 6,
    ctl01$mainContent$hdnmaxstay: 14,
    ctl01$mainContent$hdnCashierOpenCampingCall: 0,
    ctl01$mainContent$hdnUnNumberArrivalDate: '',
    ctl01$mainContent$hdnUnNumberNights: '',
    ctl01$mainContent$hdnUnNUmberUnitId: '',
    ctl01$mainContent$hdnInventoryUpdateClick: 1,
    ctl01$mainContent$hdnNextDate: '',
    ctl01$mainContent$hdnPrevDate: '',
    ctl01$mainContent$UnitDetailPopup$hdnUnitId: unitId, // 6902,
    ctl01$mainContent$UnitDetailPopup$hdnFacilityId: facilityId, // 174,
    ctl01$mainContent$UnitDetailPopup$ParkAlerttest: '',
    ctl01$mainContent$UnitDetailPopup$hdnmustReadrAlertPrecat: '',
    ctl01$mainContent$UnitDetailPopup$hdnParkIDAlert: placeId, // 104,
    ctl01$mainContent$UnitDetailPopup$hdnUnitDetailsCaptch: '',
    ctl01$mainContent$UnitDetailPopup$h1: '',
    ctl01$mainContent$UnitDetailPopup$ddlnighthf: nights, // 1,
    ctl01$mainContent$UnitDetailPopup$hdnInventoryAvailable: '',
    ctl01$mainContent$UnitDetailPopup$hdnInventoryCheck: '',
    ctl01$mainContent$UnitDetailPopup$hdnUnitDetailPopupdate: startDate.format(SLASH_FORMAT), // 08/19/2020,
    ctl01$mainContent$UnitDetailPopup$hdnUnitDetailsPlaceId: placeId, // 104,
    ctl01$mainContent$UnitDetailPopup$hdnUnitIsCaptcha: false,
    ctl01$mainContent$UnitDetailPopup$ddlPopupNights: nights, // 1,
    ctl01$mainContent$UnitDetailPopup$bReserve2: '',
    ctl01$mainContent$hdnnotavailableunit: '',
    hdnIsMapshow: 0,
    hdnMapLevelshow: 1,
    hdnMapboxPlaceid: 0,
    hdnMapboxParksize: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnNightsSearchUnitAvailbity: nights, // 1,
    ctl01$mainContent$SearchUnitAvailbity$hdnSearchtypeSearchUnitAvailbity: 'Park',
    ctl01$mainContent$SearchUnitAvailbity$hdnParkSizeSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnSearchPlaceIdSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnAutoPlaceIdSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnLatSearchUnitAvailbity: searchLng, // 49.556322,
    ctl01$mainContent$SearchUnitAvailbity$hdnLagSearchUnitAvailbity: searchLat, // -123.238203,
    ctl01$mainContent$SearchUnitAvailbity$hdnautocompleteSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailbity$hdncustomautocompleteSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnIsPremiumSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnIsAdaSearchUnitAvailbity: 0,
    ctl01$mainContent$SearchUnitAvailbity$hdnIsPlaceSearchUnitAvailbity: 0,
    ctl01$mainContent$SearchUnitAvailbity$hdnIsFacilityBacktoSearchUnitPlace: 0,
    ctl01$mainContent$SearchUnitAvailbity$hdnParkFinderArray: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnIsAutocompleteFill: 1,
    ctl01$mainContent$SearchUnitAvailbity$hdn_NewCampingUnitSearchUnitAvailbity: 0,
    ctl01$mainContent$SearchUnitAvailbity$hdn_IsParkAllData: false,
    ctl01$mainContent$SearchUnitAvailbity$hdnsearchPlaceAlias: '',
    ctl01$mainContent$SearchUnitAvailbity$hdnsearchplacenametext: '',
    ctl01$mainContent$SearchUnitAvailbity$txtCityParkSearch: placeName, // Porteau Cove Park,
    ctl01$mainContent$SearchUnitAvailbity$txtArrivalDate: startDate.format(SLASH_FORMAT), // 08/19/2020,
    ctl01$mainContent$SearchUnitAvailbity$ddlNightsSearchUnitAvailbity: nights, // 1,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_CategoriesSearchUnitAvailbity: 0,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_CampingUnitSearchUnitAvailbity: 0,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_LengthSearchUnitAvailbity: 0,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdn_SelectCampingEquipSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnddlLenghtSearchUnitAvailbity: 0,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnArrivalDateSearchUnitAvailbity: startDate.format(SLASH_FORMAT), // 08/19/2020,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnLeft_placeidSearchUnitAvailbity: '',
    ctl01$mainContent$SearchUnitAvailabilityforPlace$ddl_Categories: Category.Camping, // 2, @TODO: flexible
    ctl01$mainContent$SearchUnitAvailabilityforPlace$ddl_CampingUnit: campingType, // 8,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$ddl_Length: 0,
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnPlaceUnitTypeCategory: '',
    ctl01$mainContent$SearchUnitAvailabilityforPlace$hdnPlalceAmenities: '',
    ctl01$mainContent$hdnSearchType: '',
    ctl01$mainContent$hdnPlaceFacilirySize: 0,
    ctl01$mainContent$ddlFacility: facilityId, // 174,
    ctl01$mainContent$txtDateRange: startDate.format(SLASH_FORMAT_UNPADDED), // 8/19/2020,
    ctl01$mainContent$Grid_ddlNights: nights, // 1,
    ctl01$mainContent$facilitySearch$hdn_CategoriesSearchFacilityUnitAvailbity: 0,
    ctl01$mainContent$facilitySearch$hdn_CampingUnitFacilitySearchUnitAvailbity: 0,
    ctl01$mainContent$facilitySearch$hdn_LengthSearchUnitFacilityAvailbity: 0,
    ctl01$mainContent$facilitySearch$hdnIsAdaSearchUnitfacility: 0,
    ctl01$mainContent$facilitySearch$ddl_Categories_facility: Category.Camping, // 2, @TODO: make flexible
    ctl01$mainContent$facilitySearch$ddl_CampingUnit_facility: campingType, // 8
    ctl01$mainContent$facilitySearch$ddl_Length_facility: 0,
    ctl01$mainContent$facilitySearch$hdnFacilityUnitTypeCategory: '',
    ctl01$mainContent$facilitySearch$HiddenField1: '',
    ctl01$mainContent$ugReservationGrid$hdnSelectedUnits: '',
    ctl01$mainContent$ugReservationGrid$hdnnotavailableunit: '',
    ctl01$mainContent$ugReservationGrid$hdnnotavailableunitAdvanced: '',
  }
}

