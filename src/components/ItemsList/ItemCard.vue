<template>
    <div class="item-wrapper">
        <img :src="item.glass_variants[0].media[0].url" :alt="item.name" class="item-image"/>
        <div class="item">{{ item.name }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { IGlassItem } from '@/services/glassesService';

@Component
export default class ItemCardComponent extends Vue{
    @Prop() item!: IGlassItem;
}
</script>

<style lang="scss" scoped>
.item-wrapper{
    position: relative;
    border:1px solid #555;
    width:100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
}
.item{
    position: absolute;
    left: 0;
    top: 0;
    font-size: 30px;
    font-weight: 300;
    width: 100%;
    margin-top: 10px;
}
.item-image{
    width: 100%;
    height: 400px;
}
</style>