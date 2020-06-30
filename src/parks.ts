import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import cheerio from 'cheerio'
import {CookieJar} from 'tough-cookie'
import moment, {Moment} from 'moment'
import {
    BookUnitInput,
    CampingType,
    CampingUnitListRequest,
    Category,
    FacilityAvailability,
    FacilityDetail,
    FacilityStartEndRestrictions,
    FindPlacesInput,
    KeyValueListResponse,
    KeyValuePair,
    OccupancyResponse,
    Park,
    PlaceSearchRequest,
    PlaceSearchResult,
    Restrictions,
    SignInResponse,
    UnitCategoryListRequest,
    UnitDetailPopupInput,
    UnitDetails,
    UnitRestrictionResponse,
} from './types'
import {saveResult, getTime, ViewState, extractViewState, makeParams, getCartInput, getPreCartInput} from './util'

// Just.. why!?
const AMERICAN_DATE_FORMAT = 'MM-DD-YYYY'

const USEDIRECT_URL = 'https://bccrdr.usedirect.com/rdr/rdr'

const defaultConfig: Partial<AxiosRequestConfig> = {
    baseURL: 'https://www.discovercamping.ca/BCCWeb',
    withCredentials: true,
    xsrfCookieName: '__AntiXsrfToken',
}

export class BCParks {
    private readonly api: AxiosInstance

    constructor(private readonly cookies: CookieJar,
                config?: AxiosRequestConfig) {
        this.api = axios.create({...defaultConfig, ...config, jar: cookies})
        axiosCookieJarSupport(this.api)
    }

    getCookies() {
        return this.cookies.getCookieString(this.api.defaults.baseURL!)
    }

    signIn(UserName: string, Password: string): Promise<SignInResponse> {
        return this.api.get('/')
            .then(saveResult('signin.html'))
            .then(res => res.data)
            .then(body => {
                const $ = cheerio.load(body)
                if (!$('#alogout').length) {
                    return this.api.post('/Facilities/CascadingDropdown.asmx/LoginByEmail_V2',
                        {UserName, Password, CaptchResponse: '', BookingAgent: 0})
                        .then(res => res.data.d)
                }
                console.log('already logged in')
            })
    }

    findPark(search: string): Promise<Park[]> {
        const url = `${USEDIRECT_URL}/fd/citypark/namecontains/${search}?_=${getTime()}`
        return this.api.get(url)
            .then(res => res.data)
    }

    findPlaces(input: FindPlacesInput): Promise<PlaceSearchResult> {
        const req: PlaceSearchRequest = {
            PlaceId: input.placeId || 0,
            StartDate: input.startDate ? input.startDate.format(AMERICAN_DATE_FORMAT) : '',
            Nights: input.nights,
            SleepingUnitId: input.sleepingUnit || 0,
            UnitCategoryId: input.category || 0,
            NearbyOnlyAvailable: true,
        }
        if (input.near) {
            Object.assign(req, {
                Latitude: input.near.latitude,
                Longitude: input.near.longitude,
            })
        }
        return this.api.post(`${USEDIRECT_URL}/search/place`, req)
            .then(res => res.data)
    }

    getUnitCategoryList(placeId: number): Promise<KeyValuePair<Category>[]> {
        const req: UnitCategoryListRequest = {CategorieId: 0, placeId}
        return this.api.post<KeyValueListResponse>('/Facilities/SearchViewUnitAvailabity.aspx/GetUnitCategoryList', req)
            .then(res => res.data.d)
    }

    getCampingTypes(placeId: number): Promise<KeyValuePair<CampingType>[]> {
        const req: CampingUnitListRequest = {
            CampingId: 0,
            placeId,
        }
        return this.api.post<KeyValueListResponse>('/Facilities/SearchViewUnitAvailabity.aspx/GetCampingUnitList', req)
            .then(res => res.data.d)
    }

