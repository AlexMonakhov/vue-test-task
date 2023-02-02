<template>
    <div class="items-list">
        <template v-for="currentRow in rowQuantity" >
            <div v-if="rowFilled(currentRow)" :key="currentRow" class="row" :style="{height: `calc(100%/${itemsPerColumn} - 25px`}">
            <template v-for="currentColumn in itemsPerRow" >
                <div v-if="getItem(currentRow,currentColumn)" :key="currentColumn"  class="column" :style="{width: 100/itemsPerRow + '%'}">
                <item-card-component :item="getItem(currentRow,currentColumn)" ></item-card-component>
                </div>  
            </template>        
        </div>
        </template>
        

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Mixins, Prop, Watch } from 'vue-property-decorator';
import ItemCardComponent from './ItemCard.vue';
import { IGlassItem } from '@/services/glassesService';

@Component({components:{ItemCardComponent}})
export default class ItemsListComponent extends Vue{
    @Prop({required:true}) itemsData!: IGlassItem[];
    @Prop({default:3}) itemsPerRow!: number;
    @Prop({default:2}) itemsPerColumn!: number;
    @Prop({default:''}) filterQuery!: string | number;

    get items(): IGlassItem[] {
        return this.itemsData;
    }

    get pages(): number {
        return Math.ceil(this.items.length/(this.itemsPerRow * this.itemsPerColumn))
    }

    get rowQuantity(): number {
        return this.pages * this.itemsPerColumn
    }

    getItem(currentRow: number, currentColumn: number): IGlassItem | undefined {
        return this.items.find((_,index) => index === (currentRow*this.itemsPerRow-this.itemsPerRow-1+currentColumn));
    }

    rowFilled(currentRow: number){
        return (currentRow * this.itemsPerRow) - this.items.length <= this.itemsPerRow;
    }
}
</script>

<style lang="scss" scoped>
.items-list{
    //overflow: scroll;
    width: 100%;
}
.items-list,.column{
    height: 100%;   
}
.row{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
}
</style>