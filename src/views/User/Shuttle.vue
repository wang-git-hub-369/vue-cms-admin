<template>
	<div>
		<!-- @right='handleRight'接收子组件传递的指令，并且绑定事件函数 @left='handleLeft' -->
		<Shuttle :list='list' :listone='listone' @right='handleRight' @left='handleLeft'></Shuttle>
	</div>

</template>

<script>
	import Shuttle from '@/components/Shuttle.vue'
	export default {
		components: {
			Shuttle
		},
		data() {
			return {
				list: [
					{ id: 0, name: '备选项1', checked: false, isRemove: true },
					{ id: 1, name: '备选项2', checked: false, isRemove: true },
					{ id: 2, name: '备选项3', checked: false, isRemove: true },
					{ id: 3, name: '备选项4', checked: false, isRemove: true },
					{ id: 4, name: '备选项5', checked: false, isRemove: true },
					{ id: 5, name: '备选项6', checked: false, isRemove: true },
				],
				listone: [],
			}
		},
		methods: {
			remove() {

			},
			handleLeft() {
				for (var i = 0; i < this.listone.length; i++) {
					if (this.listone[i].checked == true) {
						this.listone[i].isRemove = false;
						this.list.push(this.listone[i])
					} else {
						this.listone[i].checked = false
						this.listone[i].isRemove = true;
					}
				}
				for (var j = this.listone.length - 1; j >= 0; j--) {
					if (this.listone[j].isRemove == false) {
						this.listone.splice(j, 1)
					}
				}
			},
			handleRight() {
				// this.list.forEach((item, index) => {
				// 	if (item.checked == true) {
				// 		item.isRemove = false;
				// 		this.listone.push(item)
				// 	}
				// })
				// this.list.forEach((item, index) => {
				// 	if (item.isRemove == false) {
				// 		this.list.splice(item, 1)
				// 	}
				// })
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].checked == true) {
						this.list[i].isRemove = false;
						this.listone.push(this.list[i])
					} else {
						this.list[i].checked = false
						this.list[i].isRemove = true;
					}
				}
				for (var j = this.list.length - 1; j >= 0; j--) {
					if (this.list[j].isRemove == false) {
						this.list.splice(j, 1)
					}
				}
			}
		},
	}
</script>

<style>
</style>
