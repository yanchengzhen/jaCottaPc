var pageComponent = Vue.extend({
    template:
        `<nav class="float-l" style="width: 100%;text-align: center;" aria-label="Page navigation">
            <ul class="pagination" style="margin: 0;">
                <li :class="{\'disabled\':curPage==1}">
                    <a href="javascript:;" @click="goPage(curPage==1?1:curPage-1)" aria-label="Previous">
                        <span aria-hidden="true" style="font-size: 30px;position: absolute;top: 0;line-height: 31px;"><</span>
                    </a>
                </li>
                <li v-for="page in showPageBtn" :class="{\'active\':page==curPage}">
                    <a href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a>
                    <a href="javascript:;" v-else>···</a>
                </li>
                <li :class="{\'disabled\':curPage==pages}">
                    <a href="javascript:;" @click="goPage(curPage==pages?pages:curPage+1)" aria-label="Next">
                        <span aria-hidden="true" style="font-size: 30px;position: absolute;top: 0;line-height: 31px;">></span>
                    </a>
                </li>
            </ul>
        </nav>`,
    props: {
        pages: {type: Number, default: 1},
        current: {type: Number, default: 1}
    },
    data() {
        return {curPage: 1}
    },
    computed: {
        showPageBtn() {
            let pageNum = this.pages;
            let index = this.curPage;
            let arr = [];
            if (pageNum <= 5) {
                for (let i = 1; i <= pageNum; i++) {
                    arr.push(i)
                }
                return arr
            }
            if (index <= 2) return [1, 2, 3, 0, pageNum];
            if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum];
            if (index === 3) return [1, 2, 3, 4, 0, pageNum];
            if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            return [1, 0, index - 1, index, index + 1, 0, pageNum];
        }
    },
    methods: {
        goPage(page) {
            if (page != this.curPage) {
                this.curPage = page;
                this.$emit('navpage', this.curPage);
            } else {
                console.log('Already in the current page');
            }
        }
    }
});
Vue.component('navigation', pageComponent);