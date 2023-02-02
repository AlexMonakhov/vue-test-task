import Vue from 'vue';
import Component from 'vue-class-component'

@Component
export default class ScrollMixin extends Vue{
    scrollHandle: ((e:Event) => any) | null = null;
    elementToObserve: any = null;
    scrollOffset: number = 200;

    mounted(): void {
        this.elementToObserve = this.$refs.scrollingElement;
        if(!this.scrollHandle) return;
        this.elementToObserve.addEventListener('scroll', this.scrollHandle)
    }

    onUmmount(): void {
        this.elementToObserve.removeEventListener('scroll');
    }

}
