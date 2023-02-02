import axios from "axios";

export interface IGlassItem{
    id: number;
    name: string,
    configuration_name: string,
    default_collection_name: string | null,
    cost_breakdown: object,
    glass_variants:{media:{url: string}[]}[]
}

export interface GlassServiceResponse{
    glasses:IGlassItem[];
    meta: any;
}

export default new class GlassService{

    async getData(collectionName:string, page:number, take:number = 12, filter:string = ''): Promise<IGlassItem[]> {
        const apiUrl = `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${collectionName}/glasses?sort[type]=collection_relations_position&sort[order]=asc`;
        const response = await axios.get<GlassServiceResponse>(apiUrl + `&page[limit]=${take}&page[number]=${page}` + filter).then(result => result.data);
        return response.glasses;
    }
}