    getStartEndRestrictions(facilityId: number, categoryId: Category, unitTypeId: CampingType) {
        const url = `${USEDIRECT_URL}/fd/restrictions/startend/facility/${facilityId}/category/${categoryId}/unittype/${unitTypeId}?_=${getTime()}`
        return this.api.get<FacilityStartEndRestrictions>(url).then(res => res.data)
    }

    getOccupancy(facilityId: number, date: Moment): Promise<OccupancyResponse> {
        const formattedDate = date.format(AMERICAN_DATE_FORMAT)
        const url = `${USEDIRECT_URL}/search/occupancy/${facilityId}/startdate/${formattedDate}?_=${getTime()}`
        return this.api.get(url).then(res => res.data)
    }

    facilityDetails(facilityId: number|string, startDate: Moment): Promise<FacilityDetail> {
        const payload = {
            FacilityId: facilityId,
            InSeasonOnly: true,
            IsADA: false,
            MaxDate: '2021-06-29T07:00:00.000Z', //latest bookable
            MinDate: moment().toISOString(), // '2020-06-30T07:00:00.000Z',
            MinVehicleLength: 0,
            SleepingUnitId: CampingType.OneTent, // string
            StartDate: startDate.format('MM-DD-YYYY'),
            UnitCategoryId: Category.Camping, // string
            UnitTypeId: 0,
            UnitTypesGroupIds: [],
            WebOnly: true,
        }
        return this.api.post('https://bccrdr.usedirect.com/rdr/rdr/search/grid', payload)
            .then(res => res.data.Facility)
    }

    facilityAvailability(facilityId: number, date: Moment, nights: number): Promise<FacilityAvailability> {
        const formattedDate = date.format(AMERICAN_DATE_FORMAT)
        const url = `${USEDIRECT_URL}/search/next/${facilityId}/startdate/${formattedDate}/nights/${nights}?_=${getTime()}`
        return this.api.get(url).then(res => res.data)
    }

    unitDetails(unitId: number, date: Moment): Promise<UnitDetails> {
        const formattedDate = date.format(AMERICAN_DATE_FORMAT)
        const url = `${USEDIRECT_URL}/search/details/${unitId}/startdate/${formattedDate}?_=${getTime()}`
        return this.api.get(url).then(res => res.data)
    }

    getViewState(): Promise<ViewState> {
        return this.api.get('/Facilities/SearchViewUnitAvailabity.aspx')
            .then(res => res.data)
            .then(extractViewState)
    }

    getUnitDetailPopup(placeId: number,
                       facilityId: number,
                       unitId: number,
                       unitRestrictions: Restrictions,
                       arrival: Moment,
                       nights: number): Promise<UnitRestrictionResponse> {
        const input: UnitDetailPopupInput = {
            ArrivalDate: arrival.format(AMERICAN_DATE_FORMAT),
            FBEndDate: '11/10/2019', // (Future Booking?)
            MaximumStay: unitRestrictions.MaximumStay,
            MinimumStay: unitRestrictions.MinimumStay,
            facilityId,
            nights,
            placeId,
            unitId,
        }
        return this.api.post('/Facilities/UnitDetailPopup.aspx/GetRestrictionRDR', input)
    }

    bookUnit(input: BookUnitInput) {
        return this.getViewState()
            .then(vs => {
                const preCart = getPreCartInput(input, vs)
                return this.api.post('/Facilities/SearchViewUnitAvailabity.aspx', makeParams(preCart), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                })
            })
            .then(res => {
                console.log('adding booking to cart')
                const vs = extractViewState(res.data);
                const params = makeParams(getCartInput(vs, input.occupantName, input.occupant2Name, input.campingType, input.nights, input.startDate, input.adults))
                return this.api.post('/Facilities/SelectReservationPreCart.aspx', params, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                })
            })
            .then(saveResult('cartResult.html'))
            .then(res => {
                console.log('new location', res.headers)
                return res
            })
    }
}

