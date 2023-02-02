<template>
        <ul :style="{'z-index': deep+1}">
            <li v-for="(parent,index) in menuItems" :key="index" 
                @mouseover="collapsed[parent.item?.label] = false"
                @mouseleave="collapsed[parent.item?.label] = true"
                @click="navigate(parent.item.route)"
                class="menu"
            >
                <a :class="isSubMenu ? 'sub' : ''">{{ parent.item.label }}</a>
                <menu-component v-show="!collapsed[parent.item.label]" v-if="parent.nodes.length" 
                                :items="parent.nodes" 
                                :class="isSubMenu ? 'sub-menu' : 'menu'"
                >
                </menu-component>
            </li>
        </ul>    
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import {IMenuItem} from './types/menuTypes';

@Component({name:"menu-component"})
export default class MenuComponent extends Vue{
    @Prop({required:true}) items!: IMenuItem[];
    @Prop({default:false}) mainNode!: boolean;
    collapsed: object = {};

    get menuItems(): IMenuItem[]{
        this.fillCollapsedObject();
        return this.items;
    }

    get deep(): number {
        return this.items[0]?.deep;
    }

    get isSubMenu(): boolean{
        return this.items[0]?.nodes.some(node => node.deep > 0);
    }

    fillCollapsedObject(): void{
        this.items.forEach(parent =>{ 
            if(parent?.item?.label) 
            Vue.set(this.collapsed, parent.item.label, true);
        });
    }
    
    navigate(route: string): void {
        if(!route) return;
        this.$router.push(route);
    }

}
</script>
<style lang="scss" scoped>
.menu{
    position: relative;
    box-sizing: border-box;
}
.sub-menu{
    box-sizing: border-box;
    position: relative;
    top: -1px;
    left: 0;
    background: white;
    width: 100%;
    border: 1px solid #555;
    border-bottom: 0px;
    
}

li{
    font-size: 20px;
    height: 70px;
    line-height: 70px;
    list-style-type: none;
    border-bottom:1px solid #555;
    color:black;
    cursor: pointer;
        &:hover{
            background: #222;
            color:white;
        }
        &:hover a::before{
            border-left: 10px solid #fff;
        }
}
a.sub::before {
    content: '';
    right: 20px;
    top: 25px;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid #333;
    position: absolute;
}

@media only screen and (min-width: 600px) {
    .sub-menu{
        transform: translateX(100%);
        position:absolute;
    }
}
</style>