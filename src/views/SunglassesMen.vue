<template>
  <layout-component :collectionName="'sunglasses-men'"></layout-component>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import LayoutComponent from '@/components/Layout/Layout.vue';


@Component({components:{LayoutComponent}})
export default class SunglassesMenView extends Vue{
  
}
</script>