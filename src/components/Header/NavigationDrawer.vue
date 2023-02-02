<template>
        <div :class="wrapperClass" @mouseover="collapsed = false" @mouseleave.prevent="collapsed = true">
            <nav>
                <menu-component :items="menuItems" :mainNode="true"></menu-component>
            </nav>
            <div class="hide-menu-button" @click="collapsed = true"></div>
        </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import MenuComponent from './Menu.vue';
import CollectionsService from '@/services/collectionsService';
import { IMenuItem } from './types/menuTypes';



@Component({components:{MenuComponent}})
export default class NavigationDrawerComponent extends Vue{
    @Prop({default:false}) show!:boolean;
    collapsed: boolean = true;
    menuItems: IMenuItem[] | any = [];

    async created(): Promise<void>{
        this.menuItems = await CollectionsService.getMenuItems();
    }

    get wrapperClass(): object {
        return {
            'menu-wrapper': true,
            'menu-wrapper-collapsed': this.collapsed && !this.show
        }
    }

}
</script>

<style lang="scss" scoped>
.menu-wrapper{
    z-index: 1;
    border:1px solid #555;
    background: white;
    position: fixed;
    width: 100%;
    height: 100vh;
    top:70px;
    transition: transform 1s ease;
    transform: translateX(0);
    &-collapsed{
        transform: translateX(-100%);
    }
}

.hide-menu-button{
    bottom: 100px;
    position: absolute;
    right: 20px;
    border-top: 40px solid transparent;
	border-bottom: 40px solid transparent;
	border-right: 40px solid #333;
}

@media (min-width: 600px) {
    .menu-wrapper{
        width: 30%;
    }
    .hide-menu-button{
        display: none;
    }
}
</style>
