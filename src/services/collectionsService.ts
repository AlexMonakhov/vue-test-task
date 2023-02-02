import { IMenuItem } from "@/components/Header/types/menuTypes";
import axios from "axios";



const apiUrl = "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections"

enum CollectionsNames{
    spectacles = 'Spectacles',
    sunglasses = 'Sunglasses'
}
export default new class CollectionsService{


    async getData(): Promise<[]> {
        const response = await axios.get(apiUrl).then(result => result.data);
        return response.collections;
    }

    async getMenuItems(): Promise<IMenuItem[]> {
        const collections: any[] = await this.getData();
        //build menu items
        return [
            {   
                item:{label: CollectionsNames.spectacles},
                nodes:collections.filter(c => c.configuration_name
                                .includes(CollectionsNames.spectacles.toLowerCase()))
                                .map(collection => ({
                                item: {
                                    label:collection.name,route:collection.configuration_name
                                },
                                nodes:[],
                                deep:1}) as IMenuItem),
                deep:0
            },
            {
                item:{label: CollectionsNames.sunglasses},
                nodes:collections.filter(c => c.configuration_name
                                .includes(CollectionsNames.sunglasses.toLowerCase()))
                                .map(collection => ({
                                    item: {
                                        label:collection.name,route:collection.configuration_name
                                    },
                                    nodes:[],
                                    deep:1}) as IMenuItem),
                deep:0
            }]
        }
                
            
    
}
