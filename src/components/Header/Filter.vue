<template>
    <div>
        <div class="filter-wrapper">
            <div class="total-count"></div>
            <div class="collection-name">{{ collectionName }}</div>
            <div class="filter-buttons">
                <div v-for="filterName in filterNames" :key="filterName" class="filter-button">
                    <a @click="selectedFilter[filterName] = !selectedFilter[filterName]" >{{ filterName }}</a>
                </div>
            </div>
        </div>
        <div v-for="filterName in filterNames" :key="filterName">
                <div v-show="selectedFilter[filterName]" class="filter-selection">
                    <label v-for="(value,key) in entireFilter[filterName].values" :key="key" :for="key" class="filter-label">
                        {{ key }}
                        <input :id="key"  v-model="entireFilter[filterName].values[key]" type="checkbox" class="filter-checkbox"/>
                    </label>
                </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { IFilterType } from './types/filterTypes';

@Component
export default class FilterComponent extends Vue{
    @Prop({required:true}) filterEntity!:any;
    @Prop({default:''}) collectionName!:string;
    collapsed:boolean = false;
    entireFilter = null;
    selectedFilter: object = {};

    created(){
        this.entireFilter = this.filterEntity;
        this.filterNames.forEach(name => Vue.set(this.selectedFilter,name,false));
    }

    get filterNames(): string[]{
        return Object.keys(this.entireFilter as any);
    }

    get filterQuery(): string{
        let result = '';
        Object.entries(this.entireFilter as any).map(([_,filter]) => {
            Object.entries((filter as IFilterType).values).map(([key,value]) => {
                if(value){
                    result += `&filters[${(filter as IFilterType).query}][]=${key}`;
                }
            });
        });
        return result;
    }

    @Watch('entireFilter', {deep: true})
    onFilterChange(): void{
        this.$emit('filter-changed', this.filterQuery)
    }

}
</script>

<style lang="scss" scoped>
.filter-wrapper{
    border-bottom:1px solid #555;
    display: flex;
    justify-content: end;
}

.filter-button{
    height: 70px; 
    line-height: 70px;
    text-transform: capitalize;
    cursor: pointer;
    &:hover{
        font-weight: 500;
    }
}

.filter-buttons{
    width: 33.333%;
    border-left: 1px solid #555;
    border-right: 1px solid #555;
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
}
.filter-selection{
    display: flex;
    justify-content: start;
}
.filter-label{
    cursor: pointer;
    padding: 5px;
}
.collection-name{
    width: calc(100%/3*2);
    border-right: 1px solid #555;
    box-sizing: border-box;
    font-weight: 900;
    font-size: xx-large;
    text-transform: uppercase;
    line-height: 70px;
}
.total-count{
    border-right: 1px solid #555;
}

@media (min-width: 600px) {
    .collection-name{
        width: calc(100%/3);
        border-left: 1px solid #555;
    }
}
</style>