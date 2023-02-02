<template>
  <div>
    <main class="main" ref="scrollingElement">
      <filter-component :filterEntity="filterEntity" :collectionName="collectionNameToShow" @filter-changed="onFilterChange"></filter-component>
      <items-list-component :itemsData="itemsData" :filterQuery="filterQuery" @load-more-data="loadMoreData"
                            :itemsPerRow="isMobile ? 1:3" :itemsPerColumn="isMobile ? 3:2"
      ></items-list-component>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import GlassService,{IGlassItem} from '@/services/glassesService';
import HeaderComponent from '@/components/Header/Header.vue';
import FilterComponent from '@/components/Header/Filter.vue';
import ItemsListComponent from '@/components/ItemsList/ItemsList.vue';
import ScrollMixin from '@/mixins/ScrollMixin';

@Component({
  components: {
    HeaderComponent,
    FilterComponent,
    ItemsListComponent
  },
})
export default class LayoutComponent extends Mixins(ScrollMixin) {
  @Prop({required:true}) collectionName!:string;
  itemsData: IGlassItem[] = [];
  canLoadData: boolean = true;
  page: number = 1;
  pageLimit: number = 12;
  windowsWidth: number = window.innerWidth;
  filterEntity = {
            colors:{
                values:{
                  black: false,
                  tortoise: false,
                  coloured: false,
                  crystal: false,
                  dark: false,
                  bright: false
                },
              query:'glass_variant_frame_variant_colour_tag_configuration_names'
                
            },
            shapes:{
                values:{
                  square: false,
                  rectangle: false,
                  round: false,
                  'cat-eye': false
              },
              query:'glass_variant_frame_variant_frame_tag_configuration_names'
            },
  }
  filterQuery: string = '';
  
  async mounted(): Promise<void>{
    this.loadData();
    window.addEventListener('resize', this.onResize)
  }

  onUnmount(): void {
    window.removeEventListener('resize', this.onResize);
  }

  created(): void {
    this.scrollHandle = () => {
            if(this.canLoadData && (this.elementToObserve.scrollHeight - this.scrollOffset) < (this.elementToObserve.scrollTop + this.elementToObserve.clientHeight)){
                this.loadMoreData();    
            }
        }
  }

  get collectionNameToShow(): string{
    return this.collectionName.replace('-',' ');
  }

  get isMobile(): boolean{
    return this.windowsWidth < 600;
  }

  onFilterChange(filter:string): void{
    this.filterQuery = filter;
    this.loadData();
  }

  onResize(): void{
    this.windowsWidth = window.innerWidth;
  }

  async loadData(): Promise<void>{
    this.page = 1;
    this.itemsData = await GlassService.getData(this.collectionName,this.page, this.pageLimit, this.filterQuery);   
  }

  async loadMoreData(): Promise<void>{
        this.canLoadData = false;
        this.page++;
        const moreItems = await GlassService.getData(this.collectionName,this.page, this.pageLimit, this.filterQuery)
        this.itemsData = [...this.itemsData,...moreItems];
        this.canLoadData = moreItems.length == this.pageLimit;
  }
}
</script>

<style>
.main{
  overflow: scroll;
  height: calc(100vh - 75px);
}
</style>
