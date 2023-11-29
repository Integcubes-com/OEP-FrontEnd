import { CUsers } from "src/app/shared/common-interface/common-interface"

export class CountriesModel {
    countryId: number
    regionId: number
    regionTitle: string
    countryTitle: string
    countryCode: string
    executiveDirectorId: number
    executiveDirectorTitle: string
    executiveVpId: string
    executiveVpTitle: string
    clustedId: number
    clusterTitle: string
    constructor(reg) {
        this.countryId = reg.countryId ? reg.countryId : -1
    }
}

export interface CountryApiData {
    country: CountriesModel
    executiveVp: CUsers[]
}